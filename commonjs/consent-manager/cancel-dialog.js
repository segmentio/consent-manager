"use strict";
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
var dialog_1 = __importDefault(require("./dialog"));
var buttons_1 = require("./buttons");
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
        var buttons = (react_1.default.createElement("div", null,
            react_1.default.createElement(buttons_1.DefaultButton, { type: "button", onClick: onBack }, "Go Back"),
            react_1.default.createElement(buttons_1.RedButton, { type: "submit" }, "Yes, Cancel")));
        return (react_1.default.createElement(dialog_1.default, { innerRef: innerRef, title: title, buttons: buttons, onSubmit: this.handleSubmit, width: "500px" }, content));
    };
    CancelDialog.prototype.componentDidMount = function () {
        document.body.addEventListener('keydown', this.handleEsc, false);
    };
    CancelDialog.prototype.componentWillUnmount = function () {
        document.body.removeEventListener('keydown', this.handleEsc, false);
    };
    CancelDialog.displayName = 'CancelDialog';
    return CancelDialog;
}(react_1.PureComponent));
exports.default = CancelDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zZW50LW1hbmFnZXIvY2FuY2VsLWRpYWxvZy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1QyxvREFBNkI7QUFDN0IscUNBQW9EO0FBVXBEO0lBQTBDLGdDQUFvQjtJQUE5RDtRQUFBLHFFQW1EQztRQWZDLGtCQUFZLEdBQUcsVUFBQSxDQUFDO1lBQ04sSUFBQSxpQ0FBUyxDQUFlO1lBRWhDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUNsQixTQUFTLEVBQUUsQ0FBQTtRQUNiLENBQUMsQ0FBQTtRQUVELGVBQVMsR0FBRyxVQUFDLENBQWdCO1lBQ25CLElBQUEsaUNBQVMsQ0FBZTtZQUVoQyxVQUFVO1lBQ1YsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDcEIsU0FBUyxFQUFFLENBQUE7YUFDWjtRQUNILENBQUMsQ0FBQTs7SUFDSCxDQUFDO0lBaERDLDZCQUFNLEdBQU47UUFDUSxJQUFBLGVBQWlELEVBQS9DLHNCQUFRLEVBQUUsa0JBQU0sRUFBRSxnQkFBSyxFQUFFLG9CQUFzQixDQUFBO1FBRXZELElBQU0sT0FBTyxHQUFHLENBQ2Q7WUFDRSw4QkFBQyx1QkFBYSxJQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFFLE1BQU0sY0FFNUI7WUFDaEIsOEJBQUMsbUJBQVMsSUFBQyxJQUFJLEVBQUMsUUFBUSxrQkFBd0IsQ0FDNUMsQ0FDUCxDQUFBO1FBRUQsT0FBTyxDQUNMLDhCQUFDLGdCQUFNLElBQ0wsUUFBUSxFQUFFLFFBQVEsRUFDbEIsS0FBSyxFQUFFLEtBQUssRUFDWixPQUFPLEVBQUUsT0FBTyxFQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDM0IsS0FBSyxFQUFDLE9BQU8sSUFFWixPQUFPLENBQ0QsQ0FDVixDQUFBO0lBQ0gsQ0FBQztJQUVELHdDQUFpQixHQUFqQjtRQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDbEUsQ0FBQztJQUVELDJDQUFvQixHQUFwQjtRQUNFLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDckUsQ0FBQztJQWpDTSx3QkFBVyxHQUFHLGNBQWMsQ0FBQTtJQWtEckMsbUJBQUM7Q0FBQSxBQW5ERCxDQUEwQyxxQkFBYSxHQW1EdEQ7a0JBbkRvQixZQUFZIn0=