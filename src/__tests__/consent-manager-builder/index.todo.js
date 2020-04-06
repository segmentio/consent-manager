import React from 'react'
import { shallow } from 'enzyme'
import nock from 'nock'
import sinon from 'sinon'
import ConsentManagerBuilder from '../../consent-manager-builder'
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from '../../consent-manager/categories'

describe('ConsentManagerBuilder', () => {
  beforeEach(() => {
    document = {}
    window = {}
  })

  test.todo('doesn՚t load analytics.js when consent is required')

  test('provides a list of enabled destinations', done => {
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
      ])

    shallow(
      <ConsentManagerBuilder writeKey="123" otherWriteKeys={['abc']}>
        {({ destinations }) => {
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
          ])
          done()
        }}
      </ConsentManagerBuilder>
    )
  })

  test('provides a list of newly added destinations', done => {
    document.cookie =
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}'
    window.analytics = { load() {} }

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

    shallow(
      <ConsentManagerBuilder writeKey="123">
        {({ newDestinations }) => {
          expect(newDestinations).toMatchObject([
            {
              name: 'Google Analytics',
              id: 'Google Analytics'
            }
          ])
          done()
        }}
      </ConsentManagerBuilder>
    )
  })

  test('loads analytics.js with the user՚s preferences', done => {
    const ajsLoad = sinon.spy()
    document.cookie =
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}'
    window.analytics = { load: ajsLoad }
    const writeKey = '123'

    nock('https://cdn.segment.com')
      .get('/v1/projects/123/integrations')
      .reply(200, [
        {
          name: 'Amplitude',
          creationName: 'Amplitude'
        }
      ])

    shallow(
      <ConsentManagerBuilder writeKey={writeKey}>
        {() => {
          expect(ajsLoad.calledOnce).toBe(true)
          expect(ajsLoad.args[0][0]).toBe(writeKey)
          expect(ajsLoad.args[0][1]).toMatchObject({
            integrations: {
              All: false,
              Amplitude: true,
              'Segment.io': true
            }
          })
          done()
        }}
      </ConsentManagerBuilder>
    )
  })

  test('provides an object containing the WIP preferences', done => {
    document.cookie =
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}'
    window.analytics = { load() {} }

    nock('https://cdn.segment.com')
      .get('/v1/projects/123/integrations')
      .reply(200, [
        {
          name: 'Amplitude',
          creationName: 'Amplitude'
        }
      ])

    shallow(
      <ConsentManagerBuilder writeKey="123">
        {({ preferences }) => {
          expect(preferences).toMatchObject({
            Amplitude: true
          })
          done()
        }}
      </ConsentManagerBuilder>
    )
  })

  test('does not imply consent on interacation', done => {
    nock('https://cdn.segment.com')
      .get('/v1/projects/123/integrations')
      .reply(200, [
        {
          name: 'Amplitude',
          creationName: 'Amplitude'
        }
      ])

    shallow(
      <ConsentManagerBuilder writeKey="123">
        {({ preferences }) => {
          expect(preferences).toMatchObject({})
          done()
        }}
      </ConsentManagerBuilder>
    )
  })

  test('if defaultDestinationBehavior is set to imply and category is set to true, loads new destination', done => {
    document.cookie =
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22advertising%22:false%2C%22marketingAndAnalytics%22:true%2C%22functional%22:true}}'
    window.analytics = { load() {}, identify() {} }

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

    shallow(
      <ConsentManagerBuilder
        defaultDestinationBehavior="imply"
        writeKey="123"
        mapCustomPreferences={(destinations, preferences) => {
          const destinationPreferences = {}
          const customPreferences = {}
          // Default unset preferences to true (for implicit consent)
          for (const preferenceName of Object.keys(preferences)) {
            const value = preferences[preferenceName]
            if (typeof value === 'boolean') {
              customPreferences[preferenceName] = value
            } else {
              customPreferences[preferenceName] = true
            }
          }

          const customPrefs = customPreferences

          for (const destination of destinations) {
            // Mark advertising destinations
            if (
              ADVERTISING_CATEGORIES.find(c => c === destination.category) &&
              destinationPreferences[destination.id] !== false
            ) {
              destinationPreferences[destination.id] = customPrefs.advertising
            }

            // Mark function destinations
            if (
              FUNCTIONAL_CATEGORIES.find(c => c === destination.category) &&
              destinationPreferences[destination.id] !== false
            ) {
              destinationPreferences[destination.id] = customPrefs.functional
            }

            // Fallback to marketing
            if (!(destination.id in destinationPreferences)) {
              destinationPreferences[destination.id] = customPrefs.marketingAndAnalytics
            }
          }

          return { destinationPreferences, customPreferences }
        }}
      >
        {({ preferences }) => {
          expect(preferences).toMatchObject({
            Amplitude: true,
            'Google Analytics': true
          })
          done()
        }}
      </ConsentManagerBuilder>
    )
  })

  test('if defaultDestinationBehavior is set to imply and category is set to false, does not load new destination', done => {
    document.cookie =
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22advertising%22:false%2C%22marketingAndAnalytics%22:false%2C%22functional%22:true}}'
    window.analytics = { load() {}, identify() {} }

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

    shallow(
      <ConsentManagerBuilder
        defaultDestinationBehavior="imply"
        writeKey="123"
        mapCustomPreferences={(destinations, preferences) => {
          const destinationPreferences = {}
          const customPreferences = {}

          // Default unset preferences to true (for implicit consent)
          for (const preferenceName of Object.keys(preferences)) {
            const value = preferences[preferenceName]
            if (typeof value === 'boolean') {
              customPreferences[preferenceName] = value
            } else {
              customPreferences[preferenceName] = true
            }
          }

          const customPrefs = customPreferences

          for (const destination of destinations) {
            // Mark advertising destinations
            if (
              ADVERTISING_CATEGORIES.find(c => c === destination.category) &&
              destinationPreferences[destination.id] !== false
            ) {
              destinationPreferences[destination.id] = customPrefs.advertising
            }

            // Mark function destinations
            if (
              FUNCTIONAL_CATEGORIES.find(c => c === destination.category) &&
              destinationPreferences[destination.id] !== false
            ) {
              destinationPreferences[destination.id] = customPrefs.functional
            }

            // Fallback to marketing
            if (!(destination.id in destinationPreferences)) {
              destinationPreferences[destination.id] = customPrefs.marketingAndAnalytics
            }
          }

          return { destinationPreferences, customPreferences }
        }}
      >
        {({ preferences }) => {
          expect(preferences).toMatchObject({
            Amplitude: false,
            'Google Analytics': false
          })
          done()
        }}
      </ConsentManagerBuilder>
    )
  })

  test.todo('loads analytics.js normally when consent isn՚t required')
  test.todo('still applies preferences when consent isn՚t required')
  test.todo('provides a setPreferences() function for setting the preferences')
  test.todo('setPreferences() function can be passed a boolean to set all preferences')
  test.todo('provides a resetPreferences() function for resetting the preferences')
  test.todo(
    'provides a saveConsent() function for persisting the preferences and loading analytics.js'
  )
  test.todo('saveConsent() can be passed additional preferences to persist')
  test.todo('saveConsent() can be passed a boolean to set all preferences')
  test.todo('saveConsent() fills in missing preferences')
  test.todo('initialPreferences sets the initial preferences')
  test.todo('loads custom preferences')
  test.todo('saveConsent() maps custom preferences to destination preferences')
  test.todo('mapCustomPreferences allows customPreferences to be updated')
  test.todo('saveConsent() saves custom preferences')
  test.todo('cookieDomain sets the cookie domain')
})
