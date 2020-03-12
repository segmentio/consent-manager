"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_emotion_1 = __importStar(require("react-emotion"));
var dialog_1 = __importDefault(require("./dialog"));
var buttons_1 = require("./buttons");
var hideOnMobile = react_emotion_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  @media (max-width: 600px) {\n    display: none;\n  }\n"], ["\n  @media (max-width: 600px) {\n    display: none;\n  }\n"])));
var TableScroll = react_emotion_1.default('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  overflow-x: auto;\n  margin-top: 16px;\n"], ["\n  overflow-x: auto;\n  margin-top: 16px;\n"])));
var Table = react_emotion_1.default('table')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border-collapse: collapse;\n  font-size: 12px;\n"], ["\n  border-collapse: collapse;\n  font-size: 12px;\n"])));
var ColumnHeading = react_emotion_1.default('th')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #f7f8fa;\n  color: #1f4160;\n  font-weight: 600;\n  text-align: left;\n  border-width: 2px;\n"], ["\n  background: #f7f8fa;\n  color: #1f4160;\n  font-weight: 600;\n  text-align: left;\n  border-width: 2px;\n"])));
var RowHeading = react_emotion_1.default('th')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-weight: normal;\n  text-align: left;\n"], ["\n  font-weight: normal;\n  text-align: left;\n"])));
var Row = react_emotion_1.default('tr')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  th,\n  td {\n    vertical-align: top;\n    padding: 8px 12px;\n    border: 1px solid rgba(67, 90, 111, 0.114);\n  }\n  td {\n    border-top: none;\n  }\n"], ["\n  th,\n  td {\n    vertical-align: top;\n    padding: 8px 12px;\n    border: 1px solid rgba(67, 90, 111, 0.114);\n  }\n  td {\n    border-top: none;\n  }\n"])));
var InputCell = react_emotion_1.default('td')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  input {\n    vertical-align: middle;\n  }\n  label {\n    display: block;\n    margin-bottom: 4px;\n    white-space: nowrap;\n  }\n"], ["\n  input {\n    vertical-align: middle;\n  }\n  label {\n    display: block;\n    margin-bottom: 4px;\n    white-space: nowrap;\n  }\n"])));
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
        var buttons = (react_1.default.createElement("div", null,
            react_1.default.createElement(buttons_1.DefaultButton, { type: "button", onClick: onCancel }, "Cancel"),
            react_1.default.createElement(buttons_1.GreenButton, { type: "submit" }, "Save")));
        return (react_1.default.createElement(dialog_1.default, { innerRef: innerRef, title: title, buttons: buttons, onCancel: onCancel, onSubmit: this.handleSubmit },
            content,
            react_1.default.createElement(TableScroll, null,
                react_1.default.createElement(Table, null,
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement(Row, null,
                            react_1.default.createElement(ColumnHeading, { scope: "col" }, "Allow"),
                            react_1.default.createElement(ColumnHeading, { scope: "col" }, "Category"),
                            react_1.default.createElement(ColumnHeading, { scope: "col" }, "Purpose"),
                            react_1.default.createElement(ColumnHeading, { scope: "col", className: hideOnMobile }, "Tools"))),
                    react_1.default.createElement("tbody", null,
                        !customCategories && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(Row, null,
                                react_1.default.createElement(InputCell, null,
                                    react_1.default.createElement("label", null,
                                        react_1.default.createElement("input", { type: "radio", name: "functional", value: "true", checked: functional === true, onChange: this.handleChange, "aria-label": "Allow functional tracking", required: true }),
                                        ' ',
                                        "Yes"),
                                    react_1.default.createElement("label", null,
                                        react_1.default.createElement("input", { type: "radio", name: "functional", value: "false", checked: functional === false, onChange: this.handleChange, "aria-label": "Disallow functional tracking", required: true }),
                                        ' ',
                                        "No")),
                                react_1.default.createElement(RowHeading, { scope: "row" }, "Functional"),
                                react_1.default.createElement("td", null,
                                    react_1.default.createElement("p", null, "To monitor the performance of our site and to enhance your browsing experience."),
                                    react_1.default.createElement("p", { className: hideOnMobile }, "For example, these tools enable you to communicate with us via live chat.")),
                                react_1.default.createElement("td", { className: hideOnMobile }, functionalDestinations.map(function (d) { return d.name; }).join(', '))),
                            react_1.default.createElement(Row, null,
                                react_1.default.createElement(InputCell, null,
                                    react_1.default.createElement("label", null,
                                        react_1.default.createElement("input", { type: "radio", name: "marketingAndAnalytics", value: "true", checked: marketingAndAnalytics === true, onChange: this.handleChange, "aria-label": "Allow marketing and analytics tracking", required: true }),
                                        ' ',
                                        "Yes"),
                                    react_1.default.createElement("label", null,
                                        react_1.default.createElement("input", { type: "radio", name: "marketingAndAnalytics", value: "false", checked: marketingAndAnalytics === false, onChange: this.handleChange, "aria-label": "Disallow marketing and analytics tracking", required: true }),
                                        ' ',
                                        "No")),
                                react_1.default.createElement(RowHeading, { scope: "row" }, "Marketing and Analytics"),
                                react_1.default.createElement("td", null,
                                    react_1.default.createElement("p", null, "To understand user behavior in order to provide you with a more relevant browsing experience or personalize the content on our site."),
                                    react_1.default.createElement("p", { className: hideOnMobile }, "For example, we collect information about which pages you visit to help us present more relevant information.")),
                                react_1.default.createElement("td", { className: hideOnMobile }, marketingDestinations.map(function (d) { return d.name; }).join(', '))),
                            react_1.default.createElement(Row, null,
                                react_1.default.createElement(InputCell, null,
                                    react_1.default.createElement("label", null,
                                        react_1.default.createElement("input", { type: "radio", name: "advertising", value: "true", checked: advertising === true, onChange: this.handleChange, "aria-label": "Allow advertising tracking", required: true }),
                                        ' ',
                                        "Yes"),
                                    react_1.default.createElement("label", null,
                                        react_1.default.createElement("input", { type: "radio", name: "advertising", value: "false", checked: advertising === false, onChange: this.handleChange, "aria-label": "Disallow advertising tracking", required: true }),
                                        ' ',
                                        "No")),
                                react_1.default.createElement(RowHeading, { scope: "row" }, "Advertising"),
                                react_1.default.createElement("td", null,
                                    react_1.default.createElement("p", null, "To personalize and measure the effectiveness of advertising on our site and other websites."),
                                    react_1.default.createElement("p", { className: hideOnMobile }, "For example, we may serve you a personalized ad based on the pages you visit on our site.")),
                                react_1.default.createElement("td", { className: hideOnMobile }, advertisingDestinations.map(function (d) { return d.name; }).join(', '))))),
                        customCategories &&
                            Object.entries(customCategories).map(function (_a) {
                                var categoryName = _a[0], _b = _a[1], integrations = _b.integrations, purpose = _b.purpose;
                                return (react_1.default.createElement(Row, { key: categoryName },
                                    react_1.default.createElement(InputCell, null,
                                        react_1.default.createElement("label", null,
                                            react_1.default.createElement("input", { type: "radio", name: categoryName, value: "true", checked: preferences[categoryName] === true, onChange: _this.handleChange, "aria-label": "Allow \"" + categoryName + "\" tracking", required: true }),
                                            ' ',
                                            "Yes"),
                                        react_1.default.createElement("label", null,
                                            react_1.default.createElement("input", { type: "radio", name: categoryName, value: "false", checked: preferences[categoryName] === false, onChange: _this.handleChange, "aria-label": "Disallow \"" + categoryName + "\" tracking", required: true }),
                                            ' ',
                                            "No")),
                                    react_1.default.createElement(RowHeading, { scope: "row" }, categoryName),
                                    react_1.default.createElement("td", null,
                                        react_1.default.createElement("p", null, purpose)),
                                    react_1.default.createElement("td", { className: hideOnMobile }, destinations
                                        .filter(function (d) { return integrations.includes(d.id); })
                                        .map(function (d) { return d.name; })
                                        .join(', '))));
                            }),
                        react_1.default.createElement(Row, null,
                            react_1.default.createElement("td", null, "N/A"),
                            react_1.default.createElement(RowHeading, { scope: "row" }, "Essential"),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement("p", null, "We use browser cookies that are necessary for the site to work as intended."),
                                react_1.default.createElement("p", null, "For example, we store your website data collection preferences so we can honor them if you return to our site. You can disable these cookies in your browser settings but if you do the site may not work as intended.")),
                            react_1.default.createElement("td", { className: hideOnMobile })))))));
    };
    PreferenceDialog.displayName = 'PreferenceDialog';
    PreferenceDialog.defaultProps = {
        marketingAndAnalytics: null,
        advertising: null,
        functional: null
    };
    return PreferenceDialog;
}(react_1.PureComponent));
exports.default = PreferenceDialog;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZS1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc2VudC1tYW5hZ2VyL3ByZWZlcmVuY2UtZGlhbG9nLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1Qyw2REFBMkM7QUFDM0Msb0RBQTZCO0FBQzdCLHFDQUFzRDtBQUd0RCxJQUFNLFlBQVksR0FBRyxtQkFBRywrSEFBQSw0REFJdkIsSUFBQSxDQUFBO0FBRUQsSUFBTSxXQUFXLEdBQUcsdUJBQU0sQ0FBQyxLQUFLLENBQUMsaUhBQUEsOENBR2hDLElBQUEsQ0FBQTtBQUVELElBQU0sS0FBSyxHQUFHLHVCQUFNLENBQUMsT0FBTyxDQUFDLHlIQUFBLHNEQUc1QixJQUFBLENBQUE7QUFFRCxJQUFNLGFBQWEsR0FBRyx1QkFBTSxDQUFDLElBQUksQ0FBQyxrTEFBQSwrR0FNakMsSUFBQSxDQUFBO0FBRUQsSUFBTSxVQUFVLEdBQUcsdUJBQU0sQ0FBQyxJQUFJLENBQUMsb0hBQUEsaURBRzlCLElBQUEsQ0FBQTtBQUVELElBQU0sR0FBRyxHQUFHLHVCQUFNLENBQUMsSUFBSSxDQUFDLGtPQUFBLCtKQVV2QixJQUFBLENBQUE7QUFFRCxJQUFNLFNBQVMsR0FBRyx1QkFBTSxDQUFDLElBQUksQ0FBQyw0TUFBQSx5SUFTN0IsSUFBQSxDQUFBO0FBb0JEO0lBQThDLG9DQUF3QztJQUF0RjtRQUFBLHFFQThSQztRQWpDQyxrQkFBWSxHQUFHLFVBQUEsQ0FBQztZQUNOLElBQUEsK0JBQVEsQ0FBZTtZQUMvQixRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUE7UUFDcEQsQ0FBQyxDQUFBO1FBRUQsa0JBQVksR0FBRyxVQUFDLENBQW1DO1lBQzNDLElBQUEsZ0JBT1EsRUFOWixr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