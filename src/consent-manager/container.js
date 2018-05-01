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
            onAccept={this.handleAccept}
            onChangePreferencesClick={this.handleChangePreferencesClick}
          />
        )}
        {isDialogOpen && (
          <Dialog
            onCancel={this.handleCancel}
            onSave={this.handleSave}
            onChange={this.handleChange}
            marketingAllowed={marketingAllowed}
            advertisingAllowed={advertisingAllowed}
            functionalAllowed={functionalAllowed}
          />
        )}
      </div>
    )
  }

  handleAccept = () => {
    const {saveConsent} = this.props

    saveConsent(true)
    this.setState({
      isDialogOpen: false,
    })
  }

  handleChangePreferencesClick = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleChange = (category, value) => {
    this.setState({
      [category]: value,
    })
  }

  handleCancel = () => {
    this.setState({
      isDialogOpen: false,
    })
  }

  handleSave = () => {
    const {saveConsent} = this.props

    saveConsent()
    this.setState({
      isDialogOpen: false,
    })
  }
}
