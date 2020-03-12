import React from 'react';
import { shallow } from 'enzyme';
import nock from 'nock';
import sinon from 'sinon';
import ConsentManagerBuilder from '../../consent-manager-builder';
describe('ConsentManagerBuilder', function () {
    beforeEach(function () {
        document = {};
        window = {};
    });
    test.todo('doesn՚t load analytics.js when consent is required');
    test('provides a list of enabled destinations', function (done) {
        nock('https://cdn.segment.com')
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
        shallow(React.createElement(ConsentManagerBuilder, { writeKey: "123", otherWriteKeys: ['abc'] }, function (_a) {
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
        nock('https://cdn.segment.com')
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
        shallow(React.createElement(ConsentManagerBuilder, { writeKey: "123" }, function (_a) {
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
        var ajsLoad = sinon.spy();
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}';
        window.analytics = { load: ajsLoad };
        var writeKey = '123';
        nock('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        shallow(React.createElement(ConsentManagerBuilder, { writeKey: writeKey }, function () {
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
        nock('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        shallow(React.createElement(ConsentManagerBuilder, { writeKey: "123" }, function (_a) {
            var preferences = _a.preferences;
            expect(preferences).toMatchObject({
                Amplitude: true
            });
            done();
        }));
    });
    test('does not imply consent on interacation', function (done) {
        nock('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        shallow(React.createElement(ConsentManagerBuilder, { writeKey: "123" }, function (_a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvaW5kZXgudG9kby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDekIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUNoQyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUE7QUFDdkIsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFBO0FBQ3pCLE9BQU8scUJBQXFCLE1BQU0sK0JBQStCLENBQUE7QUFFakUsUUFBUSxDQUFDLHVCQUF1QixFQUFFO0lBQ2hDLFVBQVUsQ0FBQztRQUNULFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ2IsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxDQUFDLENBQUE7SUFFL0QsSUFBSSxDQUFDLHlDQUF5QyxFQUFFLFVBQUEsSUFBSTtRQUNsRCxJQUFJLENBQUMseUJBQXlCLENBQUM7YUFDNUIsR0FBRyxDQUFDLCtCQUErQixDQUFDO2FBQ3BDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixZQUFZLEVBQUUsa0JBQWtCO2FBQ2pDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFlBQVksRUFBRSxXQUFXO2FBQzFCO1NBQ0YsQ0FBQzthQUNELEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzthQUNwQyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFlBQVksRUFBRSxXQUFXO2FBQzFCO1NBQ0YsQ0FBQyxDQUFBO1FBRUosT0FBTyxDQUNMLG9CQUFDLHFCQUFxQixJQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsY0FBYyxFQUFF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