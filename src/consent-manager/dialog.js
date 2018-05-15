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

const hideOnMobile = css`
  @media (max-width: 600px) {
    display: none;
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
  width: 700px;
  margin: 8px;
  background: #fff;
  border-radius: 8px;
  animation: ${openAnimation} ${ANIMATION_DURATION} ${ANIMATION_EASING} both;
`

const Header = styled('div')`
  flex: 1 0 auto;
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

  p {
    margin: 0;
    &:not(:last-child) {
      margin-bottom: 0.7em;
    }
  }

  a {
    color: #47b881;
    &:hover {
      color: #64c395;
    }
    &:active {
      color: #248953;
    }
  }
`

const TableScroll = styled('div')`
  overflow-x: auto;
  margin-top: 16px;
`

const Table = styled('table')`
  border-collapse: collapse;
  font-size: 12px;
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
    marketingDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    advertisingDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    functionalDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    marketingAndAnalytics: PropTypes.bool.isRequired,
    advertising: PropTypes.bool.isRequired,
    functional: PropTypes.bool.isRequired,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired
  }

  constructor() {
    super()
    this.titleId = nanoid()
  }

  render() {
    const {
      onCancel,
      onSave,
      marketingDestinations,
      advertisingDestinations,
      functionalDestinations,
      marketingAndAnalytics,
      advertising,
      functional,
      title,
      content
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
            <Title id={this.titleId}>{title}</Title>
            <HeaderCancelButton
              onClick={onCancel}
              title="Cancel"
              aria-label="Cancel"
            >
              ✕
            </HeaderCancelButton>
          </Header>

          <Content innerRef={this.handleContentRef}>
            {content}

            <TableScroll>
              <Table>
                <thead>
                  <Row>
                    <ColumnHeading scope="col">Allow</ColumnHeading>
                    <ColumnHeading scope="col">Category</ColumnHeading>
                    <ColumnHeading scope="col">Purpose</ColumnHeading>
                    <ColumnHeading scope="col" className={hideOnMobile}>
                      Tools
                    </ColumnHeading>
                  </Row>
                </thead>
                <tbody>
                  <Row>
                    <CheckboxCell>
                      <input
                        type="checkbox"
                        name="marketingAndAnalytics"
                        checked={marketingAndAnalytics}
                        onChange={this.handleChange}
                        aria-label="Allow marketing and analytics tracking"
                      />
                    </CheckboxCell>
                    <RowHeading scope="row">Marketing and Analytics</RowHeading>
                    <td>
                      <p>
                        We use these tools to understand user behavior in order
                        to provide you with a more relevant browsing experience.
                      </p>
                      <p className={hideOnMobile}>
                        For example, we collect information about which pages
                        you visit to help us present information that you find
                        relevant when you visit our site.
                      </p>
                    </td>
                    <td className={hideOnMobile}>
                      {marketingDestinations.map(d => d.name).join(', ')}
                    </td>
                  </Row>
                  <Row>
                    <CheckboxCell>
                      <input
                        type="checkbox"
                        name="advertising"
                        checked={advertising}
                        onChange={this.handleChange}
                        aria-label="Allow advertising tracking"
                      />
                    </CheckboxCell>
                    <RowHeading scope="row">Advertising</RowHeading>
                    <td>
                      <p>
                        We use these tools to personalize and measure the
                        effectiveness of our advertising.
                      </p>
                      <p className={hideOnMobile}>
                        For example, we may serve you a personalized ad based on
                        the pages you visit on our site. This information may
                        also be used to ensure we do not repeatedly serve you
                        the same ad.
                      </p>
                    </td>
                    <td className={hideOnMobile}>
                      {advertisingDestinations.map(d => d.name).join(', ')}
                    </td>
                  </Row>
                  <Row>
                    <CheckboxCell>
                      <input
                        type="checkbox"
                        name="functional"
                        checked={functional}
                        onChange={this.handleChange}
                        aria-label="Allow functional tracking"
                      />
                    </CheckboxCell>
                    <RowHeading scope="row">Functional</RowHeading>
                    <td>
                      <p>
                        We use these tools to monitor the performance of our
                        site and to enhance your browsing experience.
                      </p>
                      <p className={hideOnMobile}>
                        For example, these tools enable you to communicate with
                        us via live chat if you have any questions while you’re
                        on our site.
                      </p>
                    </td>
                    <td className={hideOnMobile}>
                      {functionalDestinations.map(d => d.name).join(', ')}
                    </td>
                  </Row>
                </tbody>
              </Table>
            </TableScroll>
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
