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
      advertisingDestinations,
      functionalDestinations,
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
                <ColumnHeading scope="col">Allow</ColumnHeading>
                <ColumnHeading scope="col">Category</ColumnHeading>
                <ColumnHeading scope="col">Purpose</ColumnHeading>
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
                        To monitor the performance of our site and to enhance your browsing
                        experience.
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
                    <RowHeading scope="row">Marketing and Analytics</RowHeading>
                    <td>
                      <p>
                        To understand user behavior in order to provide you with a more relevant
                        browsing experience or personalize the content on our site.
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
                    <RowHeading scope="row">Advertising</RowHeading>
                    <td>
                      <p>
                        To personalize and measure the effectiveness of advertising on our site and
                        other websites.
                      </p>
                      <p className={hideOnMobile}>
                        For example, we may serve you a personalized ad based on the pages you visit
                        on our site.
                      </p>
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
                          .filter(d => integrations.includes(d.id))
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
                  <p>We use browser cookies that are necessary for the site to work as intended.</p>
                  <p>
                    For example, we store your website data collection preferences so we can honor
                    them if you return to our site. You can disable these cookies in your browser
                    settings but if you do the site may not work as intended.
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
