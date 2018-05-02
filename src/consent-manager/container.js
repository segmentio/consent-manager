import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Banner from './banner'
import Dialog from './dialog'
import {ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES} from './categories'

export default class Container extends PureComponent {
  static displayName = 'Container'

  static propTypes = {
    setPreferences: PropTypes.func.isRequired,
    saveConsent: PropTypes.func.isRequired,
    destinations: PropTypes.arrayOf(PropTypes.object).isRequired,
    newDestinations: PropTypes.arrayOf(PropTypes.object).isRequired,
    preferences: PropTypes.object.isRequired,
  }

  state = {
    isDialogOpen: false,
  }

  render() {
    const {destinations, newDestinations, preferences} = this.props
    const {isDialogOpen} = this.state
    const marketingDestinations = []
    const advertisingDestinations = []
    const functionalDestinations = []

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

    return (
      <div>
        {newDestinations.length > 0 && (
          <Banner
            onAccept={this.handleBannerAccept}
            onChangePreferences={this.handleBannerChangePreferences}
          />
        )}
        {isDialogOpen && (
          <Dialog
            onCancel={this.handleDialogCancel}
            onSave={this.handleDialogSave}
            onChange={this.handleDialogChange}
            marketingDestinations={marketingDestinations}
            advertisingDestinations={advertisingDestinations}
            functionalDestinations={functionalDestinations}
            marketingAllowed={preferences.marketingAllowed}
            advertisingAllowed={preferences.advertisingAllowed}
            functionalAllowed={preferences.functionalAllowed}
          />
        )}
      </div>
    )
  }

  handleBannerAccept = () => {
    const {saveConsent} = this.props

    saveConsent(true)
    this.setState({
      isDialogOpen: false,
    })
  }

  handleBannerChangePreferences = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleDialogChange = (category, value) => {
    const {setPreferences} = this.props

    setPreferences({
      [category]: value,
    })
  }

  handleDialogCancel = () => {
    this.setState({
      isDialogOpen: false,
    })
  }

  handleDialogSave = () => {
    const {saveConsent} = this.props

    saveConsent()
    this.setState({
      isDialogOpen: false,
    })
  }
}
