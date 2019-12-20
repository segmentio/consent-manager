import React, { PureComponent } from 'react'
import styled, { css } from 'react-emotion'
import Dialog from './dialog'
import { Destination, CustomCategories, CategoryPreferences } from '../types'
import { Button } from '@bigcommerce/big-design'

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
      // marketingDestinations,
      // advertisingDestinations,
      // functionalDestinations,
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
          <Button variant="subtle" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
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
        {content !== '' && content !== undefined ? content : ''}

        <TableScroll>
          <Table>
            <thead>
              <Row>
                <ColumnHeading scope="col">Allow</ColumnHeading>
                <ColumnHeading scope="col">Category</ColumnHeading>
                <ColumnHeading scope="col">Purpose</ColumnHeading>
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
                        Yes
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
                        No
                      </label>
                    </InputCell>
                    <RowHeading scope="row">Functional</RowHeading>
                    <td>
                      <p>
                        Enables enhanced functionality, such as videos and live chat. If you do not
                        allow these, then some or all of these functions may not work properly.
                      </p>
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
                        Yes
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
                        No
                      </label>
                    </InputCell>
                    <RowHeading scope="row">Analytics</RowHeading>
                    <td>
                      <p>
                        Provide statistical information on site usage, e.g., web analytics so we can
                        improve this website over time.
                      </p>
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
                        Yes
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
                        No
                      </label>
                    </InputCell>
                    <RowHeading scope="row">Targeting; Advertising</RowHeading>
                    <td>
                      <p>
                        Used to create profiles or personalize content to enhance your shopping
                        experience.
                      </p>
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
                          Yes
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
                          No
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
                <RowHeading scope="row">Essential</RowHeading>
                <td>
                  <p>
                    Essential for the site and any requested services to work, but do not perform
                    any additional or secondary function.
                  </p>
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
