import React, { PureComponent } from 'react'
import styled, { css } from 'react-emotion'
import Dialog from './dialog'
import { DefaultButton, GreenButton } from './buttons'
import { CategoryPreferences } from '../types'
import { DestinationCategory } from './categories'

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
  title: React.ReactNode
  content: React.ReactNode
  /**
   * All destinations grouped by category
   */
  destinations: DestinationCategory[]
  /**
   * The preferences to be shown in the dialog
   */
  preferences: CategoryPreferences
}

export default class PreferenceDialog extends PureComponent<PreferenceDialogProps, {}> {
  static displayName = 'PreferenceDialog'

  static defaultProps = {
    marketingAndAnalytics: null,
    advertising: null,
    functional: null
  }

  render() {
    const { innerRef, onCancel, title, content, destinations, preferences } = this.props

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
              {destinations.map(destinationCategory => {
                return (
                  <Row id={destinationCategory.name}>
                    <InputCell>
                      <label>
                        <input
                          type="radio"
                          name={destinationCategory.key}
                          value="true"
                          checked={preferences[destinationCategory.key] === true}
                          onChange={this.handleChange}
                          aria-label={`Allow ${destinationCategory.name} tracking`}
                          required
                        />{' '}
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={destinationCategory.key}
                          value="false"
                          checked={preferences[destinationCategory.key] === false}
                          onChange={this.handleChange}
                          aria-label={`Disallow ${destinationCategory.name} tracking`}
                          required
                        />{' '}
                        No
                      </label>
                    </InputCell>
                    <RowHeading scope="row">{destinationCategory.name}</RowHeading>
                    <td>
                      <p>{destinationCategory.description}</p>
                      {destinationCategory.example ?? <p className={hideOnMobile}>{destinationCategory.example}</p>}
                    </td>
                    <td className={hideOnMobile}>
                      {destinationCategory.destinations.map(d => d.name).join(', ')}
                    </td>
                  </Row>
                )
              })}

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
    e.preventDefault()

    // Safe guard against browsers that don't prevent the
    // submission of invalid forms (Safari < 10.1)
    const allNull = Object.values(this.props.preferences).every(preference => preference === null)
    if (allNull) {
      return
    }

    this.props.onSave()
  }
}
