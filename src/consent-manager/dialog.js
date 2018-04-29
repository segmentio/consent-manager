import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const Overlay = styled('div')`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(67, 90, 111, 0.699);
`

const Root = styled('section')`
  max-height: calc(100vh - 16px);
  flex-basis: 600px;
  margin: 8px;
  background: #fff;
  border-radius: 8px;
`

const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(67, 90, 111, 0.079);
`

const Heading = styled('h2')`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
`

const HeaderCancelButton = styled('button')`
  padding: 8px;
  border: none;
  background: none;
  color: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
`

const Content = styled('div')`
  padding: 16px;
  font-size: 14px;
  line-height: 1.3;
`

const P = styled('p')`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`

const Buttons = styled('div')`
  text-align: right;
`

export default class Dialog extends PureComponent {
  static displayName = 'Dialog'

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render() {
    const {onCancel, onSave} = this.props

    return (
      <Overlay onClick={this.handleOverlayClick}>
        <Root
          innerRef={node => {
            this.root = node
          }}
          role="dialog"
        >
          <Header>
            <Heading>Segment Data Collection Preferences</Heading>
            <HeaderCancelButton onClick={onCancel}>✕</HeaderCancelButton>
          </Header>

          <Content>
            <P>
              Segment collects data to improve your browsing experience, analyze
              our site traffic, send tailored messages, and to increase the
              overall performance of our site. By using our services, you’re
              agreeing to our data collection policy. You can change your
              preferences at any time.
            </P>
            <P>
              We collect data for the following categories of tools. To opt out
              of any category, uncheck the box and save your preferences.
            </P>

            <table>
              <thead>
                <tr>
                  <td>Allow</td>
                  <td>Category</td>
                  <td>Description</td>
                  <td>Examples</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Marketing and Analytics</td>
                  <td>Tools we use to understand user behavior on our site.</td>
                  <td>
                    Mixpanel, Amplitude, Data Warehouse, Personas, Heatmapping,
                    Enrichment, Raw Data
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Advertising</td>
                  <td>
                    Tools we use for attribution and targeted advertising.{' '}
                  </td>
                  <td>
                    FB Ads, LinkedIn Pixel, Personas, Email, SMS/ push, Tag
                    Manager?!
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Functional</td>
                  <td>
                    Tools we use to improve the performance of our site in order
                    to help our customers.{' '}
                  </td>
                  <td>
                    New Relic, Optimizely, Live Chat, Zendesk, Security and
                    fraud tools
                  </td>
                </tr>
              </tbody>
            </table>

            <P>
              Segment commits to strong, secure, and transparent privacy
              practices. <a href="">Learn more</a>
            </P>

            <Buttons>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
              <button type="button" onClick={onSave}>
                Save
              </button>
            </Buttons>
          </Content>
        </Root>
      </Overlay>
    )
  }

  handleOverlayClick = e => {
    const {onCancel} = this.props

    if (this.root.contains(e.target)) {
      return
    }

    onCancel()
  }
}
