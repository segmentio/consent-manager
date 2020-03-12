// TODO: remove duplicate cookie library from bundle
import cookies from 'js-cookie';
import topDomain from '@segment/top-domain';
import { EventEmitter } from 'events';
var COOKIE_KEY = 'tracking-preferences';
// TODO: Make cookie expiration configurable
var COOKIE_EXPIRES = 365;
// TODO: harden against invalid cookies
// TODO: harden against different versions of cookies
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
var emitter = new EventEmitter();
/**
 * Subscribes to consent preferences changing over time and returns
 * a cleanup function that can be invoked to remove the instantiated listener.
 *
 * @param listener a function to be invoked when ConsentPreferences are saved
 */
export function onPreferencesSaved(listener) {
    emitter.on('preferencesSaved', listener);
    return function () { return emitter.off('preferencesSaved', listener); };
}
export function savePreferences(_a) {
    var destinationPreferences = _a.destinationPreferences, customPreferences = _a.customPreferences, cookieDomain = _a.cookieDomain;
    var wd = window;
    if (wd.analytics) {
        wd.analytics.identify({
            destinationTrackingPreferences: destinationPreferences,
            customTrackingPreferences: customPreferences
        });
    }
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
    emitter.emit('preferencesSaved', {
        destinationPreferences: destinationPreferences,
        customPreferences: customPreferences
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvcHJlZmVyZW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0RBQW9EO0FBQ3BELE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQTtBQUMvQixPQUFPLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQTtBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRXJDLElBQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFBO0FBQ3pDLDRDQUE0QztBQUM1QyxJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUE7QUFRMUIsdUNBQXVDO0FBQ3ZDLHFEQUFxRDtBQUNyRCxNQUFNLFVBQVUsZUFBZTtJQUM3QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRS9DLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUE7S0FDVjtJQUVELE9BQU87UUFDTCxzQkFBc0IsRUFBRSxXQUFXLENBQUMsWUFBbUM7UUFDdkUsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLE1BQTZCO0tBQzdELENBQUE7QUFDSCxDQUFDO0FBSUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQTtBQUVsQzs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxRQUFzQztJQUN2RSxPQUFPLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3hDLE9BQU8sY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLEVBQXpDLENBQXlDLENBQUE7QUFDeEQsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsRUFJZDtRQUhoQixrREFBc0IsRUFDdEIsd0NBQWlCLEVBQ2pCLDhCQUFZO0lBRVosSUFBTSxFQUFFLEdBQUcsTUFBdUIsQ0FBQTtJQUVsQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUU7UUFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDcEIsOEJBQThCLEVBQUUsc0JBQXNCO1lBQ3RELHlCQUF5QixFQUFFLGlCQUFpQjtTQUM3QyxDQUFDLENBQUE7S0FDSDtJQUVELElBQU0sTUFBTSxHQUFHLFlBQVksSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5RCxJQUFNLEtBQUssR0FBRztRQUNaLE9BQU8sRUFBRSxDQUFDO1FBQ1YsWUFBWSxFQUFFLHNCQUFzQjtRQUNwQyxNQUFNLEVBQUUsaUJBQWlCO0tBQzFCLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUU7UUFDN0IsT0FBTyxFQUFFLGNBQWM7UUFDdkIsTUFBTSxRQUFBO0tBQ1AsQ0FBQyxDQUFBO0lBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUMvQixzQkFBc0Isd0JBQUE7UUFDdEIsaUJBQWlCLG1CQUFBO0tBQ2xCLENBQUMsQ0FBQTtBQUNKLENBQUMifQ==