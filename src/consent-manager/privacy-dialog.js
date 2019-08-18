import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Dialog from './dialog'
import {DefaultButton} from './buttons'

export default class CancelDialog extends PureComponent {
  static displayName = 'CancelDialog'

  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired
  }

  render() {
    const {innerRef, title, content, onDismiss} = this.props

    const buttons = (
      <div>
        <DefaultButton type="button" onClick={onDismiss}>
          Dismiss
        </DefaultButton>
      </div>
    )

    return (
      <Dialog innerRef={innerRef} title={title} buttons={buttons} width="500px">
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

  handleEsc = e => {
    const {onDismiss} = this.props

    // Esc key
    if (e.keyCode === 27) {
      onDismiss()
    }
  }
}
