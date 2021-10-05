import React, { PureComponent } from 'react'
import styled, { css } from 'react-emotion'
import Dialog from './dialog'
import { DefaultButton, GreenButton } from './buttons'
import {
  Destination,
  CustomCategories,
  CategoryPreferences,
  PreferenceDialogTemplate
} from '../types'

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
  preferencesDialogTemplate?: PreferenceDialogTemplate
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
      preferencesDialogTemplate
    } = this.props

    const { headings, checkboxes, actionButtons } = preferencesDialogTemplate!

    const functionalInfo = preferencesDialogTemplate?.categories!.find(c => c.key === 'functional')
    const marketingInfo = preferencesDialogTemplate?.categories!.find(c => c.key === 'marketing')
    const advertisingInfo = preferencesDialogTemplate?.categories!.find(
      c => c.key === 'advertising'
    )
    const essentialInfo = preferencesDialogTemplate?.categories!.find(c => c.key === 'essential')

    const buttons = (
      <div>
        <DefaultButton type="button" onClick={onCancel}>
          {actionButtons!.cancelValue}
        </DefaultButton>
        <GreenButton type="submit">{actionButtons!.saveValue}</GreenButton>
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
                <ColumnHeading scope="col">{headings!.allowValue}</ColumnHeading>
                <ColumnHeading scope="col">{headings!.categoryValue}</ColumnHeading>
                <ColumnHeading scope="col">{headings!.purposeValue}</ColumnHeading>
                <ColumnHeading scope="col" className={hideOnMobile}>
                  {headings!.toolsValue}
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
                        {checkboxes!.yesValue}
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
                        {checkboxes!.noValue}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{functionalInfo?.name}</RowHeading>
                    <td>
                      <p>{functionalInfo?.description}</p>
                      <p className={hideOnMobile}>{functionalInfo?.example}</p>
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
                        {checkboxes!.yesValue}
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
                        {checkboxes!.noValue}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{marketingInfo?.name}</RowHeading>
                    <td>
                      <p>{marketingInfo?.description}</p>
                      <p className={hideOnMobile}>{marketingInfo?.example}</p>
                    </td>
                    <td className={hideOnMobile}>
                      {marketingDestinations.map(d => d.name).join(', ')}
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
                          aria-label="Allow advertising tracking"
                          required
                        />{' '}
                        {checkboxes!.yesValue}
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="advertising"
                          value="false"
                          checked={advertising === false}
                          onChange={this.handleChange}
                          aria-label="Disallow advertising tracking"
                          required
                        />{' '}
                        {checkboxes!.noValue}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{advertisingInfo?.name}</RowHeading>
                    <td>
                      <p>{advertisingInfo?.description}</p>
                      <p className={hideOnMobile}>{advertisingInfo?.example}</p>
                    </td>
                    <td className={hideOnMobile}>
                      {advertisingDestinations.map(d => d.name).join(', ')}
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
                          {checkboxes!.yesValue}
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
                          {checkboxes!.noValue}
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
                <RowHeading scope="row">{essentialInfo?.name}</RowHeading>
                <td>
                  <p>{essentialInfo?.description}</p>
                  <p>{essentialInfo?.example}</p>
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
