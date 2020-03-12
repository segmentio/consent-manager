"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __importDefault(require("events"));
var react_1 = __importDefault(require("react"));
var banner_1 = __importDefault(require("./banner"));
var preference_dialog_1 = __importDefault(require("./preference-dialog"));
var cancel_dialog_1 = __importDefault(require("./cancel-dialog"));
var categories_1 = require("./categories");
var emitter = new events_1.default();
function openDialog() {
    emitter.emit('openDialog');
}
exports.openDialog = openDialog;
function normalizeDestinations(destinations) {
    var marketingDestinations = [];
    var advertisingDestinations = [];
    var functionalDestinations = [];
    var _loop_1 = function (destination) {
        if (categories_1.ADVERTISING_CATEGORIES.find(function (c) { return c === destination.category; })) {
            advertisingDestinations.push(destination);
        }
        else if (categories_1.FUNCTIONAL_CATEGORIES.find(function (c) { return c === destination.category; })) {
            functionalDestinations.push(destination);
        }
        else {
            // Fallback to marketing
            marketingDestinations.push(destination);
        }
    };
    for (var _i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
        var destination = destinations_1[_i];
        _loop_1(destination);
    }
    return { marketingDestinations: marketingDestinations, advertisingDestinations: advertisingDestinations, functionalDestinations: functionalDestinations };
}
var Container = function (props) {
    var _a = react_1.default.useState(false), isDialogOpen = _a[0], toggleDialog = _a[1];
    var _b = react_1.default.useState(true), showBanner = _b[0], toggleBanner = _b[1];
    var _c = react_1.default.useState(false), isCancelling = _c[0], toggleCancel = _c[1];
    var banner = react_1.default.useRef(null);
    var preferenceDialog = react_1.default.useRef(null);
    var cancelDialog = react_1.default.useRef(null);
    var _d = normalizeDestinations(props.destinations), marketingDestinations = _d.marketingDestinations, advertisingDestinations = _d.advertisingDestinations, functionalDestinations = _d.functionalDestinations;
    var handleBodyClick = function (e) {
        // Do nothing if no new implicit consent needs to be saved
        if (!props.isConsentRequired ||
            !props.implyConsentOnInteraction ||
            props.newDestinations.length === 0) {
            return;
        }
        // Ignore propogated clicks from inside the consent manager
        if ((banner.current && banner.current.contains(e.target)) ||
            (preferenceDialog.current && preferenceDialog.current.contains(e.target)) ||
            (cancelDialog.current && cancelDialog.current.contains(e.target))) {
            return;
        }
        props.saveConsent(undefined, false);
    };
    var showDialog = function () { return toggleDialog(true); };
    react_1.default.useEffect(function () {
        emitter.on('openDialog', showDialog);
        if (props.isConsentRequired && props.implyConsentOnInteraction) {
            document.body.addEventListener('click', handleBodyClick, false);
        }
        return function () {
            emitter.removeListener('openDialog', showDialog);
            document.body.removeEventListener('click', handleBodyClick, false);
        };
    });
    var onClose = function () {
        if (props.closeBehavior === undefined || props.closeBehavior === "dismiss" /* DISMISS */) {
            return toggleBanner(false);
        }
        if (props.closeBehavior === "accept" /* ACCEPT */) {
            return props.saveConsent();
        }
        if (props.closeBehavior === "deny" /* DENY */) {
            var falsePreferences = Object.keys(props.preferences).reduce(function (acc, category) {
                acc[category] = false;
                return acc;
            }, {});
            props.setPreferences(falsePreferences);
            return props.saveConsent();
        }
        // closeBehavior is a custom function
        var customClosePreferences = props.closeBehavior(props.preferences);
        props.setPreferences(customClosePreferences);
        props.saveConsent();
        return toggleBanner(false);
    };
    var handleCategoryChange = function (category, value) {
        var _a;
        props.setPreferences((_a = {},
            _a[category] = value,
            _a));
    };
    var handleSave = function () {
        toggleDialog(false);
        props.saveConsent();
    };
    var handleCancel = function () {
        toggleDialog(false);
        // Only show the cancel confirmation if there's unconsented destinations
        if (props.newDestinations.length > 0) {
            toggleCancel(true);
        }
        else {
            props.resetPreferences();
        }
    };
    var handleCancelBack = function () {
        toggleDialog(true);
        toggleCancel(false);
    };
    var handleCancelConfirm = function () {
        toggleCancel(false);
        props.resetPreferences();
    };
    return (react_1.default.createElement("div", null,
        showBanner && props.isConsentRequired && props.newDestinations.length > 0 && (react_1.default.createElement(banner_1.default, { innerRef: function (current) { return (banner = { current: current }); }, onClose: onClose, onChangePreferences: function () { return toggleDialog(true); }, content: props.bannerContent, subContent: props.bannerSubContent, textColor: props.bannerTextColor, backgroundColor: props.bannerBackgroundColor })),
        isDialogOpen && (react_1.default.createElement(preference_dialog_1.default, { customCategories: props.customCategories, destinations: props.destinations, preferences: props.preferences, innerRef: function (current) { return (preferenceDialog = { current: current }); }, onCancel: handleCancel, onSave: handleSave, onChange: handleCategoryChange, marketingDestinations: marketingDestinations, advertisingDestinations: advertisingDestinations, functionalDestinations: functionalDestinations, marketingAndAnalytics: props.preferences.marketingAndAnalytics, advertising: props.preferences.advertising, functional: props.preferences.functional, title: props.preferencesDialogTitle, content: props.preferencesDialogContent })),
        isCancelling && (react_1.default.createElement(cancel_dialog_1.default, { innerRef: function (current) { return (cancelDialog = { current: current }); }, onBack: handleCancelBack, onConfirm: handleCancelConfirm, title: props.cancelDialogTitle, content: props.cancelDialogContent }))));
};
exports.default = Container;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci9jb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQWlDO0FBQ2pDLGdEQUF5QjtBQUN6QixvREFBNkI7QUFDN0IsMEVBQWtEO0FBQ2xELGtFQUEwQztBQUMxQywyQ0FBNEU7QUFHNUUsSUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBWSxFQUFFLENBQUE7QUFDbEMsU0FBZ0IsVUFBVTtJQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQzVCLENBQUM7QUFGRCxnQ0FFQztBQWlDRCxTQUFTLHFCQUFxQixDQUFDLFlBQTJCO0lBQ3hELElBQU0scUJBQXFCLEdBQWtCLEVBQUUsQ0FBQTtJQUMvQyxJQUFNLHVCQUF1QixHQUFrQixFQUFFLENBQUE7SUFDakQsSUFBTSxzQkFBc0IsR0FBa0IsRUFBRSxDQUFBOzRCQUVyQyxXQUFXO1FBQ3BCLElBQUksbUNBQXNCLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQTFCLENBQTBCLENBQUMsRUFBRTtZQUNoRSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7U0FDMUM7YUFBTSxJQUFJLGtDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxXQUFXLENBQUMsUUFBUSxFQUExQixDQUEwQixDQUFDLEVBQUU7WUFDdEUsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ3pDO2FBQU07WUFDTCx3QkFBd0I7WUFDeEIscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ3hDOztJQVJILEtBQTBCLFVBQVksRUFBWiw2QkFBWSxFQUFaLDBCQUFZLEVBQVosSUFBWTtRQUFqQyxJQUFNLFdB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