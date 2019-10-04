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
import EventEmitter from 'events';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Banner from './banner';
import PreferenceDialog from './preference-dialog';
import CancelDialog from './cancel-dialog';
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories';
var emitter = new EventEmitter();
export function openDialog() {
    emitter.emit('openDialog');
}
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isDialogOpen: false,
            isCancelling: false
        };
        _this.openDialog = function () {
            _this.setState({
                isDialogOpen: true
            });
        };
        _this.closeDialog = function () {
            _this.setState({
                isDialogOpen: false
            });
        };
        _this.handleBannerRef = function (node) {
            _this.banner = node;
        };
        _this.handlePreferenceDialogRef = function (node) {
            _this.preferenceDialog = node;
        };
        _this.handleCancelDialogRef = function (node) {
            _this.cancelDialog = node;
        };
        _this.handleBannerAccept = function () {
            var saveConsent = _this.props.saveConsent;
            saveConsent();
        };
        _this.handleBodyClick = function (e) {
            var _a = _this.props, newDestinations = _a.newDestinations, saveConsent = _a.saveConsent, isConsentRequired = _a.isConsentRequired, implyConsentOnInteraction = _a.implyConsentOnInteraction;
            // Do nothing if no new implicit consent needs to be saved
            if (!isConsentRequired ||
                !implyConsentOnInteraction ||
                newDestinations.length === 0) {
                return;
            }
            // Ignore propogated clicks from inside the consent manager
            if ((_this.banner && _this.banner.contains(e.target)) ||
                (_this.preferenceDialog && _this.preferenceDialog.contains(e.target)) ||
                (_this.cancelDialog && _this.cancelDialog.contains(e.target))) {
                return;
            }
            saveConsent(undefined, false);
        };
        _this.handleCategoryChange = function (category, value) {
            var _a;
            var setPreferences = _this.props.setPreferences;
            setPreferences((_a = {},
                _a[category] = value,
                _a));
        };
        _this.handleSave = function () {
            var saveConsent = _this.props.saveConsent;
            _this.setState({
                isDialogOpen: false
            });
            saveConsent();
        };
        _this.handleCancel = function () {
            var _a = _this.props, resetPreferences = _a.resetPreferences, newDestinations = _a.newDestinations;
            _this.setState({
                isDialogOpen: false
            });
            // Only show the cancel confirmation if there's unconsented destinations
            if (newDestinations.length > 0) {
                _this.setState({
                    isCancelling: true
                });
            }
            else {
                resetPreferences();
            }
        };
        _this.handleCancelBack = function () {
            _this.setState({
                isDialogOpen: true,
                isCancelling: false
            });
        };
        _this.handleCancelConfirm = function () {
            var resetPreferences = _this.props.resetPreferences;
            _this.setState({
                isCancelling: false
            });
            resetPreferences();
        };
        return _this;
    }
    Container.prototype.render = function () {
        var _a = this.props, destinations = _a.destinations, newDestinations = _a.newDestinations, preferences = _a.preferences, isConsentRequired = _a.isConsentRequired, bannerContent = _a.bannerContent, bannerSubContent = _a.bannerSubContent, bannerTextColor = _a.bannerTextColor, bannerBackgroundColor = _a.bannerBackgroundColor, preferencesDialogTitle = _a.preferencesDialogTitle, preferencesDialogContent = _a.preferencesDialogContent, cancelDialogTitle = _a.cancelDialogTitle, cancelDialogContent = _a.cancelDialogContent;
        var _b = this.state, isDialogOpen = _b.isDialogOpen, isCancelling = _b.isCancelling;
        var marketingDestinations = [];
        var advertisingDestinations = [];
        var functionalDestinations = [];
        var _loop_1 = function (destination) {
            if (ADVERTISING_CATEGORIES.find(function (c) { return c === destination.category; })) {
                advertisingDestinations.push(destination);
            }
            else if (FUNCTIONAL_CATEGORIES.find(function (c) { return c === destination.category; })) {
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
        // TODO: add state for banner so it doesn't disappear on implicit consent (which is annoying UX)
        return (React.createElement("div", null,
            isConsentRequired &&
                newDestinations.length > 0 && (React.createElement(Banner, { innerRef: this.handleBannerRef, onAccept: this.handleBannerAccept, onChangePreferences: this.openDialog, content: bannerContent, subContent: bannerSubContent, textColor: bannerTextColor, backgroundColor: bannerBackgroundColor })),
            isDialogOpen && (React.createElement(PreferenceDialog, { innerRef: this.handlePreferenceDialogRef, onCancel: this.handleCancel, onSave: this.handleSave, onChange: this.handleCategoryChange, marketingDestinations: marketingDestinations, advertisingDestinations: advertisingDestinations, functionalDestinations: functionalDestinations, marketingAndAnalytics: preferences.marketingAndAnalytics, advertising: preferences.advertising, functional: preferences.functional, title: preferencesDialogTitle, content: preferencesDialogContent })),
            isCancelling && (React.createElement(CancelDialog, { innerRef: this.handleCancelDialogRef, onBack: this.handleCancelBack, onConfirm: this.handleCancelConfirm, title: cancelDialogTitle, content: cancelDialogContent }))));
    };
    Container.prototype.componentDidMount = function () {
        var _a = this.props, isConsentRequired = _a.isConsentRequired, implyConsentOnInteraction = _a.implyConsentOnInteraction;
        emitter.on('openDialog', this.openDialog);
        if (isConsentRequired && implyConsentOnInteraction) {
            document.body.addEventListener('click', this.handleBodyClick, false);
        }
    };
    Container.prototype.componentWillUnmount = function () {
        emitter.removeListener('openDialog', this.openDialog);
        document.body.removeEventListener('click', this.handleBodyClick, false);
    };
    Container.displayName = 'Container';
    Container.propTypes = {
        setPreferences: PropTypes.func.isRequired,
        resetPreferences: PropTypes.func.isRequired,
        saveConsent: PropTypes.func.isRequired,
        destinations: PropTypes.arrayOf(PropTypes.object).isRequired,
        newDestinations: PropTypes.arrayOf(PropTypes.object).isRequired,
        preferences: PropTypes.object.isRequired,
        isConsentRequired: PropTypes.bool.isRequired,
        implyConsentOnInteraction: PropTypes.bool.isRequired,
        bannerContent: PropTypes.node.isRequired,
        bannerSubContent: PropTypes.string.isRequired,
        bannerTextColor: PropTypes.string.isRequired,
        bannerBackgroundColor: PropTypes.string.isRequired,
        preferencesDialogTitle: PropTypes.node.isRequired,
        preferencesDialogContent: PropTypes.node.isRequired,
        cancelDialogTitle: PropTypes.node.isRequired,
        cancelDialogContent: PropTypes.node.isRequired
    };
    return Container;
}(PureComponent));
export default Container;
//# sourceMappingURL=container.js.map