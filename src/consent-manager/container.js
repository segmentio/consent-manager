import EventEmitter from 'events'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Banner from './banner'
import PreferenceDialog from './preference-dialog'
import CancelDialog from './cancel-dialog'
import {
  ADVERTISING_CATEGORIES,
  FUNCTIONAL_CATEGORIES,
  HEATMAPPING_CATEGORIES
} from './categories'

const emitter = new EventEmitter()

export function openDialog() {
  emitter.emit('openDialog')
}

export default class Container extends PureComponent {
  static displayName = 'Container'

  static propTypes = {
    setPreferences: PropTypes.func.isRequired,
    resetPreferences: PropTypes.func.isRequired,
    saveConsent: PropTypes.func.isRequired,
    destinations: PropTypes.arrayOf(PropTypes.object).isRequired,
    newDestinations: PropTypes.arrayOf(PropTypes.object).isRequired,
    preferences: PropTypes.object.isRequired,
    isConsentRequired: PropTypes.bool.isRequired,
    implyConsentOnInteraction: PropTypes.bool.isRequired,
    bannerContent: PropTypes.node.isRequired,
    bannerTextColor: PropTypes.string.isRequired,
    bannerBackgroundColor: PropTypes.string.isRequired,
    dialogTitle: PropTypes.node.isRequired,
    dialogContent: PropTypes.node.isRequired
  }

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
      bannerTextColor,
      bannerBackgroundColor,
      dialogTitle,
      dialogContent
    } = this.props
    const {isDialogOpen, isCancelling} = this.state
    const marketingDestinations = []
    const advertisingDestinations = []
    const functionalDestinations = []
    const heatmappingDestinations = []

    for (const destination of destinations) {
      if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
        advertisingDestinations.push(destination)
      } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
        functionalDestinations.push(destination)
      } else if (HEATMAPPING_CATEGORIES.find(c => c === destination.category)) {
        heatmappingDestinations.push(destination)
      } else {
        // Fallback to marketing
        marketingDestinations.push(destination)
      }
    }

    // TODO: add state for banner so it doesn't disappear on implicit consent (which is annoying UX)
    return (
      <div>
        {isConsentRequired &&
          newDestinations.length > 0 && (
            <Banner
              innerRef={this.handleBannerRef}
              onAccept={this.handleBannerAccept}
              onChangePreferences={this.openDialog}
              content={bannerContent}
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
            heatmappingDestinations={heatmappingDestinations}
            marketingAndAnalytics={preferences.marketingAndAnalytics}
            advertising={preferences.advertising}
            functional={preferences.functional}
            heatmapping={preferences.heatmapping}
            title={dialogTitle}
            content={dialogContent}
          />
        )}
        {isCancelling && (
          <CancelDialog
            innerRef={this.handleCancelDialogRef}
            onBack={this.handleCancelBack}
            onConfirm={this.handleCancelConfirm}
          />
        )}
      </div>
    )
  }

  componentDidMount() {
    const {isConsentRequired, implyConsentOnInteraction} = this.props

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

  handleBannerRef = node => {
    this.banner = node
  }

  handlePreferenceDialogRef = node => {
    this.preferenceDialog = node
  }

  handleCancelDialogRef = node => {
    this.cancelDialog = node
  }

  handleBannerAccept = () => {
    const {saveConsent} = this.props

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
    if (
      !isConsentRequired ||
      !implyConsentOnInteraction ||
      newDestinations.length === 0
    ) {
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

  handleCategoryChange = (category, value) => {
    const {setPreferences} = this.props

    setPreferences({
      [category]: value
    })
  }

  handleSave = () => {
    const {saveConsent} = this.props

    this.setState({
      isDialogOpen: false
    })
    saveConsent()
  }

  handleCancel = () => {
    const {resetPreferences, newDestinations} = this.props

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
    const {resetPreferences} = this.props

    this.setState({
      isCancelling: false
    })
    resetPreferences()
  }
}
