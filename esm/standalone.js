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
import React from 'react';
import ReactDOM from 'react-dom';
import inEU from '@segment/in-eu';
import inRegions from '@segment/in-regions';
import { ConsentManager, openConsentManager, doNotTrack } from '.';
import * as preferences from './consent-manager-builder/preferences';
export var version = process.env.VERSION;
export { openConsentManager, doNotTrack, inEU, preferences };
var props = {};
var containerRef;
var localWindow = window;
if (localWindow.consentManagerConfig && typeof localWindow.consentManagerConfig === 'function') {
    props = localWindow.consentManagerConfig({
        React: React,
        version: version,
        openConsentManager: openConsentManager,
        doNotTrack: doNotTrack,
        inEU: inEU,
        preferences: preferences,
        inRegions: inRegions
    });
    containerRef = props.container;
}
else {
    throw new Error("window.consentManagerConfig should be a function");
}
if (!containerRef) {
    throw new Error('ConsentManager: container is required');
}
if (!props.writeKey) {
    throw new Error('ConsentManager: writeKey is required');
}
if (!props.bannerContent) {
    throw new Error('ConsentManager: bannerContent is required');
}
if (!props.preferencesDialogContent) {
    throw new Error('ConsentManager: preferencesDialogContent is required');
}
if (!props.cancelDialogContent) {
    throw new Error('ConsentManager: cancelDialogContent is required');
}
if (typeof props.implyConsentOnInteraction === 'string') {
    props.implyConsentOnInteraction = props.implyConsentOnInteraction === 'true';
}
if (props.closeBehavior !== undefined && typeof props.closeBehavior === 'string') {
    var options = [
        "accept" /* ACCEPT */.toString(),
        "deny" /* DENY */.toString(),
        "dismiss" /* DISMISS */.toString()
    ];
    if (!options.includes(props.closeBehavior)) {
        throw new Error("ConsentManager: closeBehavior should be one of " + options);
    }
}
var container = document.querySelector(containerRef);
if (!container) {
    throw new Error('ConsentManager: container not found');
}
ReactDOM.render(React.createElement(ConsentManager, __assign({}, props)), container);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhbG9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGFuZGFsb25lLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUN6QixPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUE7QUFDaEMsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUE7QUFDakMsT0FBTyxTQUFTLE1BQU0scUJBQXFCLENBQUE7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxHQUFHLENBQUE7QUFHbEUsT0FBTyxLQUFLLFdBQVcsTUFBTSx1Q0FBdUMsQ0FBQTtBQUVwRSxNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUE7QUFDMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUE7QUFFNUQsSUFBSSxLQUFLLEdBQWlDLEVBQUUsQ0FBQTtBQUM1QyxJQUFJLFlBQWdDLENBQUE7QUFFcEMsSUFBTSxXQUFXLEdBQUcsTUFBd0MsQ0FBQTtBQUU1RCxJQUFJLFdBQVcsQ0FBQyxvQkFBb0IsSUFBSSxPQUFPLFdBQVcsQ0FBQyxvQkFBb0IsS0FBSyxVQUFVLEVBQUU7SUFDOUYsS0FBSyxHQUFHLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztRQUN2QyxLQUFLLE9BQUE7UUFDTCxPQUFPLFNBQUE7UUFDUCxrQkFBa0Isb0JBQUE7UUFDbEIsVUFBVSxZQUFBO1FBQ1YsSUFBSSxNQUFBO1FBQ0osV0FBVyxhQUFBO1FBQ1gsU0FBUyxXQUFBO0tBQ1YsQ0FBQyxDQUFBO0lBQ0YsWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUE7Q0FDL0I7S0FBTTtJQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQTtDQUNwRTtBQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7SUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO0NBQ3pEO0FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7SUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO0NBQ3hEO0FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7SUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO0NBQzdEO0FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRTtJQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUE7Q0FDeEU7QUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFO0lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQTtDQUNuRTtBQUVELElBQUksT0FBTyxLQUFLLENBQUMseUJBQXlCLEtBQUssUUFBUSxFQUFFO0lBQ3ZELEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUMseUJBQXlCLEtBQUssTUFBTSxDQUFBO0NBQzdFO0FBRUQsSUFBSSxLQUFLLENBQUMsYUFBYSxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO0lBQ2hGLElBQU0sT0FBTyxHQUFHO1FBQ2Qsc0JBQXFCLFFBQVEsRUFBRTtRQUMvQixrQkFBbUIsUUFBUSxFQUFFO1FBQzdCLHdCQUFzQixRQUFRLEVBQUU7S0FDakMsQ0FBQTtJQUVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFrRCxPQUFTLENBQUMsQ0FBQTtLQUM3RTtDQUNGO0FBRUQsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUN0RCxJQUFJLENBQUMsU0FBUyxFQUFFO0lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO0NBQ3ZEO0FBRUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxjQUFjLGVBQU0sS0FBNkIsRUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBIn0=