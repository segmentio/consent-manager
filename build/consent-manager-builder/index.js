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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Component } from 'react';
import PropTypes from 'prop-types';
import { loadPreferences, savePreferences } from './preferences';
import fetchDestinations from './fetch-destinations';
import conditionallyLoadAnalytics from './analytics';
function getNewDestinations(destinations, preferences) {
    var newDestinations = [];
    // If there are no preferences then all destinations are new
    if (!preferences) {
        return destinations;
    }
    for (var _i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
        var destination = destinations_1[_i];
        if (preferences[destination.id] === undefined) {
            newDestinations.push(destination);
        }
    }
    return newDestinations;
}
var ConsentManagerBuilder = /** @class */ (function (_super) {
    __extends(ConsentManagerBuilder, _super);
    function ConsentManagerBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isLoading: true,
            destinations: [],
            newDestinations: [],
            preferences: {},
            isConsentRequired: true
        };
        _this.initialise = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, writeKey, otherWriteKeys, shouldRequireConsent, initialPreferences, mapCustomPreferences, _b, destinationPreferences, customPreferences, _c, isConsentRequired, destinations, newDestinations, preferences;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.props, writeKey = _a.writeKey, otherWriteKeys = _a.otherWriteKeys, shouldRequireConsent = _a.shouldRequireConsent, initialPreferences = _a.initialPreferences, mapCustomPreferences = _a.mapCustomPreferences;
                        _b = loadPreferences(), destinationPreferences = _b.destinationPreferences, customPreferences = _b.customPreferences;
                        return [4 /*yield*/, Promise.all([
                                shouldRequireConsent(),
                                fetchDestinations(__spreadArrays([writeKey], otherWriteKeys))
                            ])];
                    case 1:
                        _c = _d.sent(), isConsentRequired = _c[0], destinations = _c[1];
                        newDestinations = getNewDestinations(destinations, destinationPreferences);
                        conditionallyLoadAnalytics({
                            writeKey: writeKey,
                            destinations: destinations,
                            destinationPreferences: destinationPreferences,
                            isConsentRequired: isConsentRequired
                        });
                        if (mapCustomPreferences) {
                            preferences = customPreferences || initialPreferences;
                        }
                        else {
                            preferences = destinationPreferences || initialPreferences;
                        }
                        this.setState({
                            isLoading: false,
                            destinations: destinations,
                            newDestinations: newDestinations,
                            preferences: preferences,
                            isConsentRequired: isConsentRequired
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.handleSetPreferences = function (newPreferences) {
            _this.setState(function (prevState) {
                var destinations = prevState.destinations, existingPreferences = prevState.preferences;
                var preferences = _this.mergePreferences({
                    destinations: destinations,
                    newPreferences: newPreferences,
                    existingPreferences: existingPreferences
                });
                return { preferences: preferences };
            });
        };
        _this.handleResetPreferences = function () {
            var _a = _this.props, initialPreferences = _a.initialPreferences, mapCustomPreferences = _a.mapCustomPreferences;
            var _b = loadPreferences(), destinationPreferences = _b.destinationPreferences, customPreferences = _b.customPreferences;
            var preferences;
            if (mapCustomPreferences) {
                preferences = customPreferences || initialPreferences;
            }
            else {
                preferences = destinationPreferences || initialPreferences;
            }
            _this.setState({ preferences: preferences });
        };
        _this.handleSaveConsent = function (newPreferences, shouldReload) {
            var _a = _this.props, writeKey = _a.writeKey, cookieDomain = _a.cookieDomain, mapCustomPreferences = _a.mapCustomPreferences;
            _this.setState(function (prevState) {
                var _a;
                var destinations = prevState.destinations, existingPreferences = prevState.preferences, isConsentRequired = prevState.isConsentRequired;
                var preferences = _this.mergePreferences({
                    destinations: destinations,
                    newPreferences: newPreferences,
                    existingPreferences: existingPreferences
                });
                var destinationPreferences;
                var customPreferences;
                if (mapCustomPreferences) {
                    ;
                    (_a = mapCustomPreferences({
                        destinations: destinations,
                        preferences: preferences
                    }), destinationPreferences = _a.destinationPreferences, customPreferences = _a.customPreferences);
                    if (customPreferences) {
                        // Allow the customPreferences to be updated from mapCustomPreferences
                        preferences = customPreferences;
                    }
                    else {
                        // Make returning the customPreferences from mapCustomPreferences optional
                        customPreferences = preferences;
                    }
                }
                else {
                    destinationPreferences = preferences;
                }
                var newDestinations = getNewDestinations(destinations, destinationPreferences);
                savePreferences({ destinationPreferences: destinationPreferences, customPreferences: customPreferences, cookieDomain: cookieDomain });
                conditionallyLoadAnalytics({
                    writeKey: writeKey,
                    destinations: destinations,
                    destinationPreferences: destinationPreferences,
                    isConsentRequired: isConsentRequired,
                    shouldReload: shouldReload
                });
                return { destinationPreferences: destinationPreferences, preferences: preferences, newDestinations: newDestinations };
            });
        };
        _this.mergePreferences = function (_a) {
            var destinations = _a.destinations, existingPreferences = _a.existingPreferences, newPreferences = _a.newPreferences;
            var preferences;
            if (typeof newPreferences === 'boolean') {
                var destinationPreferences = {};
                for (var _i = 0, destinations_2 = destinations; _i < destinations_2.length; _i++) {
                    var destination = destinations_2[_i];
                    destinationPreferences[destination.id] = newPreferences;
                }
                preferences = destinationPreferences;
            }
            else if (newPreferences) {
                preferences = __assign(__assign({}, existingPreferences), newPreferences);
            }
            else {
                preferences = existingPreferences;
            }
            return preferences;
        };
        return _this;
    }
    ConsentManagerBuilder.prototype.render = function () {
        var children = this.props.children;
        var _a = this.state, isLoading = _a.isLoading, destinations = _a.destinations, preferences = _a.preferences, newDestinations = _a.newDestinations, isConsentRequired = _a.isConsentRequired;
        if (isLoading) {
            return null;
        }
        return children({
            destinations: destinations,
            newDestinations: newDestinations,
            preferences: preferences,
            isConsentRequired: isConsentRequired,
            setPreferences: this.handleSetPreferences,
            resetPreferences: this.handleResetPreferences,
            saveConsent: this.handleSaveConsent
        });
    };
    ConsentManagerBuilder.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var onError, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onError = this.props.onError;
                        if (!(onError && typeof onError === 'function')) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.initialise()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        return [4 /*yield*/, onError(e_1)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.initialise();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ConsentManagerBuilder.displayName = 'ConsentManagerBuilder';
    ConsentManagerBuilder.propTypes = {
        children: PropTypes.func.isRequired,
        onError: PropTypes.func,
        writeKey: PropTypes.string.isRequired,
        otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
        shouldRequireConsent: PropTypes.func,
        initialPreferences: PropTypes.object,
        mapCustomPreferences: PropTypes.func,
        cookieDomain: PropTypes.string
    };
    ConsentManagerBuilder.defaultProps = {
        otherWriteKeys: [],
        onError: undefined,
        shouldRequireConsent: function () { return true; },
        initialPreferences: {},
        mapCustomPreferences: undefined,
        cookieDomain: undefined
    };
    return ConsentManagerBuilder;
}(Component));
export default ConsentManagerBuilder;
//# sourceMappingURL=index.js.map