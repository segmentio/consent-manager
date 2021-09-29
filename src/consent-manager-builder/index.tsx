import { Component } from 'react'
import { loadPreferences, savePreferences } from './preferences'
import fetchDestinations from './fetch-destinations'
import conditionallyLoadAnalytics from './analytics'
import { getConsentPreferences } from './preferences-utils'
import { Destination, CategoryPreferences, CustomCategories } from '../types'

function getNewDestinations(destinations: Destination[], preferences: CategoryPreferences) {
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
  /** Your Segment Write key for your website */
  writeKey: string

  /** A list of other write keys you may want to provide */
  otherWriteKeys?: string[]

  cookieDomain?: string

  /**
   * An initial selection of Preferences
   */
  initialPreferences?: CategoryPreferences

  /**
   * Provide a function to define whether or not consent should be required
   */
  shouldRequireConsent?: () => Promise<boolean> | boolean

  /**
   * Render props for the Consent Manager builder
   */
  children: (props: RenderProps) => React.ReactElement

  /**
   * Allows for customizing how to show different categories of consent.
   */
  mapCustomPreferences?: (
    destinations: Destination[],
    preferences: CategoryPreferences
  ) => { destinationPreferences: CategoryPreferences; customPreferences: CategoryPreferences }

  /**
   * Allows for adding custom consent categories by mapping a custom category to Segment integrations
   */
  customCategories?: CustomCategories

  /**
   * A callback for dealing with errors in the Consent Manager
   */
  onError?: (err: Error) => void | Promise<void>
}

interface RenderProps {
  destinations: Destination[]
  newDestinations: Destination[]
  preferences: CategoryPreferences
  isConsentRequired: boolean
  customCategories?: CustomCategories
  setPreferences: (newPreferences: CategoryPreferences) => void
  resetPreferences: () => void
  saveConsent: (newPreferences?: CategoryPreferences | boolean, shouldReload?: boolean) => void
}

interface State {
  isLoading: boolean
  destinations: Destination[]
  newDestinations: Destination[]
  preferences?: CategoryPreferences
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
    const { children, customCategories } = this.props
    const { isLoading, destinations, preferences, newDestinations, isConsentRequired } = this.state

    if (isLoading) {
      console.log('loading')
      return null
    }

    console.log('done')

    return children({
      destinations,
      customCategories,
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
      await this.initialise()
    }
  }

  initialise = async () => {
    const {
      writeKey,
      otherWriteKeys = ConsentManagerBuilder.defaultProps.otherWriteKeys,
      shouldRequireConsent = ConsentManagerBuilder.defaultProps.shouldRequireConsent,
      initialPreferences,
      mapCustomPreferences
    } = this.props
    // TODO: add option to run mapCustomPreferences on load so that the destination preferences automatically get updated
    let { destinationPreferences = {}, customPreferences } = loadPreferences()

    const [isConsentRequired, destinations] = await Promise.all([
      shouldRequireConsent(),
      fetchDestinations([writeKey, ...otherWriteKeys])
    ])

    const newDestinations = getNewDestinations(destinations, destinationPreferences)

    let preferences: CategoryPreferences | undefined
    if (mapCustomPreferences) {
      preferences = customPreferences || initialPreferences || {}

      let definedObject = function(obj: object | undefined) {
        return obj == undefined ? {} : obj
      }

      const hasInitialPreferenceToTrue = Object.keys(definedObject(initialPreferences))
        .map(e => definedObject(initialPreferences)[e])
        .some(Boolean)

      const emptyCustomPreferecences = Object.keys(definedObject(customPreferences))
        .map(e => definedObject(customPreferences)[e])
        .every(v => v === null || v === undefined)

      if (hasInitialPreferenceToTrue && emptyCustomPreferecences) {
        const mapped = mapCustomPreferences(destinations, preferences)
        destinationPreferences = mapped.destinationPreferences
        customPreferences = mapped.customPreferences
      }
    } else {
      preferences = destinationPreferences || initialPreferences
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired
    })

    this.setState({
      isLoading: false,
      destinations,
      newDestinations,
      preferences,
      isConsentRequired
    })
  }

  handleSetPreferences = (newPreferences: CategoryPreferences) => {
    this.setState(prevState => {
      const { destinations, preferences: existingPreferences } = prevState
      const preferences = this.mergePreferences({
        destinations,
        newPreferences,
        existingPreferences
      })
      return { ...prevState, preferences }
    })
  }

  handleResetPreferences = () => {
    const { initialPreferences, mapCustomPreferences } = this.props
    const { destinationPreferences, customPreferences } = loadPreferences()

    let preferences: CategoryPreferences | undefined
    if (mapCustomPreferences) {
      preferences = customPreferences || initialPreferences
    } else {
      preferences = destinationPreferences || initialPreferences
    }

    this.setState({ preferences })
  }

  handleSaveConsent = (newPreferences: CategoryPreferences | undefined, shouldReload: boolean) => {
    const { writeKey, cookieDomain, mapCustomPreferences } = this.props

    this.setState(prevState => {
      const { destinations, preferences: existingPreferences, isConsentRequired } = prevState

      let preferences = this.mergePreferences({
        destinations,
        newPreferences,
        existingPreferences
      })

      let destinationPreferences: CategoryPreferences
      let customPreferences: CategoryPreferences | undefined

      if (mapCustomPreferences) {
        const custom = mapCustomPreferences(destinations, preferences)
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

      const trackingPermissions = {
        ...destinationPreferences,
        ...customPreferences
      }

      this.dispatchEvent('consent_permissions_changed', {
        referrer: document.referrer,
        ...getConsentPreferences(trackingPermissions)
      })

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

  dispatchEvent = (eventType: string, data: object) => {
    const event = new CustomEvent(eventType, { detail: data })

    document.dispatchEvent(event)
  }

  mergePreferences = (args: {
    destinations: Destination[]
    existingPreferences?: CategoryPreferences
    newPreferences?: CategoryPreferences
  }) => {
    const { destinations, existingPreferences, newPreferences } = args

    let preferences: CategoryPreferences

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
