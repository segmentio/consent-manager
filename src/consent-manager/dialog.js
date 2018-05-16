import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled, {keyframes} from 'react-emotion'
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

const Buttons = styled('div')`
  padding: 16px;
  text-align: right;
`

export default class Dialog extends PureComponent {
  static displayName = 'Dialog'

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    buttons: PropTypes.node.isRequired
  }

  constructor() {
    super()
    this.titleId = nanoid()
  }

  render() {
    const {onCancel, title, children, buttons} = this.props

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

          <Content innerRef={this.handleContentRef}>{children}</Content>

          <Buttons>{buttons}</Buttons>
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
