import EventEmitter from 'events'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Banner from './banner'
// Import PreferenceDialog from "./preference-dialog";
// import CancelDialog from "./cancel-dialog";
import PrivacyDialog from './privacy-dialog'
import {ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES} from './categories'

const BannerWrapper = styled('div')`
  position: fixed;
  width: 300px;
  max-width: 100%;
`

const emitter = new EventEmitter()

export const openDialog = () => {
  emitter.emit('openDialog')
}

export default class Container extends PureComponent {
  static displayName = 'Container'

  static propTypes = {
    saveConsent: PropTypes.func.isRequired,
    destinations: PropTypes.arrayOf(PropTypes.object).isRequired,
    newDestinations: PropTypes.arrayOf(PropTypes.object).isRequired,
    isConsentRequired: PropTypes.bool.isRequired,
    implyConsentOnInteraction: PropTypes.bool.isRequired,
    bannerContent: PropTypes.node.isRequired,
    bannerSubContent: PropTypes.string.isRequired,
    bannerTextColor: PropTypes.string.isRequired,
    bannerBackgroundColor: PropTypes.string.isRequired,
    bannerHorizontalPosition: PropTypes.string.isRequired,
    bannerVerticalPosition: PropTypes.string.isRequired,
    bannerWidth: PropTypes.string,
    privacyPolicyContent: PropTypes.node.isRequired
  }

  static defaultProps = {
    bannerWidth: null
  }

  state = {
    shouldShowPrivacyPolicy: false
  }

  render() {
    const {
      destinations,
      newDestinations,
      isConsentRequired,
      bannerContent,
      bannerSubContent,
      bannerTextColor,
      bannerBackgroundColor,
      bannerHorizontalPosition,
      bannerVerticalPosition,
      bannerWidth,
      privacyPolicyContent
    } = this.props
    const {shouldShowPrivacyPolicy} = this.state
    const marketingDestinations = []
    const advertisingDestinations = []
    const functionalDestinations = []
    const bannerStyle = {}

    if (bannerHorizontalPosition === 'left') {
      bannerStyle.left = 0
    } else {
      bannerStyle.right = 0
    }

    if (bannerVerticalPosition === 'top') {
      bannerStyle.top = 0
    } else {
      bannerStyle.bottom = 0
    }

    if (bannerWidth) {
      bannerStyle.width = bannerWidth
    }

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
      <BannerWrapper style={bannerStyle}>
        {isConsentRequired &&
          newDestinations.length > 0 && (
            <Banner
              innerRef={this.handleBannerRef}
              onAccept={this.handleBannerAccept}
              onPrivacyPolicy={this.handlePrivacyDialog}
              content={bannerContent}
              subContent={bannerSubContent}
              textColor={bannerTextColor}
              backgroundColor={bannerBackgroundColor}
            />
          )}
        {shouldShowPrivacyPolicy && (
          <PrivacyDialog
            innerRef={this.handlePrivacyDialogRef}
            title="Privacy Policy"
            content={privacyPolicyContent}
            onDismiss={this.handlePrivacyDismiss}
          />
        )}
      </BannerWrapper>
    )
  }

  componentDidMount() {
    const {isConsentRequired, implyConsentOnInteraction} = this.props

    // Emitter.on("openDialog", this.openDialog);

    if (isConsentRequired && implyConsentOnInteraction) {
      document.body.addEventListener('click', this.handleBodyClick, false)
      document.addEventListener('mousedown', this.handleBodyClick, false)
    }
  }

  componentWillUnmount() {
    // Emitter.removeListener("openDialog", this.openDialog);
    document.body.removeEventListener('click', this.handleBodyClick, false)
    document.removeEventListener('mousedown', this.handleBodyClick, false)
  }

  handleBannerRef = node => {
    this.banner = node
  }

  handlePrivacyDialogRef = node => {
    this.privacyDialog = node
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
      (this.privacyDialog && this.privacyDialog.contains(e.target))
    ) {
      return
    }

    saveConsent(undefined, false)
  }

  handlePrivacyDialog = () => {
    this.setState({
      shouldShowPrivacyPolicy: true
    })
  }

  handlePrivacyDismiss = () => {
    this.setState({
      shouldShowPrivacyPolicy: false
    })
  }
}
