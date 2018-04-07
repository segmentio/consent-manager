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

  componentDidMount() {
    // TODO: handle errors properly
    this.load().catch(error => console.error(error))
  }

  load = async () => {
    const {writeKey, otherWriteKeys, shouldEnforceConsent} = this.props

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

    const preferences = loadPreferences()

    this.setState({isLoading: false, destinations, preferences})
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
