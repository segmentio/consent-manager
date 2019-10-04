var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Dialog from './dialog';
import { DefaultButton, GreenButton } from './buttons';
var hideOnMobile = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  @media (max-width: 600px) {\n    display: none;\n  }\n"], ["\n  @media (max-width: 600px) {\n    display: none;\n  }\n"])));
var TableScroll = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  overflow-x: auto;\n  margin-top: 16px;\n"], ["\n  overflow-x: auto;\n  margin-top: 16px;\n"])));
var Table = styled('table')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border-collapse: collapse;\n  font-size: 12px;\n"], ["\n  border-collapse: collapse;\n  font-size: 12px;\n"])));
var ColumnHeading = styled('th')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #f7f8fa;\n  color: #1f4160;\n  font-weight: 600;\n  text-align: left;\n  border-width: 2px;\n"], ["\n  background: #f7f8fa;\n  color: #1f4160;\n  font-weight: 600;\n  text-align: left;\n  border-width: 2px;\n"])));
var RowHeading = styled('th')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-weight: normal;\n  text-align: left;\n"], ["\n  font-weight: normal;\n  text-align: left;\n"])));
var Row = styled('tr')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  th,\n  td {\n    vertical-align: top;\n    padding: 8px 12px;\n    border: 1px solid rgba(67, 90, 111, 0.114);\n  }\n  td {\n    border-top: none;\n  }\n"], ["\n  th,\n  td {\n    vertical-align: top;\n    padding: 8px 12px;\n    border: 1px solid rgba(67, 90, 111, 0.114);\n  }\n  td {\n    border-top: none;\n  }\n"])));
var InputCell = styled('td')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  input {\n    vertical-align: middle;\n  }\n  label {\n    display: block;\n    margin-bottom: 4px;\n    white-space: nowrap;\n  }\n"], ["\n  input {\n    vertical-align: middle;\n  }\n  label {\n    display: block;\n    margin-bottom: 4px;\n    white-space: nowrap;\n  }\n"])));
var PreferenceDialog = /** @class */ (function (_super) {
    __extends(PreferenceDialog, _super);
    function PreferenceDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (e) {
            var onChange = _this.props.onChange;
            onChange(e.target.name, e.target.value === 'true');
        };
        _this.handleSubmit = function (e) {
            var _a = _this.props, onSave = _a.onSave, marketingAndAnalytics = _a.marketingAndAnalytics, advertising = _a.advertising, functional = _a.functional;
            e.preventDefault();
            // Safe guard against browsers that don't prevent the
            // submission of invalid forms (Safari < 10.1)
            if (marketingAndAnalytics === null ||
                advertising === null ||
                functional === null) {
                return;
            }
            onSave();
        };
        return _this;
    }
    PreferenceDialog.prototype.render = function () {
        var _a = this.props, innerRef = _a.innerRef, onCancel = _a.onCancel, marketingDestinations = _a.marketingDestinations, advertisingDestinations = _a.advertisingDestinations, functionalDestinations = _a.functionalDestinations, marketingAndAnalytics = _a.marketingAndAnalytics, advertising = _a.advertising, functional = _a.functional, title = _a.title, content = _a.content;
        var buttons = (React.createElement("div", null,
            React.createElement(DefaultButton, { type: "button", onClick: onCancel }, "Cancel"),
            React.createElement(GreenButton, { type: "submit" }, "Save")));
        return (React.createElement(Dialog, { innerRef: innerRef, title: title, buttons: buttons, onCancel: onCancel, onSubmit: this.handleSubmit },
            content,
            React.createElement(TableScroll, null,
                React.createElement(Table, null,
                    React.createElement("thead", null,
                        React.createElement(Row, null,
                            React.createElement(ColumnHeading, { scope: "col" }, "Allow"),
                            React.createElement(ColumnHeading, { scope: "col" }, "Category"),
                            React.createElement(ColumnHeading, { scope: "col" }, "Purpose"),
                            React.createElement(ColumnHeading, { scope: "col", className: hideOnMobile }, "Tools"))),
                    React.createElement("tbody", null,
                        React.createElement(Row, null,
                            React.createElement(InputCell, null,
                                React.createElement("label", null,
                                    React.createElement("input", { type: "radio", name: "functional", value: "true", checked: functional === true, onChange: this.handleChange, "aria-label": "Allow functional tracking", required: true }),
                                    ' ',
                                    "Yes"),
                                React.createElement("label", null,
                                    React.createElement("input", { type: "radio", name: "functional", value: "false", checked: functional === false, onChange: this.handleChange, "aria-label": "Disallow functional tracking", required: true }),
                                    ' ',
                                    "No")),
                            React.createElement(RowHeading, { scope: "row" }, "Functional"),
                            React.createElement("td", null,
                                React.createElement("p", null, "To monitor the performance of our site and to enhance your browsing experience."),
                                React.createElement("p", { className: hideOnMobile }, "For example, these tools enable you to communicate with us via live chat.")),
                            React.createElement("td", { className: hideOnMobile }, functionalDestinations.map(function (d) { return d.name; }).join(', '))),
                        React.createElement(Row, null,
                            React.createElement(InputCell, null,
                                React.createElement("label", null,
                                    React.createElement("input", { type: "radio", name: "marketingAndAnalytics", value: "true", checked: marketingAndAnalytics === true, onChange: this.handleChange, "aria-label": "Allow marketing and analytics tracking", required: true }),
                                    ' ',
                                    "Yes"),
                                React.createElement("label", null,
                                    React.createElement("input", { type: "radio", name: "marketingAndAnalytics", value: "false", checked: marketingAndAnalytics === false, onChange: this.handleChange, "aria-label": "Disallow marketing and analytics tracking", required: true }),
                                    ' ',
                                    "No")),
                            React.createElement(RowHeading, { scope: "row" }, "Marketing and Analytics"),
                            React.createElement("td", null,
                                React.createElement("p", null, "To understand user behavior in order to provide you with a more relevant browsing experience or personalize the content on our site."),
                                React.createElement("p", { className: hideOnMobile }, "For example, we collect information about which pages you visit to help us present more relevant information.")),
                            React.createElement("td", { className: hideOnMobile }, marketingDestinations.map(function (d) { return d.name; }).join(', '))),
                        React.createElement(Row, null,
                            React.createElement(InputCell, null,
                                React.createElement("label", null,
                                    React.createElement("input", { type: "radio", name: "advertising", value: "true", checked: advertising === true, onChange: this.handleChange, "aria-label": "Allow advertising tracking", required: true }),
                                    ' ',
                                    "Yes"),
                                React.createElement("label", null,
                                    React.createElement("input", { type: "radio", name: "advertising", value: "false", checked: advertising === false, onChange: this.handleChange, "aria-label": "Disallow advertising tracking", required: true }),
                                    ' ',
                                    "No")),
                            React.createElement(RowHeading, { scope: "row" }, "Advertising"),
                            React.createElement("td", null,
                                React.createElement("p", null, "To personalize and measure the effectiveness of advertising on our site and other websites."),
                                React.createElement("p", { className: hideOnMobile }, "For example, we may serve you a personalized ad based on the pages you visit on our site.")),
                            React.createElement("td", { className: hideOnMobile }, advertisingDestinations.map(function (d) { return d.name; }).join(', '))),
                        React.createElement(Row, null,
                            React.createElement("td", null, "N/A"),
                            React.createElement(RowHeading, { scope: "row" }, "Essential"),
                            React.createElement("td", null,
                                React.createElement("p", null, "We use browser cookies that are necessary for the site to work as intended."),
                                React.createElement("p", null, "For example, we store your website data collection preferences so we can honor them if you return to our site. You can disable these cookies in your browser settings but if you do the site may not work as intended.")),
                            React.createElement("td", { className: hideOnMobile })))))));
    };
    PreferenceDialog.displayName = 'PreferenceDialog';
    PreferenceDialog.propTypes = {
        innerRef: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        marketingDestinations: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        })).isRequired,
        advertisingDestinations: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        })).isRequired,
        functionalDestinations: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        })).isRequired,
        marketingAndAnalytics: PropTypes.bool,
        advertising: PropTypes.bool,
        functional: PropTypes.bool,
        title: PropTypes.node.isRequired,
        content: PropTypes.node.isRequired
    };
    PreferenceDialog.defaultProps = {
        marketingAndAnalytics: null,
        advertising: null,
        functional: null
    };
    return PreferenceDialog;
}(PureComponent));
export default PreferenceDialog;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=preference-dialog.js.map