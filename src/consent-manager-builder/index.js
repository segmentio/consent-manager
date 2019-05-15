import {Component} from 'react'
import PropTypes from 'prop-types'
import {loadPreferences, savePreferences} from './preferences'
import fetchDestinations from './fetch-destinations'
import conditionallyLoadAnalytics from './analytics'

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
    onError: PropTypes.func,
    writeKey: PropTypes.string.isRequired,
    otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
    shouldRequireConsent: PropTypes.func,
    initialPreferences: PropTypes.object,
    mapCustomPreferences: PropTypes.func,
    cookieDomain: PropTypes.string
  }

  static defaultProps = {
    otherWriteKeys: [],
    onError: undefined,
    shouldRequireConsent: () => true,
    initialPreferences: {},
    mapCustomPreferences: undefined,
    cookieDomain: undefined
  }

  state = {
    isLoading: true,
    destinations: [],
    newDestinations: [],
    preferences: {},
    isBannerVisible: true,
    isConsentRequired: true
  }

  render() {
    const {children} = this.props
    const {
      isLoading,
      destinations,
      preferences,
      newDestinations,
      isBannerVisible,
      isConsentRequired
    } = this.state

    if (isLoading) {
      return null
    }

    return children({
      destinations,
      newDestinations,
      preferences,
      isBannerVisible,
      isConsentRequired,
      setPreferences: this.handleSetPreferences,
      resetPreferences: this.handleResetPreferences,
      saveConsent: this.handleSaveConsent
    })
  }

  async componentDidMount() {
    const {onError} = this.props
    if (onError && typeof onError === 'function') {
      try {
        await this.initialise()
      } catch (e) {
        await onError(e)
      }
    } else {
      this.initialise()
    }
  }

  initialise = async () => {
    const {
      writeKey,
      otherWriteKeys,
      shouldRequireConsent,
      initialPreferences,
      mapCustomPreferences
    } = this.props
    // TODO: add option to run mapCustomPreferences on load so that the destination preferences automatically get updated
    const {
      destinationPreferences,
      customPreferences,
      isBannerVisible
    } = loadPreferences()

    const [isConsentRequired, destinations] = await Promise.all([
      shouldRequireConsent(),
      fetchDestinations([writeKey, ...otherWriteKeys])
    ])

    const newDestinations = getNewDestinations(
      destinations,
      destinationPreferences
    )

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired
    })

    let preferences
    if (mapCustomPreferences) {
      preferences = customPreferences || initialPreferences
    } else {
      preferences = destinationPreferences || initialPreferences
    }

    this.setState({
      isLoading: false,
      destinations,
      newDestinations,
      preferences,
      isBannerVisible,
      isConsentRequired
    })
  }

  handleSetPreferences = newPreferences => {
    this.setState(prevState => {
      const {destinations, preferences: existingPreferences} = prevState
      const preferences = this.mergePreferences({
        destinations,
        newPreferences,
        existingPreferences
      })
      return {preferences}
    })
  }

  handleResetPreferences = () => {
    const {initialPreferences, mapCustomPreferences} = this.props
    const {destinationPreferences, customPreferences} = loadPreferences()

    let preferences
    if (mapCustomPreferences) {
      preferences = customPreferences || initialPreferences
    } else {
      preferences = destinationPreferences || initialPreferences
    }

    this.setState({preferences})
  }

  handleSaveConsent = (newPreferences, shouldReload, isBannerVisible) => {
    const {writeKey, cookieDomain, mapCustomPreferences} = this.props

    this.setState(prevState => {
      const {
        destinations,
        preferences: existingPreferences,
        isConsentRequired
      } = prevState

      let preferences = this.mergePreferences({
        destinations,
        newPreferences,
        existingPreferences
      })

      let destinationPreferences
      let customPreferences
      if (mapCustomPreferences) {
        ;({destinationPreferences, customPreferences} = mapCustomPreferences({
          destinations,
          preferences
        }))
        if (customPreferences) {
          // Allow the customPreferences to be updated from mapCustomPreferences
          preferences = customPreferences
        } else {
          // Make returning the customPreferences from mapCustomPreferences optional
          customPreferences = preferences
        }
      } else {
        destinationPreferences = preferences
      }

      const newDestinations = getNewDestinations(
        destinations,
        destinationPreferences
      )

      savePreferences({
        destinationPreferences,
        customPreferences,
        isBannerVisible,
        cookieDomain
      })
      conditionallyLoadAnalytics({
        writeKey,
        destinations,
        destinationPreferences,
        isConsentRequired,
        shouldReload
      })

      return {
        destinationPreferences,
        preferences,
        newDestinations,
        isBannerVisible
      }
    })
  }

  mergePreferences = ({destinations, existingPreferences, newPreferences}) => {
    let preferences

    if (typeof newPreferences === 'boolean') {
      const destinationPreferences = {}
      for (const destination of destinations) {
        destinationPreferences[destination.id] = newPreferences
      }
      preferences = destinationPreferences
    } else if (newPreferences) {
      preferences = {
        ...existingPreferences,
        ...newPreferences
      }
    } else {
      preferences = existingPreferences
    }

    return preferences
  }
}
