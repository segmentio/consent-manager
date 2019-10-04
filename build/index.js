export { openDialog as openConsentManager } from './consent-manager/container';
export var ConsentManagerBuilder;
export var ConsentManagerBuilder;
export function doNotTrack() {
    var doNotTrackValue = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    // Normalise Firefox < 32
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
    if (doNotTrackValue === 'yes') {
        doNotTrackValue = '1';
    }
    else if (doNotTrackValue === 'no') {
        doNotTrackValue = '0';
    }
    if (doNotTrackValue === '1') {
        return true;
    }
    if (doNotTrackValue === '0') {
        return false;
    }
    return null;
}
//# sourceMappingURL=index.js.map