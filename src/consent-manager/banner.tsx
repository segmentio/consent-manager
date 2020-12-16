import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled<{ backgroundColor: string; textColor: string }, 'div'>('div')`
  ${fontStyles};
  position: relative;
  padding: 16px;
  padding-right: 40px;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  border-radius: 4px;
`

const Content = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

  a {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }

  button {
    border-radius: 8px;
    padding: 12px 16px;
    margin-right: 8px;
    border: none;
  }
`

const Action = styled('div')`
  display: flex;
`

const P = styled('p')`
  margin: 0;
  max-width: 65%;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`

const AcceptButton = styled('button')`
  background-color: #f77857;
  color: #ffffff;
  font-weight: 600;
  padding: 8px;
`

const EditButton = styled('button')`
  background-color: #f0eeeb;
  color: #5c5a59;
  font-weight: 600;
  padding: 8px;
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
  onAccept: () => void
  onChangePreferences: () => void
  content: React.ReactNode
  acceptContent: React.ReactNode
  subContent: React.ReactNode
  backgroundColor: string
  textColor: string
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner'

  render() {
    const {
      innerRef,
      onClose,
      onAccept,
      onChangePreferences,
      content,
      acceptContent,
      subContent,
      backgroundColor,
      textColor
    } = this.props

    return (
      <Root innerRef={innerRef} backgroundColor={backgroundColor} textColor={textColor}>
        <Content>
          <P>{content}</P>

          <Action>
            <AcceptButton type="button" onClick={onAccept}>
              {acceptContent}
            </AcceptButton>
            <EditButton type="button" onClick={onChangePreferences}>
              {subContent}
            </EditButton>
          </Action>
        </Content>

        <CloseButton type="button" title="Close" aria-label="Close" onClick={onClose}>
          ✕
        </CloseButton>
      </Root>
    )
  }
}
