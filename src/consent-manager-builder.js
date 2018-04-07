import {Component} from 'react'
import PropTypes from 'prop-types'
import {flatten, sortedUniqBy, sortBy} from 'lodash'
import {loadPreferences, savePreferences} from './preferences'
import fetchDestinations from './fetch-destinations'

export default class ConsentManagerBuilder extends Component {
  static displayName = 'ConsentManagerBuilder'

  static propTypes = {
    children: PropTypes.func.isRequired,
    writeKey: PropTypes.string.isRequired,
    otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
    shouldEnforceConsent: PropTypes.func,
  }

  static defaultProps = {
    otherWriteKeys: [],
    shouldEnforceConsent: () => Promise.resolve(true),
  }

  constructor() {
    super()

    this.state = {
      isLoading: true,
      destinations: null,
      preferences: null,
    }
  }

  render() {
    const {children} = this.props
    const {isLoading, destinations, preferences} = this.state

    if (isLoading) {
      return null
    }

    return children({
      destinations,
      preferences,
      setPreferences: this.handleSetPreferences,
      saveConsent: this.handleSaveConsent,
    })
  }

  async componentDidMount() {
    const {writeKey, otherWriteKeys, shouldEnforceConsent} = this.props
    const preferences = loadPreferences()

    try {
      if (!await shouldEnforceConsent()) {
        return
      }

      const destinationsRequests = [fetchDestinations(writeKey)]
      for (const otherWriteKey of otherWriteKeys) {
        destinationsRequests.push(fetchDestinations(otherWriteKey))
      }

      let destinations = flatten(await Promise.all(destinationsRequests))

      destinations = sortBy(destinations, ['id'])
      destinations = sortedUniqBy(destinations, 'id')

      this.setState({isLoading: false, destinations, preferences})
    } catch (error) {
      // TODO: handle errors properly
      console.error(error)
    }
  }

  handleSetPreferences = preferences => {
    this.setState(prevState => ({
      preferences: {
        ...prevState.preferences,
        ...preferences,
      },
    }))
  }

  handleSaveConsent = preferences => {
    savePreferences({
      ...this.state.preferences,
      ...preferences,
    })
  }
}
