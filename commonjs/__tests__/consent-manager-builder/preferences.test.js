"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var sinon_1 = __importDefault(require("sinon"));
var preferences_1 = require("../../consent-manager-builder/preferences");
describe('preferences', function () {
    beforeEach(function () {
        window = {
            location: {
                href: 'http://localhost/'
            }
        };
        document = {
            createElement: function (type) {
                if (type === 'a') {
                    return new url_1.URL('http://localhost/');
                }
                return;
            }
        };
    });
    test('loadPreferences() returns preferences when cookie exists', function () {
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22functional%22:true}}';
        expect(preferences_1.loadPreferences()).toMatchObject({
            destinationPreferences: {
                Amplitude: true
            },
            customPreferences: {
                functional: true
            }
        });
    });
    test('savePreferences() saves the preferences', function () {
        var ajsIdentify = sinon_1.default.spy();
        // @ts-ignore
        window.analytics = { identify: ajsIdentify };
        document.cookie = '';
        var destinationPreferences = {
            Amplitude: true
        };
        var customPreferences = {
            functional: true
        };
        preferences_1.savePreferences({
            destinationPreferences: destinationPreferences,
            customPreferences: customPreferences,
            cookieDomain: undefined
        });
        expect(ajsIdentify.calledOnce).toBe(true);
        expect(ajsIdentify.args[0][0]).toMatchObject({
            destinationTrackingPreferences: destinationPreferences,
            customTrackingPreferences: customPreferences
        });
        expect(document.cookie.includes('tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22functional%22:true}}')).toBe(true);
    });
    test('savePreferences() sets the cookie domain', function () {
        var ajsIdentify = sinon_1.default.spy();
        // @ts-ignore
        window.analytics = { identify: ajsIdentify };
        document.cookie = '';
        var destinationPreferences = {
            Amplitude: true
        };
        preferences_1.savePreferences({
            destinationPreferences: destinationPreferences,
            customPreferences: undefined,
            cookieDomain: 'example.com'
        });
        expect(ajsIdentify.calledOnce).toBe(true);
        expect(ajsIdentify.args[0][0]).toMatchObject({
            destinationTrackingPreferences: destinationPreferences,
            customTrackingPreferences: undefined
        });
        // TODO: actually check domain
        // expect(document.cookie.includes('domain=example.com')).toBe(true)
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvcHJlZmVyZW5jZXMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJCQUF5QjtBQUN6QixnREFBeUI7QUFDekIseUVBQTRGO0FBRTVGLFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDdEIsVUFBVSxDQUFDO1FBQ1QsTUFBTSxHQUFHO1lBQ1AsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxtQkFBbUI7YUFDMUI7U0FDNEIsQ0FBQTtRQUUvQixRQUFRLEdBQUc7WUFDVCxhQUFhLEVBQWIsVUFBYyxJQUFZO2dCQUN4QixJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7b0JBQ2hCLE9BQU8sSUFBSSxTQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtpQkFDcEM7Z0JBRUQsT0FBTTtZQUNSLENBQUM7U0FDVSxDQUFBO0lBQ2YsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsMERBQTBELEVBQUU7UUFDL0QsUUFBUSxDQUFDLE1BQU07WUFDYiwySEFBMkgsQ0FBQTtRQUU3SCxNQUFNLENBQUMsNkJBQWUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ3RDLHNCQUFzQixFQUFFO2dCQUN0QixTQUFTLEVBQUUsSUFBSTthQUNoQjtZQUNELGlCQUFpQixFQUFFO2dCQUNqQixVQUFVLEVBQUUsSUFBSTthQUNqQjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLHlDQUF5QyxFQUFFO1FBQzlDLElBQU0sV0FBVyxHQUFHLGVBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUUvQixhQUFhO1FBQ2IsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQTtRQUM1QyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUVwQixJQUFNLHNCQUFzQixHQUFHO1lBQzdCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUE7UUFDRCxJQUFNLGlCQUFpQixHQUFHO1lBQ3hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUE7UUFFRCw2QkFBZSxDQUFDO1lBQ2Qsc0JBQXNCLHdCQUFBO1lBQ3RCLGlCQUFpQixtQkFBQTtZQUNqQixZQUFZLEVBQUUsU0FBUztTQUN4QixDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUMzQyw4QkFBOEIsRUFBRSxzQkFBc0I7WUFDdEQseUJBQXlCLEVBQUUsaUJBQWlCO1NBQzdDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FDSixRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDdEIsMkhBQTJILENBQzVILENBQ0YsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDZCxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUksQ0FBQywwQ0FBMEMsRUFBRTtRQUMvQyxJQUFNLFdBQVcsR0FBRyxlQUFLLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDL0IsYUFBYTtRQUNiLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUE7UUFDNUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFFcEIsSUFBTSxzQkFBc0IsR0FBRztZQUM3QixTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFBO1FBRUQsNkJBQWUsQ0FBQztZQUNkLHNCQUFzQix3QkFBQTtZQUN0QixpQkFBaUIsRUFBRSxTQUFTO1lBQzVCLFlBQVksRUFBRSxhQUFhO1NBQzVCLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3pDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQzNDLDhCQUE4QixFQUFFLHNCQUFzQjtZQUN0RCx5QkFBeUIsRUFBRSxTQUFTO1NBQ3JDLENBQUMsQ0FBQTtRQUVGLDhCQUE4QjtRQUM5QixvRUFBb0U7SUFDdEUsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9