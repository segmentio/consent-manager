"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: remove duplicate cookie library from bundle
var js_cookie_1 = __importDefault(require("js-cookie"));
var top_domain_1 = __importDefault(require("@segment/top-domain"));
var events_1 = require("events");
var COOKIE_KEY = 'tracking-preferences';
// TODO: Make cookie expiration configurable
var COOKIE_EXPIRES = 365;
// TODO: harden against invalid cookies
// TODO: harden against different versions of cookies
function loadPreferences() {
    var preferences = js_cookie_1.default.getJSON(COOKIE_KEY);
    if (!preferences) {
        return {};
    }
    return {
        destinationPreferences: preferences.destinations,
        customPreferences: preferences.custom
    };
}
exports.loadPreferences = loadPreferences;
var emitter = new events_1.EventEmitter();
/**
 * Subscribes to consent preferences changing over time and returns
 * a cleanup function that can be invoked to remove the instantiated listener.
 *
 * @param listener a function to be invoked when ConsentPreferences are saved
 */
function onPreferencesSaved(listener) {
    emitter.on('preferencesSaved', listener);
    return function () { return emitter.off('preferencesSaved', listener); };
}
exports.onPreferencesSaved = onPreferencesSaved;
function savePreferences(_a) {
    var destinationPreferences = _a.destinationPreferences, customPreferences = _a.customPreferences, cookieDomain = _a.cookieDomain;
    var wd = window;
    if (wd.analytics) {
        wd.analytics.identify({
            destinationTrackingPreferences: destinationPreferences,
            customTrackingPreferences: customPreferences
        });
    }
    var domain = cookieDomain || top_domain_1.default(window.location.href);
    var value = {
        version: 1,
        destinations: destinationPreferences,
        custom: customPreferences
    };
    js_cookie_1.default.set(COOKIE_KEY, value, {
        expires: COOKIE_EXPIRES,
        domain: domain
    });
    emitter.emit('preferencesSaved', {
        destinationPreferences: destinationPreferences,
        customPreferences: customPreferences
    });
}
exports.savePreferences = savePreferences;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvcHJlZmVyZW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBb0Q7QUFDcEQsd0RBQStCO0FBQy9CLG1FQUEyQztBQUUzQyxpQ0FBcUM7QUFFckMsSUFBTSxVQUFVLEdBQUcsc0JBQXNCLENBQUE7QUFDekMsNENBQTRDO0FBQzVDLElBQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQTtBQVExQix1Q0FBdUM7QUFDdkMscURBQXFEO0FBQ3JELFNBQWdCLGVBQWU7SUFDN0IsSUFBTSxXQUFXLEdBQUcsbUJBQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7SUFFL0MsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsT0FBTztRQUNMLHNCQUFzQixFQUFFLFdBQVcsQ0FBQyxZQUFtQztRQUN2RSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsTUFBNkI7S0FDN0QsQ0FBQTtBQUNILENBQUM7QUFYRCwwQ0FXQztBQUlELElBQU0sT0FBTyxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFBO0FBRWxDOzs7OztHQUtHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsUUFBc0M7SUFDdkUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4QyxPQUFPLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxFQUF6QyxDQUF5QyxDQUFBO0FBQ3hELENBQUM7QUFIRCxnREFHQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxFQUlkO1FBSGhCLGtEQUFzQixFQUN0Qix3Q0FBaUIsRUFDakIsOEJBQVk7SUFFWixJQUFNLEVBQUUsR0FBRyxNQUF1QixDQUFBO0lBRWxDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRTtRQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNwQiw4QkFBOEIsRUFBRSxzQkFBc0I7WUFDdEQseUJBQXlCLEVBQUUsaUJBQWlCO1NBQzdDLENBQUMsQ0FBQTtLQUNIO0lBRUQsSUFBTSxNQUFNLEdBQUcsWUFBWSxJQUFJLG9CQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5RCxJQUFNLEtBQUssR0FBRztRQUNaLE9BQU8sRUFBRSxDQUFDO1FBQ1YsWUFBWSxFQUFFLHNCQUFzQjtRQUNwQyxNQUFNLEVBQUUsaUJBQWlCO0tBQzFCLENBQUE7SUFFRCxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFO1FBQzdCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLE1BQU0sUUFBQTtLQUNQLENBQUMsQ0FBQTtJQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDL0Isc0JBQXNCLHdCQUFBO1FBQ3RCLGlCQUFpQixtQkFBQTtLQUNsQixDQUFDLENBQUE7QUFDSixDQUFDO0FBOUJELDBDQThCQyJ9