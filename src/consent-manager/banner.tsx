import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled<{ backgroundColor: string; textColor: string }, 'div'>('div')`
  ${fontStyles};
  position: relative;
  padding: 24px 32px;
  padding-right: 40px;
  background: #ffffff;
  color: #8f8d8b;
  font-size: 12px;
  line-height: 1.3;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.06), 0px 6px 12px rgba(0, 0, 0, 0.06);
`

const Content = styled('div')`
  display: flex;
  flex-direction: column;
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
    border: none;
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Action = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 48px;

  @media only screen and (min-width: 768px) {
    margin-top: 0;
    flex-direction: row;
    align-items: center;
  }
`

const BannerContent = styled('div')`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 6px;
  }

  @media only screen and (min-width: 768px) {
    max-width: 65%;
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
  margin-bottom: 12px;
  padding: 8px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 12px;
  }
`

const CloseButton = styled('button')`
  position: absolute;
  right: 8px;
  top: 24px;
  transform: translateY(-50%);
  padding: 8px;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  color: #191919;
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
          <BannerContent>{content}</BannerContent>

          <Action>
            <EditButton type="button" onClick={onChangePreferences}>
              {subContent}
            </EditButton>
            <AcceptButton type="button" onClick={onAccept}>
              {acceptContent}
            </AcceptButton>
          </Action>
        </Content>

        <CloseButton type="button" title="Close" aria-label="Close" onClick={onClose}>
          ✕
        </CloseButton>
      </Root>
    )
  }
}
