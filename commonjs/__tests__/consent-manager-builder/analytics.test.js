"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = __importDefault(require("sinon"));
var analytics_1 = __importDefault(require("../../consent-manager-builder/analytics"));
describe('analytics', function () {
    var wd;
    beforeEach(function () {
        window = {};
        wd = window;
    });
    test('loads analytics.js with preferences', function () {
        var ajsLoad = sinon_1.default.spy();
        wd.analytics = { load: ajsLoad };
        var writeKey = '123';
        var destinations = [{ id: 'Amplitude' }];
        var destinationPreferences = {
            Amplitude: true
        };
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: true
        });
        expect(ajsLoad.calledOnce).toBe(true);
        expect(ajsLoad.args[0][0]).toBe(writeKey);
        expect(ajsLoad.args[0][1]).toMatchObject({
            integrations: {
                All: false,
                Amplitude: true,
                'Segment.io': true
            }
        });
    });
    test('doesn՚t load analytics.js when there are no preferences', function () {
        var ajsLoad = sinon_1.default.spy();
        wd.analytics = { load: ajsLoad };
        var writeKey = '123';
        var destinations = [{ id: 'Amplitude' }];
        var destinationPreferences = null;
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: true
        });
        expect(ajsLoad.notCalled).toBe(true);
    });
    test('doesn՚t load analytics.js when all preferences are false', function () {
        var ajsLoad = sinon_1.default.spy();
        wd.analytics = { load: ajsLoad };
        var writeKey = '123';
        var destinations = [{ id: 'Amplitude' }];
        var destinationPreferences = {
            Amplitude: false
        };
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: true
        });
        expect(ajsLoad.notCalled).toBe(true);
    });
    test('reloads the page when analytics.js has already been initialised', function () {
        wd.analytics = {
            load: function () {
                this.initialized = true;
            }
        };
        jest.spyOn(window.location, 'reload');
        var writeKey = '123';
        var destinations = [{ id: 'Amplitude' }];
        var destinationPreferences = {
            Amplitude: true
        };
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: true
        });
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: true
        });
        expect(window.location.reload).toHaveBeenCalled();
    });
    test('should allow the reload behvaiour to be disabled', function () {
        var reload = sinon_1.default.spy();
        wd.analytics = {
            load: function () {
                this.initialized = true;
            }
        };
        wd.location = { reload: reload };
        var writeKey = '123';
        var destinations = [{ id: 'Amplitude' }];
        var destinationPreferences = {
            Amplitude: true
        };
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: true
        });
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: true,
            shouldReload: false
        });
        expect(reload.calledOnce).toBe(false);
    });
    test('loads analytics.js normally when consent isn՚t required', function () {
        var ajsLoad = sinon_1.default.spy();
        wd.analytics = { load: ajsLoad };
        var writeKey = '123';
        var destinations = [{ id: 'Amplitude' }];
        var destinationPreferences = null;
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: false
        });
        expect(ajsLoad.calledOnce).toBe(true);
        expect(ajsLoad.args[0][0]).toBe(writeKey);
        expect(ajsLoad.args[0][1]).toBeUndefined();
    });
    test('still applies preferences when consent isn՚t required', function () {
        var ajsLoad = sinon_1.default.spy();
        wd.analytics = { load: ajsLoad };
        var writeKey = '123';
        var destinations = [{ id: 'Amplitude' }];
        var destinationPreferences = {
            Amplitude: true
        };
        analytics_1.default({
            writeKey: writeKey,
            destinations: destinations,
            destinationPreferences: destinationPreferences,
            isConsentRequired: false
        });
        expect(ajsLoad.calledOnce).toBe(true);
        expect(ajsLoad.args[0][0]).toBe(writeKey);
        expect(ajsLoad.args[0][1]).toMatchObject({
            integrations: {
                All: false,
                Amplitude: true,
                'Segment.io': true
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvX190ZXN0c19fL2NvbnNlbnQtbWFuYWdlci1idWlsZGVyL2FuYWx5dGljcy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXlCO0FBRXpCLHNGQUFnRjtBQUVoRixRQUFRLENBQUMsV0FBVyxFQUFFO0lBQ3BCLElBQUksRUFBRSxDQUFBO0lBRU4sVUFBVSxDQUFDO1FBQ1QsTUFBTSxHQUFHLEVBQW1CLENBQUE7UUFDNUIsRUFBRSxHQUFHLE1BQU0sQ0FBQTtJQUNiLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLHFDQUFxQyxFQUFFO1FBQzFDLElBQU0sT0FBTyxHQUFHLGVBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUMzQixFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFBO1FBQ2hDLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQTtRQUN0QixJQUFNLFlBQVksR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBaUIsQ0FBQyxDQUFBO1FBQ3pELElBQU0sc0JBQXNCLEdBQUc7WUFDN0IsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQTtRQUVELG1CQUEwQixDQUFDO1lBQ3pCLFFBQVEsVUFBQTtZQUNSLFlBQVksY0FBQTtZQUNaLHNCQUFzQix3QkFBQTtZQUN0QixpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFD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