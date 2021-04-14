import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import fontStyles from './font-styles'
import { ActionsBlockProps } from '../types'
import { DefaultButton, GreenButton } from './buttons'

const Root = styled<{ backgroundColor: string; textColor: string; hideCloseButton }, 'div'>('div')`
  ${fontStyles};
  position: relative;
  padding: 8px;
  padding-right: ${props => (props.hideCloseButton ? '8px' : '40px')};
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`

const Content = styled('div')`
  margin-bottom: 8px;
  @media (min-width: 768px) {
    flex: 1;
    margin-bottom: 0;
  }
  a,
  button {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
`

const ActionsBlock = styled('div')`
  color: #000;
  button {
    margin: 4px 0;
    width: 100%;
    @media (min-width: 768px) {
      margin: 4px 8px;
      width: 200px;
    }
  }
`

const P = styled('p')`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`

const CloseButton = styled('button')`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
`

interface Props {
  innerRef: (node: HTMLElement | null) => void
  onClose: () => void
  onChangePreferences: () => void
  content: React.ReactNode
  subContent: React.ReactNode
  actionsBlock?: ((props: ActionsBlockProps) => React.ReactElement) | true
  backgroundColor: string
  textColor: string
  onAcceptAll: () => void
  onDenyAll: () => void
  hideCloseButton: boolean
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner'

  render() {
    const {
      innerRef,
      onClose,
      onChangePreferences,
      content,
      subContent,
      actionsBlock,
      backgroundColor,
      textColor,
      onAcceptAll,
      onDenyAll,
      hideCloseButton
    } = this.props

    return (
      <Root
        innerRef={innerRef}
        backgroundColor={backgroundColor}
        textColor={textColor}
        hideCloseButton={hideCloseButton}
      >
        <Content>
          <P>{content}</P>
          <P>
            <button type="button" onClick={onChangePreferences}>
              {subContent}
            </button>
          </P>
        </Content>
        {typeof actionsBlock === 'function' &&
          actionsBlock({
            acceptAll: onAcceptAll,
            denyAll: onDenyAll,
            changePreferences: onChangePreferences
          })}
        {actionsBlock === true && (
          <ActionsBlock>
            <GreenButton type="button" onClick={onAcceptAll}>
              Allow all
            </GreenButton>
            <DefaultButton type="button" onClick={onDenyAll}>
              Deny all
            </DefaultButton>
          </ActionsBlock>
        )}
        {!hideCloseButton && (
          <CloseButton type="button" title="Close" aria-label="Close" onClick={onClose}>
            ✕
          </CloseButton>
        )}
      </Root>
    )
  }
}
