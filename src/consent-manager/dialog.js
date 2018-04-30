import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled, {css, keyframes} from 'react-emotion'
import nanoid from 'nanoid'

const ANIMATION_DURATION = '200ms'
const ANIMATION_EASING = 'cubic-bezier(0.0, 0.0, 0.2, 1)'

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

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
  animation: ${fadeInAnimation} ${ANIMATION_DURATION} ${ANIMATION_EASING} both;
`

const openAnimation = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const Root = styled('section')`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 16px);
  flex-basis: 600px;
  margin: 8px;
  background: #fff;
  border-radius: 8px;
  animation: ${openAnimation} ${ANIMATION_DURATION} ${ANIMATION_EASING} both;
`

const Header = styled('div')`
  flex: 1 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(67, 90, 111, 0.079);
`

const Title = styled('h2')`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3;
`

const HeaderCancelButton = styled('button')`
  padding: 8px;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
`

const Content = styled('div')`
  overflow-y: auto;
  min-height: 0;
  font-size: 14px;
  line-height: 1.3;
`

// Firefox lets the contents overflow the padding
// when it's set on the flex item (Content)
const ContentPadding = styled('div')`
  padding: 16px;
`

const P = styled('p')`
  margin: 16px 0;
  &:first-child,
  &:last-child {
    margin-top: 0;
  }
`

const A = styled('a')`
  color: #47b881;
  &:hover {
    color: #64c395;
  }
  &:active {
    color: #248953;
  }
`

const Table = styled('table')`
  font-size: 12px;
`

const Buttons = styled('div')`
  margin-top: 24px;
  text-align: right;
`

const buttonBaseStyles = css`
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  color: inherit;
  font: inherit;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  outline: none;
  transition: box-shadow 80ms ease-in-out;
`

const CancelButton = styled('button')`
  ${buttonBaseStyles};
  margin-right: 8px;
  background-color: #fff;
  background-image: linear-gradient(
    to top,
    rgba(67, 90, 111, 0.041),
    rgba(255, 255, 255, 0.041)
  );
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.146),
    inset 0 -1px 1px 0 rgba(67, 90, 111, 0.079);
  &:hover {
    background-image: linear-gradient(
      to top,
      rgba(67, 90, 111, 0.057),
      rgba(67, 90, 111, 0.025)
    );
    box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.255),
      inset 0 -1px 1px 0 rgba(67, 90, 111, 0.114);
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(1, 108, 209, 0.146),
      inset 0 0 0 1px rgba(67, 90, 111, 0.38),
      inset 0 -1px 1px 0 rgba(67, 90, 111, 0.079);
  }
  &:active {
    background: rgba(1, 108, 209, 0.079);
    box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.146),
      inset 0 -1px 1px 0 rgba(67, 90, 111, 0.079);
  }
`

const SaveButton = styled('button')`
  ${buttonBaseStyles};
  background-color: #47b881;
  background-image: linear-gradient(to top, #3faf77, #47b881);
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.204),
    inset 0 -1px 1px 0 rgba(67, 90, 111, 0.204);
  color: #fff;
  &:hover {
    background-image: linear-gradient(to top, #37a56d, #3faf77);
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(71, 184, 129, 0.477),
      inset 0 0 0 1px rgba(71, 184, 129, 0.204),
      inset 0 -1px 1px 0 rgba(71, 184, 129, 0.204);
  }
  &:active {
    background-image: linear-gradient(to top, #2d9760, #248953);
    box-shadow: inset 0 0 0 1px rgba(71, 184, 129, 0.204),
      inset 0 -1px 1px 0 rgba(71, 184, 129, 0.204);
  }
`

export default class Dialog extends PureComponent {
  static displayName = 'Dialog'

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.titleId = nanoid()
  }

  render() {
    const {onCancel, onSave} = this.props

    return (
      <Overlay onClick={this.handleOverlayClick}>
        <Root
          innerRef={this.handleRootRef}
          role="dialog"
          aria-modal
          aria-labelledby={this.titleId}
        >
          <Header>
            <Title id={this.titleId}>Segment Data Collection Preferences</Title>
            <HeaderCancelButton
              onClick={onCancel}
              title="Cancel"
              aria-label="Cancel"
            >
              ✕
            </HeaderCancelButton>
          </Header>

          <Content innerRef={this.handleContentRef}>
            <ContentPadding>
              <P>
                Segment collects data to improve your browsing experience,
                analyze our site traffic, send tailored messages, and to
                increase the overall performance of our site. By using our
                services, you’re agreeing to our data collection policy. You can
                change your preferences at any time.
              </P>
              <P>
                We collect data for the following categories of tools. To opt
                out of any category, uncheck the box and save your preferences.
              </P>

              <Table>
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
                    <td>
                      Tools we use to understand user behavior on our site.
                    </td>
                    <td>
                      Mixpanel, Amplitude, Data Warehouse, Personas,
                      Heatmapping, Enrichment, Raw Data
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
                      Tools we use to improve the performance of our site in
                      order to help our customers.{' '}
                    </td>
                    <td>
                      New Relic, Optimizely, Live Chat, Zendesk, Security and
                      fraud tools
                    </td>
                  </tr>
                </tbody>
              </Table>

              <P>
                Segment commits to strong, secure, and transparent privacy
                practices.{' '}
                <A href="" target="_blank">
                  Learn more
                </A>
              </P>

              <Buttons>
                <CancelButton type="button" onClick={onCancel}>
                  Cancel
                </CancelButton>
                <SaveButton type="button" onClick={onSave}>
                  Save
                </SaveButton>
              </Buttons>
            </ContentPadding>
          </Content>
        </Root>
      </Overlay>
    )
  }

  componentDidMount() {
    this.content.querySelector('input,button').focus()
    document.body.addEventListener('keydown', this.handleEsc, false)
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleEsc, false)
    document.body.style.overflow = ''
  }

  handleRootRef = node => {
    this.root = node
  }

  handleContentRef = node => {
    this.content = node
  }

  handleOverlayClick = e => {
    const {onCancel} = this.props

    if (this.root.contains(e.target)) {
      return
    }

    onCancel()
  }

  handleEsc = e => {
    const {onCancel} = this.props

    // Esc key
    if (e.keyCode === 27) {
      onCancel()
    }
  }
}
