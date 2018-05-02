import {Component} from 'react'
import PropTypes from 'prop-types'
import {loadPreferences, savePreferences} from './preferences'
import fetchDestinations from './fetch-destinations'
import conditionallyLoadAnalytics from './analytics'

// Used to provide a stable value in render
const emptyObject = {}

function getNewDestinations(destinations, preferences) {
  const newDestinations = []

  // If there are no preferences then all destinations are new
  if (!preferences) {
    return destinations
  }

  for (const destination of destinations) {
    if (preferences[destination.id] === undefined) {
      newDestinations.push(destination)
    }
  }

  return newDestinations
}

export default class ConsentManagerBuilder extends Component {
  static displayName = 'ConsentManagerBuilder'

  static propTypes = {
    children: PropTypes.func.isRequired,
    writeKey: PropTypes.string.isRequired,
    otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
    shouldEnforceConsent: PropTypes.func,
    mapToPreferences: PropTypes.func,
    mapFromPreferences: PropTypes.func,
  }

  static defaultProps = {
    otherWriteKeys: [],
    shouldEnforceConsent: () => true,
    mapToPreferences: undefined,
    mapFromPreferences: undefined,
  }

  state = {
    isLoading: true,
    destinations: [],
    newDestinations: [],
    preferences: null,
    isEnforcingConsent: true,
  }

  render() {
    const {children} = this.props
    const {
      isLoading,
      destinations,
      preferences,
      newDestinations,
      isEnforcingConsent,
    } = this.state

    if (isLoading) {
      return null
    }

    return children({
      destinations,
      newDestinations,
      preferences: preferences || emptyObject,
      isEnforcingConsent,
      setPreferences: this.handleSetPreferences,
      resetPreferences: this.handleResetPreferences,
      saveConsent: this.handleSaveConsent,
    })
  }

  componentDidMount() {
    const {mapToPreferences, mapFromPreferences} = this.props
    // TODO: handle errors properly
    this.initialise()

    if (process.env.NODE_ENV !== 'production') {
      if (mapToPreferences && !mapFromPreferences) {
        console.error(
          `ConsentManagerBuilder: to use “mapToPreferences” you must also set “mapFromPreferences”`
        )
      }

      if (!mapToPreferences && mapFromPreferences) {
        console.error(
          `ConsentManagerBuilder: to use “mapFromPreferences” you must also set “mapToPreferences”`
        )
      }
    }
  }

  initialise = async () => {
    const {
      writeKey,
      otherWriteKeys,
      shouldEnforceConsent,
      mapToPreferences,
    } = this.props
    const destinationPreferences = loadPreferences()

    const [isEnforcingConsent, destinations] = await Promise.all([
      shouldEnforceConsent(),
      fetchDestinations([writeKey, ...otherWriteKeys]),
    ])

    const newDestinations = getNewDestinations(
      destinations,
      destinationPreferences
    )

    // TODO: load without destinations? (faster but could result in sending an invalid integrations option)
    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isEnforcingConsent,
    })

    let preferences
    if (mapToPreferences) {
      preferences = mapToPreferences({
        destinations,
        newDestinations,
        destinationPreferences,
      })
    } else {
      preferences = destinationPreferences
    }

    this.setState({
      isLoading: false,
      destinations,
      newDestinations,
      preferences,
      isEnforcingConsent,
    })
  }

  handleSetPreferences = newPreferences => {
    this.setState(prevState => {
      const {destinations, preferences: existingPreferences} = prevState
      const preferences = this.mergePreferences({
        destinations,
        newPreferences,
        existingPreferences,
      })
      return {preferences}
    })
  }

  handleResetPreferences = () => {
    const {mapToPreferences} = this.props
    const destinationPreferences = loadPreferences()

    this.setState(prevState => {
      const {destinations} = prevState

      let preferences
      if (mapToPreferences) {
        preferences = mapToPreferences({
          destinations,
          destinationPreferences,
        })
      } else {
        preferences = destinationPreferences
      }

      return {preferences}
    })
  }

  handleSaveConsent = newPreferences => {
    const {writeKey, mapFromPreferences} = this.props

    this.setState(prevState => {
      const {
        destinations,
        preferences: existingPreferences,
        isEnforcingConsent,
      } = prevState

      const preferences = this.mergePreferences({
        destinations,
        newPreferences,
        existingPreferences,
      })

      let destinationPreferences
      if (mapFromPreferences) {
        destinationPreferences = mapFromPreferences({
          destinations,
          preferences,
        })
      } else {
        destinationPreferences = preferences
      }

      const newDestinations = getNewDestinations(
        destinations,
        destinationPreferences
      )

      savePreferences(destinationPreferences)
      conditionallyLoadAnalytics({
        writeKey,
        destinations,
        destinationPreferences,
        isEnforcingConsent,
      })

      return {preferences, newDestinations}
    })
  }

  mergePreferences = ({destinations, existingPreferences, newPreferences}) => {
    const {mapToPreferences} = this.props
    let preferences

    if (typeof newPreferences === 'boolean') {
      const destinationPreferences = {}
      for (const destination of destinations) {
        destinationPreferences[destination.id] = newPreferences
      }

      if (mapToPreferences) {
        preferences = mapToPreferences({
          destinations,
          destinationPreferences,
        })
      } else {
        preferences = destinationPreferences
      }
    } else {
      preferences = {
        ...existingPreferences,
        ...newPreferences,
      }
    }

    return preferences
  }
}
