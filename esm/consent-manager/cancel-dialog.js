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
import Dialog from './dialog';
import { DefaultButton, RedButton } from './buttons';
var CancelDialog = /** @class */ (function (_super) {
    __extends(CancelDialog, _super);
    function CancelDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (e) {
            var onConfirm = _this.props.onConfirm;
            e.preventDefault();
            onConfirm();
        };
        _this.handleEsc = function (e) {
            var onConfirm = _this.props.onConfirm;
            // Esc key
            if (e.keyCode === 27) {
                onConfirm();
            }
        };
        return _this;
    }
    CancelDialog.prototype.render = function () {
        var _a = this.props, innerRef = _a.innerRef, onBack = _a.onBack, title = _a.title, content = _a.content;
        var buttons = (React.createElement("div", null,
            React.createElement(DefaultButton, { type: "button", onClick: onBack }, "Go Back"),
            React.createElement(RedButton, { type: "submit" }, "Yes, Cancel")));
        return (React.createElement(Dialog, { innerRef: innerRef, title: title, buttons: buttons, onSubmit: this.handleSubmit, width: "500px" }, content));
    };
    CancelDialog.prototype.componentDidMount = function () {
        document.body.addEventListener('keydown', this.handleEsc, false);
    };
    CancelDialog.prototype.componentWillUnmount = function () {
        document.body.removeEventListener('keydown', this.handleEsc, false);
    };
    CancelDialog.displayName = 'CancelDialog';
    return CancelDialog;
}(PureComponent));
export default CancelDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zZW50LW1hbmFnZXIvY2FuY2VsLWRpYWxvZy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQzVDLE9BQU8sTUFBTSxNQUFNLFVBQVUsQ0FBQTtBQUM3QixPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQVVwRDtJQUEwQyxnQ0FBb0I7SUFBOUQ7UUFBQSxxRUFtREM7UUFmQyxrQkFBWSxHQUFHLFVBQUEsQ0FBQztZQUNOLElBQUEsaUNBQVMsQ0FBZTtZQUVoQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDbEIsU0FBUyxFQUFFLENBQUE7UUFDYixDQUFDLENBQUE7UUFFRCxlQUFTLEdBQUcsVUFBQyxDQUFnQjtZQUNuQixJQUFBLGlDQUFTLENBQWU7WUFFaEMsVUFBVTtZQUNWLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7Z0JBQ3BCLFNBQVMsRUFBRSxDQUFBO2FBQ1o7UUFDSCxDQUFDLENBQUE7O0lBQ0gsQ0FBQztJQWhEQyw2QkFBTSxHQUFOO1FBQ1EsSUFBQSxlQUFpRCxFQUEvQyxzQkFBUSxFQUFFLGtCQUFNLEVBQUUsZ0JBQUssRUFBRSxvQkFBc0IsQ0FBQTtRQUV2RCxJQUFNLE9BQU8sR0FBRyxDQUNkO1lBQ0Usb0JBQUMsYUFBYSxJQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFFLE1BQU0sY0FFNUI7WUFDaEIsb0JBQUMsU0FBUyxJQUFDLElBQUksRUFBQyxRQUFRLGtCQUF3QixDQUM1QyxDQUNQLENBQUE7UUFFRCxPQUFPLENBQ0wsb0JBQUMsTUFBTSxJQUNMLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLEtBQUssRUFBRSxLQUFLLEVBQ1osT0FBTyxFQUFFLE9BQU8sRUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLEtBQUssRUFBQyxPQUFPLElBRVosT0FBTyxDQUNELENBQ1YsQ0FBQTtJQUNILENBQUM7SUFFRCx3Q0FBaUIsR0FBakI7UUFDRSxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ2xFLENBQUM7SUFFRCwyQ0FBb0IsR0FBcEI7UUFDRSxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFqQ00sd0JBQVcsR0FBRyxjQUFjLENBQUE7SUFrRHJDLG1CQUFDO0NBQUEsQUFuREQsQ0FBMEMsYUFBYSxHQW1EdEQ7ZUFuRG9CLFlBQVkifQ==