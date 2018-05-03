import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'react-emotion'
import fontStyles from './font-styles'

const Root = styled('div')`
  ${fontStyles};
  position: relative;
  padding: 8px;
  padding-right: 40px;
  background: #1f4160;
  color: #fff;
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
`

const P = styled('p')`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`

const link = css`
  display: inline;
  padding: 0;
  border: none;
  color: #fff;
  background: none;
  color: inherit;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
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
    onAccept: PropTypes.func.isRequired,
    onChangePreferences: PropTypes.func.isRequired,
  }

  render() {
    const {onAccept, onChangePreferences} = this.props

    return (
      <Root>
        <div>
          <P>
            We collect data and use cookies to improve your experience on our
            site. By using our website, you’re agreeing to the collection of
            data and use of cookies as described in our{' '}
            <a className={link} href="/docs/legal/privacy/" target="_blank">
              privacy policy
            </a>.
          </P>
          <P>
            You can{' '}
            <button
              className={link}
              type="button"
              onClick={onChangePreferences}
            >
              change your preferences
            </button>{' '}
            at any time.
          </P>
        </div>

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
