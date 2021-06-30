import React, { PureComponent } from 'react'
import Dialog from './dialog'
import styled from 'react-emotion'
import { Button } from './buttons'
import { translations } from './translations-utils'

const BackButton = styled(Button)`
  background: none;
  color: #454545;
  border: none;
`

const CloseButton = styled(Button)`
  background: #454545;
  color: #ffffff;
  margin-left: 8px;
`

interface Props {
  innerRef: (node: HTMLElement) => void
  onBack: () => void
  onConfirm: () => void
  title: React.ReactNode
  content: React.ReactNode
}

export default class CancelDialog extends PureComponent<Props> {
  static displayName = 'CancelDialog'

  render() {
    const { innerRef, onBack, title, content } = this.props

    const buttons = (
      <div>
        <BackButton onClick={onBack}>{translations.back_to_preferences}</BackButton>
        <CloseButton>{translations.cancel}</CloseButton>
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
    const { onConfirm } = this.props

    e.preventDefault()
    onConfirm()
  }

  handleEsc = (e: KeyboardEvent) => {
    const { onConfirm } = this.props

    // Esc key
    if (e.keyCode === 27) {
      onConfirm()
    }
  }
}
