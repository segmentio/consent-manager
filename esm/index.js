import CMB from './consent-manager-builder';
import CM from './consent-manager';
export { openDialog as openConsentManager } from './consent-manager/container';
export { loadPreferences, savePreferences, onPreferencesSaved } from './consent-manager-builder/preferences';
export var ConsentManagerBuilder = CMB;
export var ConsentManager = CM;
export function doNotTrack() {
    if (typeof window !== 'undefined' && (window.navigator || navigator)) {
        var nav = navigator;
        var doNotTrackValue = nav.doNotTrack || window.doNotTrack || nav.msDoNotTrack;
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
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sMkJBQTJCLENBQUE7QUFDM0MsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFbEMsT0FBTyxFQUFFLFVBQVUsSUFBSSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQzlFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsZUFBZSxFQUNmLGtCQUFrQixFQUNuQixNQUFNLHVDQUF1QyxDQUFBO0FBRTlDLE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQTtBQUN4QyxNQUFNLENBQUMsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFBO0FBTWhDLE1BQU0sVUFBVSxVQUFVO0lBRXhCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsRUFBRTtRQUNwRSxJQUFNLEdBQUcsR0FBRyxTQUFnQixDQUFBO1FBRTVCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFBO1FBRTdFLHlCQUF5QjtRQUN6Qix3RUFBd0U7UUFDeEUsSUFBSSxlQUFlLEtBQUssS0FBSyxFQUFFO1lBQzdCLGVBQWUsR0FBRyxHQUFHLENBQUE7U0FDdEI7YUFBTSxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDbkMsZUFBZSxHQUFHLEdBQUcsQ0FBQTtTQUN0QjtRQUVELElBQUksZUFBZSxLQUFLLEdBQUcsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsSUFBSSxlQUFlLEtBQUssR0FBRyxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFBO1NBQ2I7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyJ9