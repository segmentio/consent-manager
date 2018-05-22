import test from 'ava'
import React from 'react'
import {shallow} from 'enzyme'
import nock from 'nock'
import sinon from 'sinon'
import ConsentManagerBuilder from '../../src/consent-manager-builder'

test.beforeEach(() => {
  global.document = {}
  global.window = {}
})

test.todo('doesn՚t load analytics.js when consent is required')

test.cb.serial('provides a list of enabled destinations', t => {
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
      {({destinations}) => {
        t.deepEqual(destinations, [
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
        t.end()
      }}
    </ConsentManagerBuilder>
  )
})

test.cb.serial('provides a list of newly added destinations', t => {
  global.document.cookie =
    'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}'
  global.window.analytics = {load() {}}

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
      {({newDestinations}) => {
        t.deepEqual(newDestinations, [
          {
            name: 'Google Analytics',
            id: 'Google Analytics'
          }
        ])
        t.end()
      }}
    </ConsentManagerBuilder>
  )
})

test.cb.serial('loads analytics.js with the user՚s preferences', t => {
  const ajsLoad = sinon.spy()
  global.document.cookie =
    'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}'
  global.window.analytics = {load: ajsLoad}
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
        t.true(ajsLoad.calledOnce)
        t.is(ajsLoad.args[0][0], writeKey)
        t.deepEqual(ajsLoad.args[0][1], {
          integrations: {
            All: false,
            Amplitude: true,
            'Segment.io': true
          }
        })
        t.end()
      }}
    </ConsentManagerBuilder>
  )
})

test.cb.serial('provides an object containing the WIP preferences', t => {
  global.document.cookie =
    'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}'
  global.window.analytics = {load() {}}

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
      {({preferences}) => {
        t.deepEqual(preferences, {
          Amplitude: true
        })
        t.end()
      }}
    </ConsentManagerBuilder>
  )
})

test.todo('loads analytics.js normally when consent isn՚t required')

test.todo('still applies preferences when consent isn՚t required')

test.todo('provides a setPreferences() function for setting the preferences')

test.todo(
  'setPreferences() function can be passed a boolean to set all preferences'
)

test.todo(
  'provides a resetPreferences() function for resetting the preferences'
)

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
