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
  translate: Function
}

export default class PreferenceDialog extends PureComponent<PreferenceDialogProps, {}> {
  static displayName = 'PreferenceDialog'

  static defaultProps = {
    marketingAndAnalytics: null,
    advertising: null,
    functional: null,
  }

  render() {
    const {
      innerRef,
      onCancel,
      marketingDestinations,
      advertisingDestinations,
      functionalDestinations,
      marketingAndAnalytics,
      advertising,
      functional,
      customCategories,
      destinations,
      title,
      content,
      preferences,
      translate,
    } = this.props
    const buttons = (
      <div>
        <DefaultButton type="button" onClick={onCancel}>
          {translate('ui.cancel')}
        </DefaultButton>
        <GreenButton type="submit">{translate('ui.save')}</GreenButton>
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
                <ColumnHeading scope="col">{translate('ui.header.allow')}</ColumnHeading>
                <ColumnHeading scope="col">{translate('ui.header.category')}</ColumnHeading>
                <ColumnHeading scope="col">{translate('ui.header.purpose')}</ColumnHeading>
                <ColumnHeading scope="col" className={hideOnMobile}>
                  {translate('ui.header.tools')}
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
                          aria-label={translate('aria.functional.allow')}
                          required
                        />{' '}
                        {translate('ui.yes')}
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="functional"
                          value="false"
                          checked={functional === false}
                          onChange={this.handleChange}
                          aria-label={translate('aria.functional.disallow')}
                          required
                        />{' '}
                        {translate('ui.no')}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{translate('category.functional')}</RowHeading>
                    <td>
                      <p>{translate('purpose.functional.explanation')}</p>
                      <p className={hideOnMobile}>{translate('purpose.functional.example')}</p>
                    </td>
                    <td className={hideOnMobile}>
                      {functionalDestinations.map((d) => d.name).join(', ')}
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
                          aria-label={translate('aria.marketing.allow')}
                          required
                        />{' '}
                        {translate('ui.yes')}
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="marketingAndAnalytics"
                          value="false"
                          checked={marketingAndAnalytics === false}
                          onChange={this.handleChange}
                          aria-label={translate('aria.marketing.disallow')}
                          required
                        />{' '}
                        {translate('ui.no')}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{translate('category.marketing')}</RowHeading>
                    <td>
                      <p>{translate('purpose.marketing.explanation')}</p>
                      <p className={hideOnMobile}>{translate('purpose.marketing.example')}</p>
                    </td>
                    <td className={hideOnMobile}>
                      {marketingDestinations.map((d) => d.name).join(', ')}
                    </td>
                  </Row>

                  <Row>
                    <InputCell>
                      <label>
                        <input
                          type="radio"
                          name="advertising"
                          value="true"
                          checked={advertising === true}
                          onChange={this.handleChange}
                          aria-label={translate('aria.advertising.allow')}
                          required
                        />{' '}
                        {translate('ui.yes')}
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="advertising"
                          value="false"
                          checked={advertising === false}
                          onChange={this.handleChange}
                          aria-label={translate('aria.advertising.disallow')}
                          required
                        />{' '}
                        {translate('ui.no')}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{translate('category.advertising')}</RowHeading>
                    <td>
                      <p>{translate('purpose.advertising.explanation')}</p>
                      <p className={hideOnMobile}>{translate('purpose.advertising.example')}</p>
                    </td>
                    <td className={hideOnMobile}>
                      {advertisingDestinations.map((d) => d.name).join(', ')}
                    </td>
                  </Row>
                </>
              )}

              {customCategories &&
                Object.entries(customCategories).map(
                  ([categoryName, { integrations, purpose, example }]) => (
                    <Row key={categoryName}>
                      <InputCell>
                        <label>
                          <input
                            type="radio"
                            name={categoryName}
                            value="true"
                            checked={preferences[categoryName] === true}
                            onChange={this.handleChange}
                            aria-label={translate(`aria.${categoryName}.allow`)}
                            required
                          />{' '}
                          {translate('ui.yes')}
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={categoryName}
                            value="false"
                            checked={preferences[categoryName] === false}
                            onChange={this.handleChange}
                            aria-label={translate(`aria.${categoryName}.disallow`)}
                            required
                          />{' '}
                          {translate('ui.no')}
                        </label>
                      </InputCell>
                      <RowHeading scope="row">
                        {categoryName || translate(`category.${categoryName}`)}
                      </RowHeading>
                      <td>
                        <p>{purpose || translate(`purpose.${categoryName}.explanation`)}</p>
                        {example && (
                          <p className={hideOnMobile}>
                            {example || translate(`purpose.${categoryName}.example`)}
                          </p>
                        )}
                      </td>
                      <td className={hideOnMobile}>
                        {destinations
                          .filter((d) => integrations.includes(d.id))
                          .map((d) => d.name)
                          .join(', ')}
                      </td>
                    </Row>
                  )
                )}

              <Row>
                <td>{translate('ui.not_available')}</td>
                <RowHeading scope="row">{translate('category.essential')}</RowHeading>
                <td>
                  <p>{translate('purpose.essential.explanation')}</p>
                  <p>{translate('purpose.essential.example')}</p>
                </td>
                <td className={hideOnMobile} />
              </Row>
            </tbody>
          </Table>
        </TableScroll>
      </Dialog>
    )
  }

  handleChange = (e) => {
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
      customCategories,
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
      Object.keys(customCategories).some((category) => preferences[category] === null)
    ) {
      return
    }
    onSave()
  }
}
