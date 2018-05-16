import EventEmitter from 'events'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Banner from './banner'
import PreferenceDialog from './preference-dialog'
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
    isDialogOpen: false
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
    const {isDialogOpen} = this.state
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
              onAccept={this.allowAllTracking}
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

  allowAllTracking = () => {
    const {saveConsent} = this.props

    saveConsent()
    this.setState({
      isDialogOpen: false
    })
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

  handleBodyClick = e => {
    const {
      newDestinations,
      saveConsent,
      isConsentRequired,
      implyConsentOnInteraction
    } = this.props

    if (
      (this.banner && this.banner.contains(e.target)) ||
      (this.preferenceDialog && this.preferenceDialog.contains(e.target))
    ) {
      return
    }

    if (
      isConsentRequired &&
      implyConsentOnInteraction &&
      newDestinations.length > 0
    ) {
      saveConsent(undefined, false)
    }
  }

  handleCategoryChange = (category, value) => {
    const {setPreferences} = this.props

    setPreferences({
      [category]: value
    })
  }

  handleSave = () => {
    const {saveConsent} = this.props

    saveConsent()
    this.closeDialog()
  }

  handleCancel = () => {
    const {resetPreferences} = this.props

    resetPreferences()
    this.closeDialog()
  }
}
