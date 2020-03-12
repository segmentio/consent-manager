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
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'react-emotion';
import nanoid from 'nanoid';
import fontStyles from './font-styles';
var ANIMATION_DURATION = '200ms';
var ANIMATION_EASING = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
var Overlay = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(67, 90, 111, 0.699);\n"], ["\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(67, 90, 111, 0.699);\n"])));
var openAnimation = keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n"], ["\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n"])));
var Root = styled('section')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  ", ";\n  display: flex;\n  flex-direction: column;\n  max-width: calc(100vw - 16px);\n  max-height: calc(100vh - 16px);\n  width: ", ";\n  margin: 8px;\n  background: #fff;\n  border-radius: 8px;\n  animation: ", " ", " ", " both;\n"], ["\n  ", ";\n  display: flex;\n  flex-direction: column;\n  max-width: calc(100vw - 16px);\n  max-height: calc(100vh - 16px);\n  width: ", ";\n  margin: 8px;\n  background: #fff;\n  border-radius: 8px;\n  animation: ", " ", " ", " both;\n"])), fontStyles, function (props) { return props.width; }, openAnimation, ANIMATION_DURATION, ANIMATION_EASING);
var Form = styled('form')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n"], ["\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n"])));
var Header = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  flex: 1 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  border-bottom: 1px solid rgba(67, 90, 111, 0.079);\n"], ["\n  flex: 1 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  border-bottom: 1px solid rgba(67, 90, 111, 0.079);\n"])));
var Title = styled('h2')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin: 0;\n  color: #1f4160;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 1.3;\n"], ["\n  margin: 0;\n  color: #1f4160;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 1.3;\n"])));
var HeaderCancelButton = styled('button')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  padding: 8px;\n  border: none;\n  background: none;\n  color: inherit;\n  font: inherit;\n  font-size: 14px;\n  line-height: 1;\n  cursor: pointer;\n"], ["\n  padding: 8px;\n  border: none;\n  background: none;\n  color: inherit;\n  font: inherit;\n  font-size: 14px;\n  line-height: 1;\n  cursor: pointer;\n"])));
var Content = styled('div')(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 0;\n  min-height: 0;\n  font-size: 14px;\n  line-height: 1.2;\n\n  p {\n    margin: 0;\n    &:not(:last-child) {\n      margin-bottom: 0.7em;\n    }\n  }\n\n  a {\n    color: #47b881;\n    &:hover {\n      color: #64c395;\n    }\n    &:active {\n      color: #248953;\n    }\n  }\n"], ["\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 0;\n  min-height: 0;\n  font-size: 14px;\n  line-height: 1.2;\n\n  p {\n    margin: 0;\n    &:not(:last-child) {\n      margin-bottom: 0.7em;\n    }\n  }\n\n  a {\n    color: #47b881;\n    &:hover {\n      color: #64c395;\n    }\n    &:active {\n      color: #248953;\n    }\n  }\n"])));
var Buttons = styled('div')(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  padding: 16px;\n  text-align: right;\n"], ["\n  padding: 16px;\n  text-align: right;\n"])));
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        _this.handleRootRef = function (node) {
            _this.root = node;
        };
        _this.handleFormRef = function (node) {
            _this.form = node;
        };
        _this.handleOverlayClick = function (e) {
            var onCancel = _this.props.onCancel;
            // Ignore propogated clicks from inside the dialog
            if (onCancel && _this.root && !_this.root.contains(e.target)) {
                onCancel();
            }
        };
        _this.handleEsc = function (e) {
            var onCancel = _this.props.onCancel;
            // Esc key
            if (onCancel && e.keyCode === 27) {
                onCancel();
            }
        };
        _this.titleId = nanoid();
        _this.container = document.createElement('div');
        _this.container.setAttribute('data-consent-manager-dialog', '');
        document.body.appendChild(_this.container);
        return _this;
    }
    Dialog.prototype.render = function () {
        var _a = this.props, onCancel = _a.onCancel, onSubmit = _a.onSubmit, title = _a.title, children = _a.children, buttons = _a.buttons, width = _a.width;
        var dialog = (React.createElement(Overlay, { onClick: this.handleOverlayClick },
            React.createElement(Root, { innerRef: this.handleRootRef, role: "dialog", "aria-modal": true, "aria-labelledby": this.titleId, width: width },
                React.createElement(Header, null,
                    React.createElement(Title, { id: this.titleId }, title),
                    onCancel && (React.createElement(HeaderCancelButton, { onClick: onCancel, title: "Cancel", "aria-label": "Cancel" }, "\u2715"))),
                React.createElement(Form, { innerRef: this.handleFormRef, onSubmit: onSubmit },
                    React.createElement(Content, null, children),
                    React.createElement(Buttons, null, buttons)))));
        return ReactDOM.createPortal(dialog, this.container);
    };
    Dialog.prototype.componentDidMount = function () {
        var innerRef = this.props.innerRef;
        if (this.form) {
            var input = this.form.querySelector('input,button');
            if (input) {
                input.focus();
            }
        }
        document.body.addEventListener('keydown', this.handleEsc, false);
        document.body.style.overflow = 'hidden';
        innerRef(this.container);
    };
    Dialog.prototype.componentWillUnmount = function () {
        var innerRef = this.props.innerRef;
        document.body.removeEventListener('keydown', this.handleEsc, false);
        document.body.style.overflow = '';
        document.body.removeChild(this.container);
        innerRef(null);
    };
    Dialog.displayName = 'Dialog';
    Dialog.defaultProps = {
        onCancel: undefined,
        width: '750px'
    };
    return Dialog;
}(PureComponent));
export default Dialog;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci9kaWFsb2cudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFDNUMsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFBO0FBQ2hDLE9BQU8sTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ2pELE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQTtBQUMzQixPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFFdEMsSUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUE7QUFDbEMsSUFBTSxnQkFBZ0IsR0FBRyxnQ0FBZ0MsQ0FBQTtBQUV6RCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLDhRQUFBLDJNQVc1QixJQUFBLENBQUE7QUFFRCxJQUFNLGFBQWEsR0FBRyxTQUFTLDJMQUFBLHdIQVM5QixJQUFBLENBQUE7QUFFRCxJQUFNLElBQUksR0FBRyxNQUFNLENBQW9ELFNBQVMsQ0FBQyxpVEFBQSxNQUM3RSxFQUFVLGdJQUtILEVBQW9CLDhFQUloQixFQUFhLEdBQUksRUFBa0IsR0FBSSxFQUFnQixVQUNyRSxLQVZHLFVBQVUsRUFLSCxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxLQUFLLEVBQVgsQ0FBVyxFQUloQixhQUFhLEVBQUksa0JBQWtCLEVBQUksZ0JBQWdCLENBQ3JFLENBQUE7QUFFRCxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLHNJQUFBLG1FQUkxQixJQUFBLENBQUE7QUFFRCxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLG9QQUFBLGlMQU8zQixJQUFBLENBQUE7QUFFRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHNLQUFB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