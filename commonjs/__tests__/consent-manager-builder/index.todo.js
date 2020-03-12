"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var enzyme_1 = require("enzyme");
var nock_1 = __importDefault(require("nock"));
var sinon_1 = __importDefault(require("sinon"));
var consent_manager_builder_1 = __importDefault(require("../../consent-manager-builder"));
describe('ConsentManagerBuilder', function () {
    beforeEach(function () {
        document = {};
        window = {};
    });
    test.todo('doesn՚t load analytics.js when consent is required');
    test('provides a list of enabled destinations', function (done) {
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Google Analytics',
                creationName: 'Google Analytics'
            },
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ])
            .get('/v1/projects/abc/integrations')
            .reply(200, [
            {
                name: 'FullStory',
                creationName: 'FullStory'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123", otherWriteKeys: ['abc'] }, function (_a) {
            var destinations = _a.destinations;
            expect(destinations).toMatchObject([
                {
                    id: 'Amplitude',
                    name: 'Amplitude'
                },
                {
                    id: 'FullStory',
                    name: 'FullStory'
                },
                {
                    id: 'Google Analytics',
                    name: 'Google Analytics'
                }
            ]);
            done();
        }));
    });
    test('provides a list of newly added destinations', function (done) {
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}';
        window.analytics = { load: function () { } };
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Google Analytics',
                creationName: 'Google Analytics'
            },
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123" }, function (_a) {
            var newDestinations = _a.newDestinations;
            expect(newDestinations).toMatchObject([
                {
                    name: 'Google Analytics',
                    id: 'Google Analytics'
                }
            ]);
            done();
        }));
    });
    test('loads analytics.js with the user՚s preferences', function (done) {
        var ajsLoad = sinon_1.default.spy();
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}';
        window.analytics = { load: ajsLoad };
        var writeKey = '123';
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: writeKey }, function () {
            expect(ajsLoad.calledOnce).toBe(true);
            expect(ajsLoad.args[0][0]).toBe(writeKey);
            expect(ajsLoad.args[0][1]).toMatchObject({
                integrations: {
                    All: false,
                    Amplitude: true,
                    'Segment.io': true
                }
            });
            done();
        }));
    });
    test('provides an object containing the WIP preferences', function (done) {
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}';
        window.analytics = { load: function () { } };
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123" }, function (_a) {
            var preferences = _a.preferences;
            expect(preferences).toMatchObject({
                Amplitude: true
            });
            done();
        }));
    });
    test('does not imply consent on interacation', function (done) {
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123" }, function (_a) {
            var preferences = _a.preferences;
            expect(preferences).toMatchObject({});
            done();
        }));
    });
    test.todo('loads analytics.js normally when consent isn՚t required');
    test.todo('still applies preferences when consent isn՚t required');
    test.todo('provides a setPreferences() function for setting the preferences');
    test.todo('setPreferences() function can be passed a boolean to set all preferences');
    test.todo('provides a resetPreferences() function for resetting the preferences');
    test.todo('provides a saveConsent() function for persisting the preferences and loading analytics.js');
    test.todo('saveConsent() can be passed additional preferences to persist');
    test.todo('saveConsent() can be passed a boolean to set all preferences');
    test.todo('saveConsent() fills in missing preferences');
    test.todo('initialPreferences sets the initial preferences');
    test.todo('loads custom preferences');
    test.todo('saveConsent() maps custom preferences to destination preferences');
    test.todo('mapCustomPreferences allows customPreferences to be updated');
    test.todo('saveConsent() saves custom preferences');
    test.todo('cookieDomain sets the cookie domain');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvaW5kZXgudG9kby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF5QjtBQUN6QixpQ0FBZ0M7QUFDaEMsOENBQXVCO0FBQ3ZCLGdEQUF5QjtBQUN6QiwwRkFBaUU7QUFFakUsUUFBUSxDQUFDLHVCQUF1QixFQUFFO0lBQ2hDLFVBQVUsQ0FBQztRQUNULFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2IsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxDQUFDLENBQUE7SUFFL0QsSUFBSSxDQUFDLHlDQUF5QyxFQUFFLFVBQUEsSUFBSTtRQUNsRCxjQUFJLENBQUMseUJBQXlCLENBQUM7YUFDNUIsR0FBRyxDQUFDLCtCQUErQixDQUFDO2FBQ3BDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixZQUFZLEVBQUUsa0JBQWtCO2FBQ2pDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFlBQVksRUFBRSxXQUFXO2FBQzFCO1NBQ0YsQ0FBQzthQUNELEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzthQUNwQyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFlBQVksRUFBRSxXQUFXO2FBQzFCO1NBQ0YsQ0FBQyxDQUFBO1FBRUosZ0JBQU8sQ0FDTCw4QkFBQyxpQ0FBcUIsSUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUMxRCxVQUFDLEVBQWdCO2dCQUFkLDhCQUFZO1lBQ2QsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FBQztnQkFDakM7b0JBQ0Us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