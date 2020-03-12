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
            var _a = _this.props, onSave = _a.onSave, preferences = _a.preferences, marketingAndAnalytics = _a.marketingAndAnalytics, advertising = _a.advertising, functional = _a.functional, customCategories = _a.customCategories;
            e.preventDefault();
            // Safe guard against browsers that don't prevent the
            // submission of invalid forms (Safari < 10.1)
            if (!customCategories &&
                (marketingAndAnalytics === null || advertising === null || functional === null)) {
                return;
            }
            // Safe guard against custom categories being null
            if (customCategories &&
                Object.keys(customCategories).some(function (category) { return preferences[category] === null; })) {
                return;
            }
            onSave();
        };
        return _this;
    }
    PreferenceDialog.prototype.render = function () {
        var _this = this;
        var _a = this.props, innerRef = _a.innerRef, onCancel = _a.onCancel, marketingDestinations = _a.marketingDestinations, advertisingDestinations = _a.advertisingDestinations, functionalDestinations = _a.functionalDestinations, marketingAndAnalytics = _a.marketingAndAnalytics, advertising = _a.advertising, functional = _a.functional, customCategories = _a.customCategories, destinations = _a.destinations, title = _a.title, content = _a.content, preferences = _a.preferences;
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
                        !customCategories && (React.createElement(React.Fragment, null,
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
                                React.createElement("td", { className: hideOnMobile }, advertisingDestinations.map(function (d) { return d.name; }).join(', '))))),
                        customCategories &&
                            Object.entries(customCategories).map(function (_a) {
                                var categoryName = _a[0], _b = _a[1], integrations = _b.integrations, purpose = _b.purpose;
                                return (React.createElement(Row, { key: categoryName },
                                    React.createElement(InputCell, null,
                                        React.createElement("label", null,
                                            React.createElement("input", { type: "radio", name: categoryName, value: "true", checked: preferences[categoryName] === true, onChange: _this.handleChange, "aria-label": "Allow \"" + categoryName + "\" tracking", required: true }),
                                            ' ',
                                            "Yes"),
                                        React.createElement("label", null,
                                            React.createElement("input", { type: "radio", name: categoryName, value: "false", checked: preferences[categoryName] === false, onChange: _this.handleChange, "aria-label": "Disallow \"" + categoryName + "\" tracking", required: true }),
                                            ' ',
                                            "No")),
                                    React.createElement(RowHeading, { scope: "row" }, categoryName),
                                    React.createElement("td", null,
                                        React.createElement("p", null, purpose)),
                                    React.createElement("td", { className: hideOnMobile }, destinations
                                        .filter(function (d) { return integrations.includes(d.id); })
                                        .map(function (d) { return d.name; })
                                        .join(', '))));
                            }),
                        React.createElement(Row, null,
                            React.createElement("td", null, "N/A"),
                            React.createElement(RowHeading, { scope: "row" }, "Essential"),
                            React.createElement("td", null,
                                React.createElement("p", null, "We use browser cookies that are necessary for the site to work as intended."),
                                React.createElement("p", null, "For example, we store your website data collection preferences so we can honor them if you return to our site. You can disable these cookies in your browser settings but if you do the site may not work as intended.")),
                            React.createElement("td", { className: hideOnMobile })))))));
    };
    PreferenceDialog.displayName = 'PreferenceDialog';
    PreferenceDialog.defaultProps = {
        marketingAndAnalytics: null,
        advertising: null,
        functional: null
    };
    return PreferenceDialog;
}(PureComponent));
export default PreferenceDialog;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZS1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc2VudC1tYW5hZ2VyL3ByZWZlcmVuY2UtZGlhbG9nLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQzVDLE9BQU8sTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzNDLE9BQU8sTUFBTSxNQUFNLFVBQVUsQ0FBQTtBQUM3QixPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUd0RCxJQUFNLFlBQVksR0FBRyxHQUFHLCtIQUFBLDREQUl2QixJQUFBLENBQUE7QUFFRCxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGlIQUFBLDhDQUdoQyxJQUFBLENBQUE7QUFFRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHlIQUFBLHNEQUc1QixJQUFBLENBQUE7QUFFRCxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGtMQUFBLCtHQU1qQyxJQUFBLENBQUE7QUFFRCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG9IQUFBLGlEQUc5QixJQUFBLENBQUE7QUFFRCxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGtPQUFBLCtKQVV2QixJQUFBLENBQUE7QUFFRCxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLDRNQUFBLHlJQVM3QixJQUFBLENBQUE7QUFvQkQ7SUFBOEMsb0NBQXdDO0lBQXRGO1FBQUEscUVBOFJDO1FBakNDLGtCQUFZLEdBQUcsVUFBQSxDQUFDO1lBQ04sSUFBQSwrQkFBUSxDQUFlO1lBQy9CLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFB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