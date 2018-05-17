import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled('div')`
  ${fontStyles};
  position: relative;
  padding: 8px;
  padding-right: 40px;
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

export default class Banner extends PureComponent {
  static displayName = 'Banner'

  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onChangePreferences: PropTypes.func.isRequired,
    content: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired
  }

  render() {
    const {
      innerRef,
      onAccept,
      onChangePreferences,
      content,
      backgroundColor,
      textColor
    } = this.props

    return (
      <Root
        innerRef={innerRef}
        backgroundColor={backgroundColor}
        textColor={textColor}
      >
        <Content>
          <P>{content}</P>
          <P>
            You can{' '}
            <button type="button" onClick={onChangePreferences}>
              change your preferences
            </button>{' '}
            at any time.
          </P>
        </Content>

        <CloseButton
          type="button"
          title="Accept policy"
          aria-label="Accept policy"
          onClick={onAccept}
        >
          ✕
        </CloseButton>
      </Root>
    )
  }
}
