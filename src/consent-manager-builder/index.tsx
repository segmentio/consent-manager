import { Component } from 'react'
import { loadPreferences, savePreferences } from './preferences'
import fetchDestinations from './fetch-destinations'
import conditionallyLoadAnalytics from './analytics'
import { Preferences, Destination } from '../types'

function getNewDestinations(destinations: Destination[], preferences: Preferences) {
  const newDestinations: Destination[] = []

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

interface Props {
  onError?: (err: Error) => void | Promise<void>
  writeKey: string
  otherWriteKeys?: string[]
  shouldRequireConsent?: () => boolean
  initialPreferences?: Preferences
  cookieDomain?: string
  children: (props: RenderProps) => React.ReactElement

  mapCustomPreferences?: (args: {
    destinations: Destination[]
    preferences: Preferences
  }) => { destinationPreferences: Preferences; customPreferences: Preferences }
}

interface RenderProps {
  destinations: Destination[]
  newDestinations: Destination[]
  preferences: Preferences
  isConsentRequired: boolean
  setPreferences
  resetPreferences
  saveConsent
}

interface State {
  isLoading: boolean
  destinations: Destination[]
  newDestinations: Destination[]
  preferences?: Preferences
  isConsentRequired: boolean
}

export default class ConsentManagerBuilder extends Component<Props, State> {
  static displayName = 'ConsentManagerBuilder'

  static defaultProps = {
    otherWriteKeys: [],
    onError: undefined,
    shouldRequireConsent: () => true,
    initialPreferences: {}
  }

  state = {
    isLoading: true,
    destinations: [],
    newDestinations: [],
    preferences: {},
    isConsentRequired: true
  }

  render() {
    const { children } = this.props
    const { isLoading, destinations, preferences, newDestinations, isConsentRequired } = this.state

    if (isLoading) {
      return null
    }

    return children({
      destinations,
      newDestinations,
      preferences,
      isConsentRequired,
      setPreferences: this.handleSetPreferences,
      resetPreferences: this.handleResetPreferences,
      saveConsent: this.handleSaveConsent
    })
  }

  async componentDidMount() {
    const { onError } = this.props
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
      otherWriteKeys = [],
      shouldRequireConsent = () => true,
      initialPreferences,
      mapCustomPreferences
    } = this.props
    // TODO: add option to run mapCustomPreferences on load so that the destination preferences automatically get updated
    const { destinationPreferences = {}, customPreferences } = loadPreferences()

    const [isConsentRequired, destinations] = await Promise.all([
      shouldRequireConsent(),
      fetchDestinations([writeKey, ...otherWriteKeys])
    ])

    const newDestinations = getNewDestinations(destinations, destinationPreferences)

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired
    })

    let preferences: Preferences | undefined
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
      isConsentRequired
    })
  }

  handleSetPreferences = (newPreferences: Preferences) => {
    this.setState(prevState => {
      const { destinations, preferences: existingPreferences } = prevState
      const preferences = this.mergePreferences({
        destinations,
        newPreferences,
        existingPreferences
      })
      return { preferences }
    })
  }

  handleResetPreferences = () => {
    const { initialPreferences, mapCustomPreferences } = this.props
    const { destinationPreferences, customPreferences } = loadPreferences()

    let preferences: Preferences | undefined
    if (mapCustomPreferences) {
      preferences = customPreferences || initialPreferences
    } else {
      preferences = destinationPreferences || initialPreferences
    }

    this.setState({ preferences })
  }

  handleSaveConsent = (newPreferences: Preferences | undefined, shouldReload: boolean) => {
    const { writeKey, cookieDomain, mapCustomPreferences } = this.props

    this.setState(prevState => {
      const { destinations, preferences: existingPreferences, isConsentRequired } = prevState

      let preferences = this.mergePreferences({
        destinations,
        newPreferences,
        existingPreferences
      })

      let destinationPreferences: Preferences
      let customPreferences: Preferences | undefined

      if (mapCustomPreferences) {
        const custom = mapCustomPreferences({
          destinations,
          preferences
        })
        destinationPreferences = custom.destinationPreferences
        customPreferences = custom.customPreferences

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

      const newDestinations = getNewDestinations(destinations, destinationPreferences)

      savePreferences({ destinationPreferences, customPreferences, cookieDomain })
      conditionallyLoadAnalytics({
        writeKey,
        destinations,
        destinationPreferences,
        isConsentRequired,
        shouldReload
      })

      return { ...prevState, destinationPreferences, preferences, newDestinations }
    })
  }

  mergePreferences = (args: {
    destinations: Destination[]
    existingPreferences?: Preferences
    newPreferences?: Preferences
  }) => {
    const { destinations, existingPreferences, newPreferences } = args

    let preferences: Preferences

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
      preferences = existingPreferences!
    }

    return preferences
  }
}
