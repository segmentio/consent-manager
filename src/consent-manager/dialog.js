import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled, {css, keyframes} from 'react-emotion'
import nanoid from 'nanoid'
import fontStyles from './font-styles'

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
  ${fontStyles};
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - 16px);
  max-height: calc(100vh - 16px);
  width: 650px;
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
  padding: 12px 16px;
  border-bottom: 1px solid rgba(67, 90, 111, 0.079);
`

const Title = styled('h2')`
  margin: 0;
  color: #1f4160;
  font-size: 16px;
  font-weight: 600;
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
  padding: 16px;
  padding-bottom: 0;
  min-height: 0;
  font-size: 14px;
  line-height: 1.3;
`

const P = styled('p')`
  margin: 16px 0;
  &:first-child {
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

const TableScroll = styled('div')`
  overflow-x: auto;
`

const Table = styled('table')`
  border-collapse: collapse;
  font-size: 12px;
`

const examplesColumn = css`
  @media (max-width: 600px) {
    display: none;
  }
`

const ColumnHeading = styled('th')`
  background: #435a6f0a;
  color: #1f4160;
  font-weight: 600;
  text-align: left;
`

const RowHeading = styled('th')`
  font-weight: normal;
  text-align: left;
`

const Row = styled('tr')`
  th,
  td {
    padding: 8px 12px;
    border: 1px solid #435a6f14;
    border-top: none;
    border-left: none;
  }
`

const CheckboxCell = styled('td')`
  text-align: center;
`

const Buttons = styled('div')`
  padding: 16px;
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
    onChange: PropTypes.func.isRequired,
    marketingAllowed: PropTypes.bool.isRequired,
    advertisingAllowed: PropTypes.bool.isRequired,
    functionalAllowed: PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.titleId = nanoid()
  }

  render() {
    const {
      onCancel,
      onSave,
      marketingAllowed,
      advertisingAllowed,
      functionalAllowed,
    } = this.props

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
            <P>
              Segment collects data to improve your browsing experience, analyze
              our site traffic, send tailored messages, and to increase the
              overall performance of our site. By using our services, you’re
              agreeing to our{' '}
              <A href="https://segment.com/docs/legal/privacy/" target="_blank">
                privacy policy
              </A>. You can change your preferences at any time.
            </P>
            <P>
              We collect data for the following categories of tools. To opt out
              of any category, uncheck the box and save your preferences.
            </P>

            <TableScroll>
              <Table>
                <thead>
                  <Row>
                    <ColumnHeading scope="col">Allow</ColumnHeading>
                    <ColumnHeading scope="col">Category</ColumnHeading>
                    <ColumnHeading scope="col">Description</ColumnHeading>
                    <ColumnHeading scope="col" className={examplesColumn}>
                      Examples
                    </ColumnHeading>
                  </Row>
                </thead>
                <tbody>
                  <Row>
                    <CheckboxCell>
                      <input
                        type="checkbox"
                        name="marketingAllowed"
                        checked={marketingAllowed}
                        onChange={this.handleChange}
                        aria-label="Allow marketing and analytics tracking"
                      />
                    </CheckboxCell>
                    <RowHeading scope="row">Marketing and Analytics</RowHeading>
                    <td>
                      Tools we use to understand user behavior on our site.
                    </td>
                    <td className={examplesColumn}>
                      Mixpanel, Amplitude, Data Warehouse, Personas,
                      Heatmapping, Enrichment, Raw Data
                    </td>
                  </Row>
                  <Row>
                    <CheckboxCell>
                      <input
                        type="checkbox"
                        name="advertisingAllowed"
                        checked={advertisingAllowed}
                        onChange={this.handleChange}
                        aria-label="Allow advertising tracking"
                      />
                    </CheckboxCell>
                    <RowHeading scope="row">Advertising</RowHeading>
                    <td>
                      Tools we use for attribution and targeted advertising.
                    </td>
                    <td className={examplesColumn}>
                      FB Ads, LinkedIn Pixel, Personas, Email, SMS/ push, Tag
                      Manager?!
                    </td>
                  </Row>
                  <Row>
                    <CheckboxCell>
                      <input
                        type="checkbox"
                        name="functionalAllowed"
                        checked={functionalAllowed}
                        onChange={this.handleChange}
                        aria-label="Allow functional tracking"
                      />
                    </CheckboxCell>
                    <RowHeading scope="row">Functional</RowHeading>
                    <td>
                      Tools we use to improve the performance of our site in
                      order to help our customers.
                    </td>
                    <td className={examplesColumn}>
                      New Relic, Optimizely, Live Chat, Zendesk, Security and
                      fraud tools
                    </td>
                  </Row>
                </tbody>
              </Table>
            </TableScroll>

            <P>
              Segment respects your privacy and is committed to transparent
              privacy practices.{' '}
              <A href="https://segment.com/docs/legal/privacy/" target="_blank">
                Learn more
              </A>
            </P>
          </Content>

          <Buttons>
            <CancelButton type="button" onClick={onCancel}>
              Cancel
            </CancelButton>
            <SaveButton type="button" onClick={onSave}>
              Save
            </SaveButton>
          </Buttons>
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

  handleChange = e => {
    const {onChange} = this.props

    onChange(e.target.name, e.target.checked)
  }
}
