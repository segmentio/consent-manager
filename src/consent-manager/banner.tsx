import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled<{ backgroundColor: string; textColor: string }, 'div'>('div')`
  ${fontStyles};
  position: relative;
  padding: 15px;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  text-align: center;
  font-size: 14px;
  line-height: 1.3;
  overflow: hidden;
`

const Content = styled('div')`
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
`

const P = styled('p')`
  margin-bottom: 15px;
`

const CloseButton = styled('button')`
  border: none;
  font: inherit;
  line-height: 16px;
  cursor: pointer;
  width: 150px;
  height: 50px;
  background: white;
  color: black;
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
  border-radius: 1px;
`

interface Props {
  innerRef: (node: HTMLElement | null) => void
  onClose: () => void
  onChangePreferences: () => void
  content: React.ReactNode
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
      onChangePreferences,
      content,
      subContent,
      backgroundColor,
      textColor
    } = this.props

    return (
      <Root innerRef={innerRef} backgroundColor={backgroundColor} textColor={textColor}>
        <Content>
          <P>
            {content} <a onClick={onChangePreferences}>{subContent}</a>
          </P>
          <CloseButton type="button" title="Close" aria-label="Close" onClick={onClose}>
            Accept
          </CloseButton>
        </Content>
      </Root>
    )
  }
}
