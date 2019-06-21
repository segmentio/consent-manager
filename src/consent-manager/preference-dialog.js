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
    marketingAndAnalytics: PropTypes.bool,
    advertising: PropTypes.bool,
    functional: PropTypes.bool,
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    translate: PropTypes.func.isRequired
  }

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
      title,
      content,
      translate
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
                <ColumnHeading scope="col">
                  {translate('ui.header.allow')}
                </ColumnHeading>
                <ColumnHeading scope="col">
                  {translate('ui.header.category')}
                </ColumnHeading>
                <ColumnHeading scope="col">
                  {translate('ui.header.purpose')}
                </ColumnHeading>
                <ColumnHeading scope="col" className={hideOnMobile}>
                  {translate('ui.header.tools')}
                </ColumnHeading>
              </Row>
            </thead>

            <tbody>
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
                <RowHeading scope="row">
                  {translate('category.functional')}
                </RowHeading>
                <td>{translate('purpose.functional')}</td>
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
                <RowHeading scope="row">
                  {translate('category.marketing')}
                </RowHeading>
                <td>{translate('purpose.marketing')}</td>
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
                <RowHeading scope="row">
                  {translate('category.advertising')}
                </RowHeading>
                <td>{translate('purpose.advertising')}</td>
                <td className={hideOnMobile}>
                  {advertisingDestinations.map(d => d.name).join(', ')}
                </td>
              </Row>

              <Row>
                <td>{translate('ui.not_available')}</td>
                <RowHeading scope="row">
                  {translate('category.essential')}
                </RowHeading>
                <td>{translate('purpose.essential')}</td>
                <td className={hideOnMobile} />
              </Row>
            </tbody>
          </Table>
        </TableScroll>
      </Dialog>
    )
  }

  handleChange = e => {
    const {onChange} = this.props

    onChange(e.target.name, e.target.value === 'true')
  }

  handleSubmit = e => {
    const {onSave, marketingAndAnalytics, advertising, functional} = this.props

    e.preventDefault()

    // Safe guard against browsers that don't prevent the
    // submission of invalid forms (Safari < 10.1)
    if (
      marketingAndAnalytics === null ||
      advertising === null ||
      functional === null
    ) {
      return
    }

    onSave()
  }
}
