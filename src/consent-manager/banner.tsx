import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import fontStyles from './font-styles'

interface RootProps {
  backgroundColor: string
  textColor: string
}

const Root = styled('div')`
  ${fontStyles};
  position: relative;
  padding: 8px;
  padding-right: 40px;
  background: ${(props: RootProps) => props.backgroundColor};
  color: ${(props: RootProps) => props.textColor};
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
`

const Content = styled('div')`
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
          <P>{content}</P>
          <P>
            <button type="button" onClick={onChangePreferences}>
              {subContent}
            </button>
          </P>
        </Content>

        <CloseButton type="button" title="Close" aria-label="Close" onClick={onClose}>
          ✕
        </CloseButton>
      </Root>
    )
  }
}
