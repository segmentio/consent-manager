import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'react-emotion'
import Dialog from './dialog'
import {DefaultButton, GreenButton} from './buttons'

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
  background: #435a6f0a;
  color: #1f4160;
  font-weight: 600;
  text-align: left;
`

const RowHeading = styled('th')`
  font-weight: normal;
  text-align: left;
`

const Row = styled('tr')`
  th,
  td {
    padding: 8px 12px;
    border: 1px solid #435a6f14;
    border-top: none;
    border-left: none;
  }
`

const CheckboxCell = styled('td')`
  text-align: center;
`

export default class PreferenceDialog extends PureComponent {
  static displayName = 'PreferenceDialog'

  static propTypes = {
    innerRef: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    marketingDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    advertisingDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    functionalDestinations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    marketingAndAnalytics: PropTypes.bool.isRequired,
    advertising: PropTypes.bool.isRequired,
    functional: PropTypes.bool.isRequired,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired
  }

  render() {
    const {
      innerRef,
      onCancel,
      onSave,
      marketingDestinations,
      advertisingDestinations,
      functionalDestinations,
      marketingAndAnalytics,
      advertising,
      functional,
      title,
      content
    } = this.props

    const buttons = (
      <div>
        <DefaultButton type="button" onClick={onCancel}>
          Cancel
        </DefaultButton>
        <GreenButton type="button" onClick={onSave}>
          Save
        </GreenButton>
      </div>
    )

    return (
      <Dialog
        innerRef={innerRef}
        title={title}
        buttons={buttons}
        onCancel={onCancel}
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
              <Row>
                <CheckboxCell>
                  <input
                    type="checkbox"
                    name="marketingAndAnalytics"
                    checked={marketingAndAnalytics}
                    onChange={this.handleChange}
                    aria-label="Allow marketing and analytics tracking"
                  />
                </CheckboxCell>
                <RowHeading scope="row">Marketing and Analytics</RowHeading>
                <td>
                  <p>
                    We use these tools to understand user behavior in order to
                    provide you with a more relevant browsing experience.
                  </p>
                  <p className={hideOnMobile}>
                    For example, we collect information about which pages you
                    visit to help us present information that you find relevant
                    when you visit our site.
                  </p>
                </td>
                <td className={hideOnMobile}>
                  {marketingDestinations.map(d => d.name).join(', ')}
                </td>
              </Row>

              <Row>
                <CheckboxCell>
                  <input
                    type="checkbox"
                    name="advertising"
                    checked={advertising}
                    onChange={this.handleChange}
                    aria-label="Allow advertising tracking"
                  />
                </CheckboxCell>
                <RowHeading scope="row">Advertising</RowHeading>
                <td>
                  <p>
                    We use these tools to personalize and measure the
                    effectiveness of our advertising.
                  </p>
                  <p className={hideOnMobile}>
                    For example, we may serve you a personalized ad based on the
                    pages you visit on our site. This information may also be
                    used to ensure we do not repeatedly serve you the same ad.
                  </p>
                </td>
                <td className={hideOnMobile}>
                  {advertisingDestinations.map(d => d.name).join(', ')}
                </td>
              </Row>

              <Row>
                <CheckboxCell>
                  <input
                    type="checkbox"
                    name="functional"
                    checked={functional}
                    onChange={this.handleChange}
                    aria-label="Allow functional tracking"
                  />
                </CheckboxCell>
                <RowHeading scope="row">Functional</RowHeading>
                <td>
                  <p>
                    We use these tools to monitor the performance of our site
                    and to enhance your browsing experience.
                  </p>
                  <p className={hideOnMobile}>
                    For example, these tools enable you to communicate with us
                    via live chat if you have any questions while you’re on our
                    site.
                  </p>
                </td>
                <td className={hideOnMobile}>
                  {functionalDestinations.map(d => d.name).join(', ')}
                </td>
              </Row>
            </tbody>
          </Table>
        </TableScroll>
      </Dialog>
    )
  }

  handleChange = e => {
    const {onChange} = this.props

    onChange(e.target.name, e.target.checked)
  }
}
