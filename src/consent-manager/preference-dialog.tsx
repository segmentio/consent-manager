import React, { PureComponent } from 'react'
import styled, { css } from 'react-emotion'
import Dialog from './dialog'
import { DefaultButton, GreenButton } from './buttons'
import { Destination, CustomCategories, CategoryPreferences } from '../types'

const hideOnMobile = css`
  @media (max-width: 600px) {
    display: none;
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
  background: #f7f8fa;
  color: #1f4160;
  font-weight: 600;
  text-align: left;
  border-width: 2px;
`

const RowHeading = styled('th')`
  font-weight: normal;
  text-align: left;
`

const Row = styled('tr')`
  th,
  td {
    vertical-align: top;
    padding: 8px 12px;
    border: 1px solid rgba(67, 90, 111, 0.114);
  }
  td {
    border-top: none;
  }
`

const InputCell = styled('td')`
  input {
    vertical-align: middle;
  }
  label {
    display: block;
    margin-bottom: 4px;
    white-space: nowrap;
  }
`

interface PreferenceDialogProps {
  innerRef: (element: HTMLElement | null) => void
  onCancel: () => void
  onSave: () => void
  onChange: (name: string, value: boolean) => void
  marketingDestinations: Destination[]
  advertisingDestinations: Destination[]
  functionalDestinations: Destination[]
  marketingAndAnalytics?: boolean | null
  advertising?: boolean | null
  functional?: boolean | null
  customCategories?: CustomCategories
  destinations: Destination[]
  preferences: CategoryPreferences
  title: React.ReactNode
  content: React.ReactNode
}

export default class PreferenceDialog extends PureComponent<PreferenceDialogProps, {}> {
  static displayName = 'PreferenceDialog'

  static defaultProps = {
    marketingAndAnalytics: null,
    advertising: null,
    functional: null
  }

  render() {
    const {
      innerRef,
      onCancel,
      marketingDestinations,
      // advertisingDestinations,
      functionalDestinations,
      marketingAndAnalytics,
      // advertising,
      functional,
      customCategories,
      destinations,
      title,
      content,
      preferences
    } = this.props
    const buttons = (
      <div>
        <DefaultButton type="button" onClick={onCancel}>
          Cancel
        </DefaultButton>
        <GreenButton type="submit">Save</GreenButton>
      </div>
    )
    return (
      <Dialog
        innerRef={innerRef}
        title={title}
        buttons={buttons}
        onCancel={onCancel}
        onSubmit={this.handleSubmit}
      >
        {content}

        <TableScroll>
          <Table>
            <thead>
              <Row>
                <ColumnHeading scope="col">Erlaubnis</ColumnHeading>
                <ColumnHeading scope="col">Kategorie</ColumnHeading>
                <ColumnHeading scope="col">Zweck</ColumnHeading>
                <ColumnHeading scope="col" className={hideOnMobile}>
                  Tools
                </ColumnHeading>
              </Row>
            </thead>

            <tbody>
              {!customCategories && (
                <>
                  <Row>
                    <InputCell>
                      <label>
                        <input
                          type="radio"
                          name="functional"
                          value="true"
                          checked={functional === true}
                          onChange={this.handleChange}
                          aria-label="Allow functional tracking"
                          required
                        />{' '}
                        Ja
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="functional"
                          value="false"
                          checked={functional === false}
                          onChange={this.handleChange}
                          aria-label="Disallow functional tracking"
                          required
                        />{' '}
                        Nein
                      </label>
                    </InputCell>
                    <RowHeading scope="row">Funktional</RowHeading>
                    <td>
                      <p>
                        Diese Cookies ermöglichen es uns, die Funktionalität und individuelle
                        Gestaltung zu verbessern, beispielsweise von Videos und Live-Chats. Sie
                        können von uns oder von Drittanbietern festgelegt werden, deren Dienste wir
                        auf unseren Seiten hinzugefügt haben. Wenn du diese Cookies nicht zulässt,
                        kann es sein, dass einige oder alle dieser Funktionen nicht ordnungsgemäß
                        funktionieren.
                      </p>
                      <p className={hideOnMobile}>
                        For example, these tools enable you to communicate with us via live chat.
                      </p>
                    </td>
                    <td className={hideOnMobile}>
                      {functionalDestinations.map(d => d.name).join(', ')}
                    </td>
                  </Row>

                  <Row>
                    <InputCell>
                      <label>
                        <input
                          type="radio"
                          name="marketingAndAnalytics"
                          value="true"
                          checked={marketingAndAnalytics === true}
                          onChange={this.handleChange}
                          aria-label="Allow marketing and analytics tracking"
                          required
                        />{' '}
                        Ja
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="marketingAndAnalytics"
                          value="false"
                          checked={marketingAndAnalytics === false}
                          onChange={this.handleChange}
                          aria-label="Disallow marketing and analytics tracking"
                          required
                        />{' '}
                        Nein
                      </label>
                    </InputCell>
                    <RowHeading scope="row">Marketing and Analytics</RowHeading>
                    <td>
                      <p>
                        Diese Cookies werden durch unsere Website von unseren Werbepartnern
                        eingestellt. Sie können von diesen Unternehmen verwendet werden, um ein
                        Profil deiner Interessen zu erstellen und dir relevante Anzeigen an anderer
                        Stelle zu zeigen. Sie funktionieren, indem sie deinen Browser und dein Gerät
                        eindeutig identifizieren. Wenn du diese Cookies nicht zulässt, wird dir auf
                        verschiedenen Websites keine gezielte Werbung aufgrund dieser Cookies
                        angezeigt.
                      </p>
                      <p className={hideOnMobile}>
                        For example, we collect information about which pages you visit to help us
                        present more relevant information.
                      </p>
                    </td>
                    <td className={hideOnMobile}>
                      {marketingDestinations.map(d => d.name).join(', ')}
                    </td>
                  </Row>
                </>
              )}

              {customCategories &&
                Object.entries(customCategories).map(
                  ([categoryName, { integrations, purpose }]) => (
                    <Row key={categoryName}>
                      <InputCell>
                        <label>
                          <input
                            type="radio"
                            name={categoryName}
                            value="true"
                            checked={preferences[categoryName] === true}
                            onChange={this.handleChange}
                            aria-label={`Allow "${categoryName}" tracking`}
                            required
                          />{' '}
                          Ja
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={categoryName}
                            value="false"
                            checked={preferences[categoryName] === false}
                            onChange={this.handleChange}
                            aria-label={`Disallow "${categoryName}" tracking`}
                            required
                          />{' '}
                          Nein
                        </label>
                      </InputCell>
                      <RowHeading scope="row">{categoryName}</RowHeading>
                      <td>
                        <p>{purpose}</p>
                      </td>
                      <td className={hideOnMobile}>
                        {destinations
                          .filter(d => integrations.includes(d.id))
                          .map(d => d.name)
                          .join(', ')}
                      </td>
                    </Row>
                  )
                )}

              <Row>
                <td>N/A</td>
                <RowHeading scope="row">Unbedingt erforderlich</RowHeading>
                <td>
                  <p>
                    Diese Cookies sind für die Funktion der Website notwendig und können in unseren
                    Systemen nicht ausgeschaltet werden. Sie werden in der Regel nur als Reaktion
                    auf eine deiner Aktionen eingestellt, die zu einer Anfrage nach einem Service
                    führen, wie beispielsweise das Festlegen deiner Datenschutzeinstellungen, das
                    Einloggen oder das Ausfüllen von Formularen. Du kannst deinen Browser so
                    einstellen, dass diese Cookies blockiert oder dich warnt, dann könnte es jedoch
                    sein, dass einige Teile der Website nicht funktionieren.
                  </p>
                </td>
                <td className={hideOnMobile} />
              </Row>
            </tbody>
          </Table>
        </TableScroll>
      </Dialog>
    )
  }

  handleChange = e => {
    const { onChange } = this.props
    onChange(e.target.name, e.target.value === 'true')
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const {
      onSave,
      preferences,
      marketingAndAnalytics,
      advertising,
      functional,
      customCategories
    } = this.props
    e.preventDefault()
    // Safe guard against browsers that don't prevent the
    // submission of invalid forms (Safari < 10.1)
    if (
      !customCategories &&
      (marketingAndAnalytics === null || advertising === null || functional === null)
    ) {
      return
    }

    // Safe guard against custom categories being null
    if (
      customCategories &&
      Object.keys(customCategories).some(category => preferences[category] === null)
    ) {
      return
    }
    onSave()
  }
}
