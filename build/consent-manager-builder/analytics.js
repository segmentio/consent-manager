export default function conditionallyLoadAnalytics(_a) {
    var writeKey = _a.writeKey, destinations = _a.destinations, destinationPreferences = _a.destinationPreferences, isConsentRequired = _a.isConsentRequired, _b = _a.shouldReload, shouldReload = _b === void 0 ? true : _b;
    var integrations = { All: false, 'Segment.io': true };
    var isAnythingEnabled = false;
    if (!destinationPreferences) {
        if (isConsentRequired) {
            return;
        }
        // Load a.js normally when consent isn't required and there's no preferences
        if (!window.analytics.initialized) {
            window.analytics.load(writeKey);
        }
        return;
    }
    for (var _i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
        var destination = destinations_1[_i];
        var isEnabled = Boolean(destinationPreferences[destination.id]);
        if (isEnabled) {
            isAnythingEnabled = true;
        }
        integrations[destination.id] = isEnabled;
    }
    // Reload the page if the trackers have already been initialised so that
    // the user's new preferences can take affect
    if (window.analytics.initialized) {
        if (shouldReload) {
            window.location.reload();
        }
        return;
    }
    // Don't load a.js at all if nothing has been enabled
    if (isAnythingEnabled) {
        window.analytics.load(writeKey, { integrations: integrations });
    }
}
//# sourceMappingURL=analytics.js.map