import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Banner from './banner'
import Dialog from './dialog'

export default class Container extends PureComponent {
  static displayName = 'Container'

  static propTypes = {
    saveConsent: PropTypes.func.isRequired,
    newDestinations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor() {
    super()
    this.state = {
      isDialogOpen: false,
      marketingAllowed: true,
      advertisingAllowed: true,
      functionalAllowed: true,
    }
  }

  render() {
    const {newDestinations} = this.props
    const {
      isDialogOpen,
      marketingAllowed,
      advertisingAllowed,
      functionalAllowed,
    } = this.state

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
            marketingAllowed={marketingAllowed}
            advertisingAllowed={advertisingAllowed}
            functionalAllowed={functionalAllowed}
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
    this.setState({
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
