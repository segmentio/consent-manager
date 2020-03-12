import { URL } from 'url';
import sinon from 'sinon';
import { loadPreferences, savePreferences } from '../../consent-manager-builder/preferences';
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
                    return new URL('http://localhost/');
                }
                return;
            }
        };
    });
    test('loadPreferences() returns preferences when cookie exists', function () {
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22functional%22:true}}';
        expect(loadPreferences()).toMatchObject({
            destinationPreferences: {
                Amplitude: true
            },
            customPreferences: {
                functional: true
            }
        });
    });
    test('savePreferences() saves the preferences', function () {
        var ajsIdentify = sinon.spy();
        // @ts-ignore
        window.analytics = { identify: ajsIdentify };
        document.cookie = '';
        var destinationPreferences = {
            Amplitude: true
        };
        var customPreferences = {
            functional: true
        };
        savePreferences({
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
        var ajsIdentify = sinon.spy();
        // @ts-ignore
        window.analytics = { identify: ajsIdentify };
        document.cookie = '';
        var destinationPreferences = {
            Amplitude: true
        };
        savePreferences({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvcHJlZmVyZW5jZXMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sS0FBSyxDQUFBO0FBQ3pCLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFBO0FBRTVGLFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDdEIsVUFBVSxDQUFDO1FBQ1QsTUFBTSxHQUFHO1lBQ1AsUUFBUSxFQUFFO2dCQUNSLElBQUksRUFBRSxtQkFBbUI7YUFDMUI7U0FDNEIsQ0FBQTtRQUUvQixRQUFRLEdBQUc7WUFDVCxhQUFhLEVBQWIsVUFBYyxJQUFZO2dCQUN4QixJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7b0JBQ2hCLE9BQU8sSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtpQkFDcEM7Z0JBRUQsT0FBTTtZQUNSLENBQUM7U0FDVSxDQUFBO0lBQ2YsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsMERBQTBELEVBQUU7UUFDL0QsUUFBUSxDQUFDLE1BQU07WUFDYiwySEFBMkgsQ0FBQTtRQUU3SCxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDdEMsc0JBQXNCLEVBQUU7Z0JBQ3RCLFNBQVMsRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2pCLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMseUNBQXlDLEVBQUU7UUFDOUMsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBRS9CLGFBQWE7UUFDYixNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFBO1FBQzVDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBRXBCLElBQU0sc0JBQXNCLEdBQUc7WUFDN0IsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQTtRQUNELElBQU0saUJBQWlCLEdBQUc7WUFDeEIsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQTtRQUVELGVBQWUsQ0FBQztZQUNkLHNCQUFzQix3QkFBQTtZQUN0QixpQkFBaUIsbUJBQUE7WUFDakIsWUFBWSxFQUFFLFNBQVM7U0FDeEIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDekMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDM0MsOEJBQThCLEVBQUUsc0JBQXNCO1lBQ3RELHlCQUF5QixFQUFFLGlCQUFpQjtTQUM3QyxDQUFDLENBQUE7UUFFRixNQUFNLENBQ0osUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ3RCLDJIQUEySCxDQUM1SCxDQUNGLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2QsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsMENBQTBDLEVBQUU7UUFDL0MsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQy9CLGFBQWE7UUFDYixNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFBO1FBQzVDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBRXBCLElBQU0sc0JBQXNCLEdBQUc7WUFDN0IsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQTtRQUVELGVBQWUsQ0FBQztZQUNkLHNCQUFzQix3QkFBQTtZQUN0QixpQkFBaUIsRUFBRSxTQUFTO1lBQzVCLFlBQVksRUFBRSxhQUFhO1NBQzVCLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3pDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQzNDLDhCQUE4QixFQUFFLHNCQUFzQjtZQUN0RCx5QkFBeUIsRUFBRSxTQUFTO1NBQ3JDLENBQUMsQ0FBQTtRQUVGLDhCQUE4QjtRQUM5QixvRUFBb0U7SUFDdEUsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9