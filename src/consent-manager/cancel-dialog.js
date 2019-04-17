import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dialog from './dialog'
import {DefaultButton, RedButton} from './buttons'

export default class CancelDialog extends PureComponent {
  static displayName = 'CancelDialog'

  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    translate: PropTypes.func.isRequired
  }

  render() {
    const {innerRef, onBack, title, content, translate} = this.props

    const buttons = (
      <div>
        <DefaultButton type="button" onClick={onBack}>
          {translate('ui.go_back')}
        </DefaultButton>
        <RedButton type="submit">{translate('ui.yes_cancel')}</RedButton>
      </div>
    )

    return (
      <Dialog
        innerRef={innerRef}
        title={title}
        buttons={buttons}
        onSubmit={this.handleSubmit}
        width="500px"
      >
        {content}
      </Dialog>
    )
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleEsc, false)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleEsc, false)
  }

  handleSubmit = e => {
    const {onConfirm} = this.props

    e.preventDefault()
    onConfirm()
  }

  handleEsc = e => {
    const {onConfirm} = this.props

    // Esc key
    if (e.keyCode === 27) {
      onConfirm()
    }
  }
}
