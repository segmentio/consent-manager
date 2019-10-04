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
import ConsentManagerBuilder from '../consent-manager-builder';
import Container from './container';
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories';
var initialPreferences = {
    marketingAndAnalytics: null,
    advertising: null,
    functional: null
};
var ConsentManager = /** @class */ (function (_super) {
    __extends(ConsentManager, _super);
    function ConsentManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMapCustomPreferences = function (_a) {
            var destinations = _a.destinations, preferences = _a.preferences;
            var destinationPreferences = {};
            var customPreferences = {};
            // Default unset preferences to true (for implicit consent)
            for (var _i = 0, _b = Object.keys(preferences); _i < _b.length; _i++) {
                var preferenceName = _b[_i];
                var value = preferences[preferenceName];
                if (typeof value === 'boolean') {
                    customPreferences[preferenceName] = value;
                }
                else {
                    customPreferences[preferenceName] = true;
                }
            }
            var _loop_1 = function (destination) {
                if (ADVERTISING_CATEGORIES.find(function (c) { return c === destination.category; })) {
                    destinationPreferences[destination.id] = customPreferences.advertising;
                }
                else if (FUNCTIONAL_CATEGORIES.find(function (c) { return c === destination.category; })) {
                    destinationPreferences[destination.id] = customPreferences.functional;
                }
                else {
                    // Fallback to marketing
                    destinationPreferences[destination.id] =
                        customPreferences.marketingAndAnalytics;
                }
            };
            for (var _c = 0, destinations_1 = destinations; _c < destinations_1.length; _c++) {
                var destination = destinations_1[_c];
                _loop_1(destination);
            }
            return { destinationPreferences: destinationPreferences, customPreferences: customPreferences };
        };
        return _this;
    }
    ConsentManager.prototype.render = function () {
        var _a = this.props, writeKey = _a.writeKey, otherWriteKeys = _a.otherWriteKeys, shouldRequireConsent = _a.shouldRequireConsent, implyConsentOnInteraction = _a.implyConsentOnInteraction, cookieDomain = _a.cookieDomain, bannerContent = _a.bannerContent, bannerSubContent = _a.bannerSubContent, bannerTextColor = _a.bannerTextColor, bannerBackgroundColor = _a.bannerBackgroundColor, preferencesDialogTitle = _a.preferencesDialogTitle, preferencesDialogContent = _a.preferencesDialogContent, cancelDialogTitle = _a.cancelDialogTitle, cancelDialogContent = _a.cancelDialogContent, onError = _a.onError;
        return (React.createElement(ConsentManagerBuilder, { onError: onError, writeKey: writeKey, otherWriteKeys: otherWriteKeys, shouldRequireConsent: shouldRequireConsent, cookieDomain: cookieDomain, initialPreferences: initialPreferences, mapCustomPreferences: this.handleMapCustomPreferences }, function (_a) {
            var destinations = _a.destinations, newDestinations = _a.newDestinations, preferences = _a.preferences, isConsentRequired = _a.isConsentRequired, setPreferences = _a.setPreferences, resetPreferences = _a.resetPreferences, saveConsent = _a.saveConsent;
            return (React.createElement(Container, { destinations: destinations, newDestinations: newDestinations, preferences: preferences, isConsentRequired: isConsentRequired, setPreferences: setPreferences, resetPreferences: resetPreferences, saveConsent: saveConsent, implyConsentOnInteraction: implyConsentOnInteraction, bannerContent: bannerContent, bannerSubContent: bannerSubContent, bannerTextColor: bannerTextColor, bannerBackgroundColor: bannerBackgroundColor, preferencesDialogTitle: preferencesDialogTitle, preferencesDialogContent: preferencesDialogContent, cancelDialogTitle: cancelDialogTitle, cancelDialogContent: cancelDialogContent }));
        }));
    };
    ConsentManager.displayName = 'ConsentManager';
    ConsentManager.propTypes = {
        writeKey: PropTypes.string.isRequired,
        otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
        shouldRequireConsent: PropTypes.func,
        implyConsentOnInteraction: PropTypes.bool,
        cookieDomain: PropTypes.string,
        bannerContent: PropTypes.node.isRequired,
        bannerSubContent: PropTypes.string,
        bannerTextColor: PropTypes.string,
        bannerBackgroundColor: PropTypes.string,
        preferencesDialogTitle: PropTypes.node,
        preferencesDialogContent: PropTypes.node.isRequired,
        onError: PropTypes.func,
        cancelDialogTitle: PropTypes.node,
        cancelDialogContent: PropTypes.node.isRequired
    };
    ConsentManager.defaultProps = {
        otherWriteKeys: [],
        shouldRequireConsent: function () { return true; },
        implyConsentOnInteraction: true,
        onError: undefined,
        cookieDomain: undefined,
        bannerTextColor: '#fff',
        bannerSubContent: 'You can change your preferences at any time.',
        bannerBackgroundColor: '#1f4160',
        preferencesDialogTitle: 'Website Data Collection Preferences',
        cancelDialogTitle: 'Are you sure you want to cancel?'
    };
    return ConsentManager;
}(PureComponent));
export default ConsentManager;
//# sourceMappingURL=index.js.map