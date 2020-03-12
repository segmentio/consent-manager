export default function conditionallyLoadAnalytics(_a) {
    var writeKey = _a.writeKey, destinations = _a.destinations, destinationPreferences = _a.destinationPreferences, isConsentRequired = _a.isConsentRequired, _b = _a.shouldReload, shouldReload = _b === void 0 ? true : _b;
    var wd = window;
    var integrations = { All: false, 'Segment.io': true };
    var isAnythingEnabled = false;
    if (!destinationPreferences) {
        if (isConsentRequired) {
            return;
        }
        // Load a.js normally when consent isn't required and there's no preferences
        if (!wd.analytics.initialized) {
            wd.analytics.load(writeKey);
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
    if (wd.analytics && wd.analytics.initialized) {
        if (shouldReload) {
            window.location.reload();
        }
        return;
    }
    // Don't load a.js at all if nothing has been enabled
    if (isAnythingEnabled) {
        wd.analytics.load(writeKey, { integrations: integrations });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci1idWlsZGVyL2FuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxNQUFNLENBQUMsT0FBTyxVQUFVLDBCQUEwQixDQUFDLEVBTWpDO1FBTGhCLHNCQUFRLEVBQ1IsOEJBQVksRUFDWixrREFBc0IsRUFDdEIsd0NBQWlCLEVBQ2pCLG9CQUFtQixFQUFuQix3Q0FBbUI7SUFFbkIsSUFBTSxFQUFFLEdBQUcsTUFBdUIsQ0FBQTtJQUNsQyxJQUFNLFlBQVksR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFBO0lBQ3ZELElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFBO0lBRTdCLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtRQUMzQixJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLE9BQU07U0FDUDtRQUVELDRFQUE0RTtRQUM1RSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDN0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDNUI7UUFDRCxPQUFNO0tBQ1A7SUFFRCxLQUEwQixVQUFZLEVBQVosNkJBQVksRUFBWiwwQkFBWSxFQUFaLElBQVksRUFBRTtRQUFuQyxJQUFNLFdBQVcscUJBQUE7UUFDcEIsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksU0FBUyxFQUFFO1lBQ2IsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO1NBQ3pCO1FBQ0QsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUE7S0FDekM7SUFFRCx3RUFBd0U7SUFDeEUsNkNBQTZDO0lBQzdDLElBQUksRUFBRSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUM1QyxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQ3pCO1FBQ0QsT0FBTTtLQUNQO0lBRUQscURBQXFEO0lBQ3JELElBQUksaUJBQWlCLEVBQUU7UUFDckIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxDQUFBO0tBQzlDO0FBQ0gsQ0FBQyJ9