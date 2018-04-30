import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const Root = styled('div')`
  position: relative;
  padding: 8px;
  padding-right: 32px;
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

const TextButton = styled('button')`
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
        <P>
          We collect data to improve your experience on our site. By using our
          services, you’re agreeing to our data collection policy.
        </P>
        <P>
          You can{' '}
          <TextButton type="button" onClick={onChangePreferences}>
            change your preferences
          </TextButton>{' '}
          at any time.
        </P>

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
