import { Component } from 'react'
import { loadPreferences, savePreferences } from './preferences'
import fetchDestinations from './fetch-destinations'
import conditionallyLoadAnalytics from './analytics'
import {
  Destination,
  CategoryPreferences,
  CustomCategories,
  DefaultDestinationBehavior
} from '../types'

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
  cookieName?: string

  /**
   * Number of days until the preferences cookie should expire
   */
  cookieExpires?: number

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
   * Specified default behavior for when new destinations are detected on the source(s) of this consent manager.
   */
  defaultDestinationBehavior?: DefaultDestinationBehavior

  /**
   * A callback for dealing with errors in the Consent Manager
   */
  onError?: (err: Error) => void | Promise<void>

  /**
   * CDN to fetch list of integrations from
   */
  cdnHost?: string
}

interface RenderProps {
  destinations: Destination[]
  newDestinations: Destination[]
  preferences: CategoryPreferences
  destinationPreferences: CategoryPreferences
  isConsentRequired: boolean
  customCategories?: CustomCategories
  havePreferencesChanged: boolean
  workspaceAddedNewDestinations: boolean
  setPreferences: (newPreferences: CategoryPreferences) => void
  resetPreferences: () => void
  saveConsent: (newPreferences?: CategoryPreferences | boolean, shouldReload?: boolean) => void
}

interface State {
  isLoading: boolean
  destinations: Destination[]
  newDestinations: Destination[]
  preferences?: CategoryPreferences
  destinationPreferences?: CategoryPreferences
  isConsentRequired: boolean
  havePreferencesChanged: boolean
  workspaceAddedNewDestinations: boolean
}

export default class ConsentManagerBuilder extends Component<Props, State> {
  static displayName = 'ConsentManagerBuilder'

  static defaultProps = {
    otherWriteKeys: [],
    onError: undefined,
    shouldRequireConsent: () => true,
    initialPreferences: {},
    cdnHost: 'cdn.segment.com'
  }

  state = {
    isLoading: true,
    destinations: [],
    newDestinations: [],
    preferences: {},
    destinationPreferences: {},
    isConsentRequired: true,
    havePreferencesChanged: false,
    workspaceAddedNewDestinations: false
  }

  render() {
    const { children, customCategories } = this.props
    const {
      isLoading,
      destinations,
      preferences,
      newDestinations,
      isConsentRequired,
      havePreferencesChanged,
      workspaceAddedNewDestinations,
      destinationPreferences
    } = this.state
    if (isLoading) {
      return null
    }

    return children({
      destinations,
      customCategories,
      newDestinations,
      preferences,
      isConsentRequired,
      havePreferencesChanged,
      workspaceAddedNewDestinations,
      destinationPreferences,
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
      mapCustomPreferences,
      defaultDestinationBehavior,
      cookieDomain,
      cookieName,
      cookieExpires,
      cdnHost = ConsentManagerBuilder.defaultProps.cdnHost
    } = this.props
    // TODO: add option to run mapCustomPreferences on load so that the destination preferences automatically get updated
    let { destinationPreferences, customPreferences } = loadPreferences(cookieName)

    const [isConsentRequired, destinations] = await Promise.all([
      shouldRequireConsent(),
      fetchDestinations(cdnHost, [writeKey, ...otherWriteKeys])
    ])

    const newDestinations = getNewDestinations(destinations, destinationPreferences || {})
    const workspaceAddedNewDestinations =
      destinationPreferences &&
      Object.keys(destinationPreferences).length > 0 &&
      newDestinations.length > 0

    let preferences: CategoryPreferences | undefined
    if (mapCustomPreferences) {
      preferences = customPreferences || initialPreferences || {}
      const hasInitialPreferenceToTrue = Object.values(initialPreferences || {}).some(Boolean)
      const emptyCustomPreferecences = Object.values(customPreferences || {}).every(
        v => v === null || v === undefined
      )

      if (
        (hasInitialPreferenceToTrue && emptyCustomPreferecences) ||
        (defaultDestinationBehavior === 'imply' && workspaceAddedNewDestinations)
      ) {
        const mapped = mapCustomPreferences(destinations, preferences)
        destinationPreferences = mapped.destinationPreferences
        customPreferences = mapped.customPreferences
        savePreferences({
          destinationPreferences,
          customPreferences,
          cookieDomain,
          cookieName,
          cookieExpires
        })
      }
    } else {
      preferences = destinationPreferences || initialPreferences
    }

    const shouldReload = false

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired,
      shouldReload,
      defaultDestinationBehavior,
      categoryPreferences: preferences
    })

    this.setState({
      isLoading: false,
      destinations,
      newDestinations,
      preferences,
      isConsentRequired,
      destinationPreferences,
      workspaceAddedNewDestinations: Boolean(workspaceAddedNewDestinations)
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
      return { ...prevState, preferences, havePreferencesChanged: true }
    })
  }

  handleResetPreferences = () => {
    const { initialPreferences, mapCustomPreferences, cookieName } = this.props
    const { destinationPreferences, customPreferences } = loadPreferences(cookieName)

    let preferences: CategoryPreferences | undefined
    if (mapCustomPreferences) {
      preferences = customPreferences || initialPreferences
    } else {
      preferences = destinationPreferences || initialPreferences
    }

    this.setState({ preferences })
  }

  handleSaveConsent = (newPreferences: CategoryPreferences | undefined, shouldReload: boolean) => {
    const {
      writeKey,
      cookieDomain,
      cookieName,
      cookieExpires,
      mapCustomPreferences,
      defaultDestinationBehavior
    } = this.props

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

      // If preferences haven't changed, don't reload the page as it's a disruptive experience for end-users
      if (prevState.havePreferencesChanged || newDestinations.length > 0) {
        savePreferences({
          destinationPreferences,
          customPreferences,
          cookieDomain,
          cookieName,
          cookieExpires
        })
        conditionallyLoadAnalytics({
          writeKey,
          destinations,
          destinationPreferences,
          isConsentRequired,
          shouldReload,
          defaultDestinationBehavior,
          categoryPreferences: customPreferences
        })
      }

      return { ...prevState, destinationPreferences, preferences, newDestinations }
    })
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
