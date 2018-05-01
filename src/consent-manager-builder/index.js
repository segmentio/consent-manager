import {Component} from 'react'
import PropTypes from 'prop-types'
import {loadPreferences, savePreferences} from './preferences'
import fetchDestinations from './fetch-destinations'
import {getNewDestinations, addMissingPreferences} from './utils'
import conditionallyLoadAnalytics from './analytics'

// Used to provide a stable value in render
const emptyObject = {}

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
  }

  render() {
    const {children} = this.props
    const {isLoading, destinations, preferences, newDestinations} = this.state

    if (isLoading) {
      return null
    }

    return children({
      destinations,
      newDestinations,
      preferences: preferences || emptyObject,
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

    if (!await shouldEnforceConsent()) {
      return
    }

    const destinations = await fetchDestinations([writeKey, ...otherWriteKeys])
    const newDestinations = getNewDestinations(
      destinations,
      destinationPreferences
    )

    // TODO: load without destinations? (faster)
    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
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
      const {destinations, preferences: existingPreferences} = prevState

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

      destinationPreferences = addMissingPreferences(
        destinations,
        destinationPreferences
      )
      const newDestinations = getNewDestinations(
        destinations,
        destinationPreferences
      )

      savePreferences(destinationPreferences)
      conditionallyLoadAnalytics({
        writeKey,
        destinations,
        destinationPreferences,
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
