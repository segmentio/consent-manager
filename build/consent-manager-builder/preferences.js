// TODO: remove duplicate cookie library from bundle
import cookies from 'js-cookie';
import topDomain from '@segment/top-domain';
var COOKIE_KEY = 'tracking-preferences';
var COOKIE_EXPIRES = 365;
// TODO: harden against invalid cookies
export function loadPreferences() {
    var preferences = cookies.getJSON(COOKIE_KEY);
    if (!preferences) {
        return {};
    }
    return {
        destinationPreferences: preferences.destinations,
        customPreferences: preferences.custom
    };
}
export function savePreferences(_a) {
    var destinationPreferences = _a.destinationPreferences, customPreferences = _a.customPreferences, cookieDomain = _a.cookieDomain;
    window.analytics.identify({
        destinationTrackingPreferences: destinationPreferences,
        customTrackingPreferences: customPreferences
    });
    var domain = cookieDomain || topDomain(window.location.href);
    var value = {
        version: 1,
        destinations: destinationPreferences,
        custom: customPreferences
    };
    cookies.set(COOKIE_KEY, value, {
        expires: COOKIE_EXPIRES,
        domain: domain
    });
}
//# sourceMappingURL=preferences.js.map