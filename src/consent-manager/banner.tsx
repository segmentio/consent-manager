import React, { Fragment, PureComponent } from 'react'
import styled from 'react-emotion'
import fontStyles from './font-styles'
import { ActionsBlockProps } from '../types'
import { DefaultButton, GreenButton } from './buttons'

interface RootProps {
  readonly backgroundColor: string
  readonly textColor: string
  readonly hideCloseButton: boolean
}

interface ContentProps {
  asModal?: boolean
}

const Overlay = styled('div')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  opacity: 0.8;
`

const Centered = styled('div')`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  @media (max-width: 767px) {
    width: 80vw;
  }
`

const RootCentered = styled<RootProps, 'div'>('div')`
  ${fontStyles};
  position: relative;
  max-width: 500px;
  padding: 18px;
  padding-right: ${props => (props.hideCloseButton ? '18px' : '40px')};
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  text-align: center;
  font-size: 14px;
  line-height: 1.3;
`

const Root = styled<RootProps, 'div'>('div')`
  ${fontStyles};
  position: relative;
  padding: 8px;
  padding-right: ${props => (props.hideCloseButton ? '8px' : '40px')};
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`

const Content = styled<ContentProps, 'div'>('div')`
  margin-bottom: ${props => (props.asModal ? '20px' : '8px')};
  @media (min-width: 768px) {
    flex: auto;
    margin-bottom: ${props => (props.asModal ? '20px' : '0')};
  }
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

const ActionsBlock = styled('div')`
  color: #000;
  button {
    margin: 4px 0;
    width: 100%;
    @media (min-width: 768px) {
      margin: 4px 8px;
      width: 200px;
    }
  }
`

const P = styled('p')`
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`

interface CloseButtonProps {
  isTop?: boolean
}

const CloseButton = styled<CloseButtonProps, 'button'>('button')`
  position: absolute;
  right: 8px;
  top: ${props => (props.isTop ? '20px' : '50%')};
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

interface Props {
  innerRef: (node: HTMLElement | null) => void
  onClose: () => void
  onChangePreferences: () => void
  content: React.ReactNode
  subContent: React.ReactNode
  actionsBlock?: ((props: ActionsBlockProps) => React.ReactElement) | true
  backgroundColor: string
  textColor: string
  onAcceptAll: () => void
  onDenyAll: () => void
  hideCloseButton: boolean
  asModal?: boolean
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner'

  render() {
    const {
      innerRef,
      onClose,
      onChangePreferences,
      content,
      subContent,
      actionsBlock,
      backgroundColor,
      textColor,
      onAcceptAll,
      onDenyAll,
      hideCloseButton,
      asModal
    } = this.props

    const RootContent = (
      <Fragment>
        <Content asModal={asModal}>
          <P>{content}</P>
          <P>
            <button type="button" onClick={onChangePreferences}>
              {subContent}
            </button>
          </P>
        </Content>
        {typeof actionsBlock === 'function' &&
          actionsBlock({
            acceptAll: onAcceptAll,
            denyAll: onDenyAll,
            changePreferences: onChangePreferences
          })}
        {actionsBlock === true && (
          <ActionsBlock>
            <GreenButton type="button" onClick={onAcceptAll}>
              Allow all
            </GreenButton>
            {!asModal && (
              <DefaultButton type="button" onClick={onDenyAll}>
                Deny all
              </DefaultButton>
            )}
          </ActionsBlock>
        )}
        {!hideCloseButton && (
          <CloseButton
            type="button"
            title="Close"
            aria-label="Close"
            onClick={onClose}
            isTop={asModal}
          >
            ✕
          </CloseButton>
        )}
      </Fragment>
    )

    if (asModal) {
      return (
        <Fragment>
          <Overlay />
          <Centered>
            <RootCentered
              innerRef={innerRef}
              backgroundColor={backgroundColor}
              textColor={textColor}
              hideCloseButton={hideCloseButton}
            >
              {RootContent}
            </RootCentered>
          </Centered>
        </Fragment>
      )
    }
    return (
      <Root
        innerRef={innerRef}
        backgroundColor={backgroundColor}
        textColor={textColor}
        hideCloseButton={hideCloseButton}
      >
        {RootContent}
      </Root>
    )
  }
}
