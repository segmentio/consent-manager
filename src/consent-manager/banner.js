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
    translate: PropTypes.func.isRequired,
    onChangePreferences: PropTypes.func.isRequired,
    content: PropTypes.node.isRequired,
    subContent: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired
  }

  render() {
    const {
      innerRef,
      onAccept,
      translate,
      onChangePreferences,
      content,
      subContent,
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
        </Content>
        <div className="ConsentButtonContainer">
          <CloseButton
            className="Button Button--primary button is-primary"
            type="button"
            title={translate('ui.accept_all')}
            aria-label={translate('ui.accept_all')}
            onClick={onAccept}
          >
            {translate('ui.accept_all')}
          </CloseButton>
          <P>
            <button type="button" className=" button is-text is-small" onClick={onChangePreferences}>
              {subContent}
            </button>
          </P>
        </div>
      </Root>
    )
  }
}
