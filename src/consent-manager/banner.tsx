import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import fontStyles from './font-styles'
import { translations } from './translations-utils'

import { Button } from './buttons'

const Root = styled<{ backgroundColor: string; textColor: string }, 'div'>('div')`
  ${fontStyles};
  position: relative;
  padding: 14px;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  text-align: left;
  font-size: 12px;
  line-height: 1.3;
`

const Content = styled('div')`
  margin-top: 16px;
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
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin: 0;
`
const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: nowrap;
  margin: 16px 0 0;

  @media only screen and (max-width: 400px) {
    width: 100%;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;

    button {
      margin-left: 0;
      justify-content: center;
    }
    button:nth-child(even) {
      margin: 8px 0;
    }
  }
`

const SettingsButton = styled(Button)`
  background: none;
  color: #ffffff;
  border: 1px solid #ffffff;
  box-sizing: border-box;

  @media only screen and (min-width: 719px) {
    margin-left: 8px;
  }
`

const AcceptButton = styled(Button)`
  margin-left: 8px;
`

const DenyButton = styled(Button)`
  margin-left: 8px;
`

interface Props {
  innerRef: (node: HTMLElement | null) => void
  onChangePreferences: () => void
  onAcceptAll: () => void
  onDenyAll: () => void
  content: React.ReactNode
  backgroundColor: string
  textColor: string
}

export default class Banner extends PureComponent<Props> {
  static displayName = 'Banner'

  render() {
    const {
      innerRef,
      onChangePreferences,
      onAcceptAll,
      onDenyAll,
      content,
      backgroundColor,
      textColor
    } = this.props

    return (
      <Root innerRef={innerRef} backgroundColor={backgroundColor} textColor={textColor}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            marginTop: '-16px'
          }}
        >
          <Content>
            <P>{content}</P>
          </Content>

          <ButtonContainer>
            <SettingsButton onClick={onChangePreferences}>
              {translations.gdpr_settings}
            </SettingsButton>
            <DenyButton onClick={onDenyAll}>{translations.reject_all}</DenyButton>
            <AcceptButton onClick={onAcceptAll}>{translations.accept_all_cookies}</AcceptButton>
          </ButtonContainer>
        </div>
      </Root>
    )
  }
}
