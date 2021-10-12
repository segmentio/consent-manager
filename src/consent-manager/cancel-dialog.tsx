import React, { PureComponent } from 'react'
import Dialog from './dialog'
import { DefaultButton, RedButton } from './buttons'
import { PreferenceDialogTemplate } from '../types'

interface Props {
  innerRef: (node: HTMLElement) => void
  onBack: () => void
  onConfirm: () => void
  title: React.ReactNode
  content: React.ReactNode
  preferencesDialogTemplate?: PreferenceDialogTemplate
}

export default class CancelDialog extends PureComponent<Props> {
  static displayName = 'CancelDialog'

  render() {
    const { innerRef, onBack, title, content, preferencesDialogTemplate } = this.props

    const buttons = (
      <div>
        <DefaultButton type="button" onClick={onBack}>
          {preferencesDialogTemplate?.cancelDialogButtons!.backValue}
        </DefaultButton>
        <RedButton type="submit">
          {preferencesDialogTemplate?.cancelDialogButtons!.cancelValue}
        </RedButton>
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
