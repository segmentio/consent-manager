import React, {PureComponent, Fragment} from 'react'
import PropTypes from 'prop-types'
import Banner from './banner'
import Dialog from './dialog'

export default class Wrapper extends PureComponent {
  static displayName = 'Wrapper'

  static propTypes = {
    saveConsent: PropTypes.func.isRequired,
    newDestinations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor() {
    super()
    this.state = {
      isDialogShown: false,
    }
  }

  render() {
    const {newDestinations} = this.props
    const {isDialogShown} = this.state

    return (
      <Fragment>
        {newDestinations.length > 0 && (
          <Banner
            onAccept={this.handleAccept}
            onChangePreferences={this.handleChangePreferences}
          />
        )}
        {isDialogShown && (
          <Dialog onCancel={this.handleCancel} onSave={this.handleSave} />
        )}
      </Fragment>
    )
  }

  handleAccept = () => {
    const {saveConsent} = this.props

    saveConsent(true)
    this.setState({
      isDialogShown: false,
    })
  }

  handleChangePreferences = () => {
    this.setState({
      isDialogShown: true,
    })
  }

  handleCancel = () => {
    this.setState({
      isDialogShown: false,
    })
  }

  handleSave = () => {
    const {saveConsent} = this.props

    saveConsent()
    this.setState({
      isDialogShown: false,
    })
  }
}
