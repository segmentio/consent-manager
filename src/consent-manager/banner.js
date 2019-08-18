import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled('div')`
  ${fontStyles};
  position: relative;
  padding: 8px;
  padding-left: 40px;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
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
  left: 8px;
  top: 16px;
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

export default class Banner extends PureComponent {
  static displayName = 'Banner'

  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    content: PropTypes.node.isRequired,
    subContent: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    onPrivacyPolicy: PropTypes.func.isRequired
  }

  render() {
    const {
      innerRef,
      onAccept,
      content,
      subContent,
      backgroundColor,
      textColor,
      onPrivacyPolicy
    } = this.props

    return (
      <Root
        innerRef={innerRef}
        backgroundColor={backgroundColor}
        textColor={textColor}
      >
        <CloseButton
          type="button"
          title="Accept policy"
          aria-label="Accept policy"
          onClick={onAccept}
        >
          ✕
        </CloseButton>
        <Content>
          <P>{content}</P>
          <P>
            <button type="button" onClick={onPrivacyPolicy}>
              {subContent}
            </button>
          </P>
        </Content>
      </Root>
    )
  }
}
