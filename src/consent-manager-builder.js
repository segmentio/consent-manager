import {Component} from 'react'
import PropTypes from 'prop-types'
import {loadPreferences, savePreferences} from './preferences'
import fetchDestinations from './fetch-destinations'
import {
  getNewDestinations,
  mergePreferences,
  addMissingPreferences,
} from './utils'
import conditionallyLoadAnalytics from './analytics'

export default class ConsentManagerBuilder extends Component {
  static displayName = 'ConsentManagerBuilder'

  static propTypes = {
    children: PropTypes.func.isRequired,
    writeKey: PropTypes.string.isRequired,
    otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
    shouldEnforceConsent: PropTypes.func,
    onLoad: PropTypes.func,
    onSave: PropTypes.func,
  }

  static defaultProps = {
    otherWriteKeys: [],
    shouldEnforceConsent: () => true,
    onLoad: () => {},
    onSave: () => {},
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
      preferences: preferences || {},
      setPreferences: this.handleSetPreferences,
      resetPreferences: this.handleResetPreferences,
      saveConsent: this.handleSaveConsent,
    })
  }

  componentDidMount() {
    // TODO: handle errors properly
    this.initialise()
  }

  initialise = async () => {
    const {writeKey, otherWriteKeys, shouldEnforceConsent, onLoad} = this.props
    const preferences = loadPreferences()

    if (!await shouldEnforceConsent()) {
      return
    }

    const destinations = await fetchDestinations([writeKey, ...otherWriteKeys])
    const newDestinations = getNewDestinations(destinations, preferences)

    onLoad({destinations, newDestinations, preferences})

    // TODO: load without destinations? (faster)
    conditionallyLoadAnalytics({writeKey, destinations, preferences})

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
      return {
        preferences: mergePreferences({
          destinations,
          existingPreferences,
          newPreferences,
        }),
      }
    })
  }

  handleResetPreferences = () => {
    this.setState({preferences: loadPreferences()})
  }

  handleSaveConsent = newPreferences => {
    const {writeKey, onSave} = this.props

    this.setState(prevState => {
      const {destinations, preferences: existingPreferences} = prevState

      let preferences = mergePreferences({
        destinations,
        existingPreferences,
        newPreferences,
      })
      preferences = addMissingPreferences(destinations, preferences)

      const overridePreferences = onSave(preferences)
      if (overridePreferences) {
        preferences = overridePreferences
      }

      const newDestinations = getNewDestinations(destinations, preferences)

      savePreferences(preferences)
      conditionallyLoadAnalytics({writeKey, destinations, preferences})

      return {preferences, newDestinations}
    })
  }
}
