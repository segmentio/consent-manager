import React, { PureComponent } from 'react'
import styled, { css } from 'react-emotion'

import { Destination, CustomCategories, CategoryPreferences } from '../types'

import { Button } from './buttons'
import Dialog from './dialog'
import { translations } from './translations-utils'

const hideOnMobile = css`
  @media (max-width: 600px) {
    display: none;
  }
`

const ContentContainer = styled('div')`
  max-width: 95%;

  margin-bottom: 8px;

  a {
    color: #454545;
    display: inline;
    padding: 0;
    border: none;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
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
    color: rgb(67, 90, 111);
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

const CancelButton = styled(Button)`
  background: none;
  color: #454545;
  border: none;
`

const SaveButton = styled(Button)`
  background: #454545;
  color: #ffffff;
  margin-left: 8px;
`

const categoryPlaceholder = '[CATEGORY_NAME]'
const replaceWith = (category: string, phrase: string) =>
  phrase.replace(categoryPlaceholder, category)

interface PreferenceDialogProps {
  innerRef(element: HTMLElement | null): void
  onCancel(): void
  onSave(): void
  onChange(name: string, value: boolean): void
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
      marketingAndAnalytics,
      advertising,
      functional,
      customCategories,
      destinations,
      title,
      content,
      preferences
    } = this.props

    const buttons = (
      <div>
        <div>
          <CancelButton onClick={onCancel}>{translations.cancel}</CancelButton>
          <SaveButton type="submit">{translations.save}</SaveButton>
        </div>
      </div>
    )

    return (
      <Dialog
        buttons={buttons}
        innerRef={innerRef}
        onCancel={onCancel}
        onSubmit={this.handleSubmit}
        title={title}
      >
        <ContentContainer>
          {content !== '' && content !== undefined ? content : ''}
        </ContentContainer>

        <TableScroll>
          <Table>
            <thead>
              <Row>
                <ColumnHeading scope="col">{translations.allow}</ColumnHeading>
                <ColumnHeading scope="col">{translations.category}</ColumnHeading>
                <ColumnHeading scope="col">{translations.purpose}</ColumnHeading>
              </Row>
            </thead>

            <tbody>
              {!customCategories && (
                <>
                  <Row>
                    <InputCell>
                      <label>
                        <input
                          aria-label={replaceWith(
                            translations.functional_category,
                            translations.allow_category_tracking
                          )}
                          checked={functional === true}
                          name="functional"
                          onChange={this.handleChange}
                          required
                          type="radio"
                          value="true"
                        />{' '}
                        {translations.yes}
                      </label>
                      <label>
                        <input
                          aria-label={replaceWith(
                            translations.functional_category,
                            translations.disallow_category_tracking
                          )}
                          checked={functional === false}
                          name="functional"
                          onChange={this.handleChange}
                          required
                          type="radio"
                          value="false"
                        />{' '}
                        {translations.no}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{translations.functional_category}</RowHeading>
                    <td>
                      <p>{translations.functional_purpose}</p>
                    </td>
                  </Row>

                  <Row>
                    <InputCell>
                      <label>
                        <input
                          aria-label={replaceWith(
                            translations.analytics_category,
                            translations.allow_category_tracking
                          )}
                          checked={marketingAndAnalytics === true}
                          name="marketingAndAnalytics"
                          onChange={this.handleChange}
                          required
                          type="radio"
                          value="true"
                        />{' '}
                        {translations.yes}
                      </label>
                      <label>
                        <input
                          aria-label={replaceWith(
                            translations.analytics_category,
                            translations.disallow_category_tracking
                          )}
                          checked={marketingAndAnalytics === false}
                          name="marketingAndAnalytics"
                          onChange={this.handleChange}
                          required
                          type="radio"
                          value="false"
                        />{' '}
                        {translations.no}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{translations.analytics_category}</RowHeading>
                    <td>
                      <p>{translations.analytics_purpose}</p>
                    </td>
                  </Row>

                  <Row>
                    <InputCell>
                      <label>
                        <input
                          aria-label={replaceWith(
                            translations.advertising_category,
                            translations.allow_category_tracking
                          )}
                          checked={advertising === true}
                          name="advertising"
                          onChange={this.handleChange}
                          required
                          type="radio"
                          value="true"
                        />{' '}
                        {translations.yes}
                      </label>
                      <label>
                        <input
                          aria-label={replaceWith(
                            translations.advertising_category,
                            translations.disallow_category_tracking
                          )}
                          checked={advertising === false}
                          name="advertising"
                          onChange={this.handleChange}
                          required
                          type="radio"
                          value="false"
                        />{' '}
                        {translations.no}
                      </label>
                    </InputCell>
                    <RowHeading scope="row">
                      {translations.targeting_category}; {translations.advertising_category}
                    </RowHeading>
                    <td>
                      <p>{translations.advertising_purpose}</p>
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
                            aria-label={`Allow "${categoryName}" tracking`}
                            checked={preferences[categoryName] === true}
                            name={categoryName}
                            onChange={this.handleChange}
                            required
                            type="radio"
                            value="true"
                          />{' '}
                          {translations.yes}
                        </label>
                        <label>
                          <input
                            aria-label={`Disallow "${categoryName}" tracking`}
                            checked={preferences[categoryName] === false}
                            name={categoryName}
                            onChange={this.handleChange}
                            required
                            type="radio"
                            value="false"
                          />{' '}
                          {translations.no}
                        </label>
                      </InputCell>
                      <RowHeading scope="row">{categoryName}</RowHeading>
                      <td>
                        <p>{purpose}</p>
                      </td>
                      <td className={hideOnMobile}>
                        {destinations
                          .filter(d => integrations.includes(d.name))
                          .map(d => d.name)
                          .join(', ')}
                      </td>
                    </Row>
                  )
                )}

              <Row>
                <td>N/A</td>
                <RowHeading scope="row">{translations.essential_category}</RowHeading>
                <td>
                  <p>{translations.esential_purpose}</p>
                </td>
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
