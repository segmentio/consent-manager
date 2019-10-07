import EventEmitter from 'events'
import React, { PureComponent } from 'react'
import Banner from './banner'
import PreferenceDialog from './preference-dialog'
import CancelDialog from './cancel-dialog'
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories'
import { Destination, CategoryPreferences } from '../types'

const emitter = new EventEmitter()
export function openDialog() {
  emitter.emit('openDialog')
}

interface ContainerProps {
  setPreferences: (prefs: CategoryPreferences) => void
  resetPreferences: () => void
  saveConsent: (newPreferences?: CategoryPreferences, shouldReload?: boolean) => void
  destinations: Destination[]
  newDestinations: Destination[]
  preferences: CategoryPreferences
  isConsentRequired: boolean
  implyConsentOnInteraction: boolean
  bannerContent: React.ReactNode
  bannerSubContent: React.ReactNode
  bannerTextColor: string
  bannerBackgroundColor: string
  preferencesDialogTitle: React.ReactNode
  preferencesDialogContent: React.ReactNode
  cancelDialogTitle: React.ReactNode
  cancelDialogContent: React.ReactNode
}

type ContainerState = {
  isDialogOpen: boolean
  isCancelling: boolean
}

export default class Container extends PureComponent<ContainerProps, ContainerState> {
  static displayName = 'Container'

  private banner: HTMLElement
  private preferenceDialog: HTMLElement
  private cancelDialog: HTMLElement

  state = {
    isDialogOpen: false,
    isCancelling: false
  }

  render() {
    const {
      destinations,
      newDestinations,
      preferences,
      isConsentRequired,
      bannerContent,
      bannerSubContent,
      bannerTextColor,
      bannerBackgroundColor,
      preferencesDialogTitle,
      preferencesDialogContent,
      cancelDialogTitle,
      cancelDialogContent
    } = this.props

    const { isDialogOpen, isCancelling } = this.state
    const marketingDestinations: Destination[] = []
    const advertisingDestinations: Destination[] = []
    const functionalDestinations: Destination[] = []

    for (const destination of destinations) {
      if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
        advertisingDestinations.push(destination)
      } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
        functionalDestinations.push(destination)
      } else {
        // Fallback to marketing
        marketingDestinations.push(destination)
      }
    }

    // TODO: add state for banner so it doesn't disappear on implicit consent (which is annoying UX)
    return (
      <div>
        {isConsentRequired && newDestinations.length > 0 && (
          <Banner
            innerRef={this.handleBannerRef}
            onAccept={this.handleBannerAccept}
            onChangePreferences={this.openDialog}
            content={bannerContent}
            subContent={bannerSubContent}
            textColor={bannerTextColor}
            backgroundColor={bannerBackgroundColor}
          />
        )}

        {isDialogOpen && (
          <PreferenceDialog
            innerRef={this.handlePreferenceDialogRef}
            onCancel={this.handleCancel}
            onSave={this.handleSave}
            onChange={this.handleCategoryChange}
            marketingDestinations={marketingDestinations}
            advertisingDestinations={advertisingDestinations}
            functionalDestinations={functionalDestinations}
            marketingAndAnalytics={preferences.marketingAndAnalytics!}
            advertising={preferences.advertising!}
            functional={preferences.functional!}
            title={preferencesDialogTitle}
            content={preferencesDialogContent}
          />
        )}

        {isCancelling && (
          <CancelDialog
            innerRef={this.handleCancelDialogRef}
            onBack={this.handleCancelBack}
            onConfirm={this.handleCancelConfirm}
            title={cancelDialogTitle}
            content={cancelDialogContent}
          />
        )}
      </div>
    )
  }

  componentDidMount() {
    const { isConsentRequired, implyConsentOnInteraction } = this.props
    emitter.on('openDialog', this.openDialog)
    if (isConsentRequired && implyConsentOnInteraction) {
      document.body.addEventListener('click', this.handleBodyClick, false)
    }
  }

  componentWillUnmount() {
    emitter.removeListener('openDialog', this.openDialog)
    document.body.removeEventListener('click', this.handleBodyClick, false)
  }

  openDialog = () => {
    this.setState({
      isDialogOpen: true
    })
  }

  closeDialog = () => {
    this.setState({
      isDialogOpen: false
    })
  }

  handleBannerRef = (node: HTMLElement) => {
    this.banner = node
  }

  handlePreferenceDialogRef = (node: HTMLElement) => {
    this.preferenceDialog = node
  }

  handleCancelDialogRef = (node: HTMLElement) => {
    this.cancelDialog = node
  }

  handleBannerAccept = () => {
    const { saveConsent } = this.props
    saveConsent()
  }

  handleBodyClick = e => {
    const {
      newDestinations,
      saveConsent,
      isConsentRequired,
      implyConsentOnInteraction
    } = this.props

    // Do nothing if no new implicit consent needs to be saved
    if (!isConsentRequired || !implyConsentOnInteraction || newDestinations.length === 0) {
      return
    }

    // Ignore propogated clicks from inside the consent manager
    if (
      (this.banner && this.banner.contains(e.target)) ||
      (this.preferenceDialog && this.preferenceDialog.contains(e.target)) ||
      (this.cancelDialog && this.cancelDialog.contains(e.target))
    ) {
      return
    }

    saveConsent(undefined, false)
  }

  handleCategoryChange = (category: string, value: boolean) => {
    const { setPreferences } = this.props
    setPreferences({
      [category]: value
    })
  }

  handleSave = () => {
    const { saveConsent } = this.props
    this.setState({
      isDialogOpen: false
    })
    saveConsent()
  }

  handleCancel = () => {
    const { resetPreferences, newDestinations } = this.props

    this.setState({
      isDialogOpen: false
    })

    // Only show the cancel confirmation if there's unconsented destinations
    if (newDestinations.length > 0) {
      this.setState({
        isCancelling: true
      })
    } else {
      resetPreferences()
    }
  }

  handleCancelBack = () => {
    this.setState({
      isDialogOpen: true,
      isCancelling: false
    })
  }

  handleCancelConfirm = () => {
    const { resetPreferences } = this.props

    this.setState({
      isCancelling: false
    })

    resetPreferences()
  }
}
