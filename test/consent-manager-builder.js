import test from 'ava'
import React from 'react'
import {shallow} from 'enzyme'
import nock from 'nock'
import sinon from 'sinon'
import ConsentManagerBuilder from '../src/consent-manager-builder'

test.beforeEach(() => {
  global.document = {}
  global.window = {}
})

test.todo('doesn՚t initialise if we shouldn՚t enforce consent')

test.cb.serial('provides a list of enabled destinations', t => {
  nock('http://localhost:3000')
    .get('/v1/projects/123/integrations')
    .reply(200, [
      {
        name: 'Google Analytics',
        creationName: 'Google Analytics',
      },
      {
        name: 'Amplitude',
        creationName: 'Amplitude',
      },
    ])
    .get('/v1/projects/abc/integrations')
    .reply(200, [
      {
        name: 'FullStory',
        creationName: 'FullStory',
      },
    ])

  shallow(
    <ConsentManagerBuilder writeKey="123" otherWriteKeys={['abc']}>
      {({destinations}) => {
        t.deepEqual(destinations, [
          {
            name: 'Amplitude',
            id: 'Amplitude',
          },
          {
            name: 'FullStory',
            id: 'FullStory',
          },
          {
            name: 'Google Analytics',
            id: 'Google Analytics',
          },
          {
            name: 'Segment',
            id: 'Segment.io',
            category: 'Analytics',
            website: 'https://segment.com',
            description:
              'Segment is trusted by thousands of companies as their Customer Data Platform. Collect user data with one API and send it to hundreds of tools or a data warehouse.',
          },
        ])
        t.end()
      }}
    </ConsentManagerBuilder>
  )
})

test.cb.serial('provides a list of newly added destinations', t => {
  global.document.cookie =
    'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true%2C%22Segment.io%22:false}}'
  global.window.analytics = {load() {}}

  nock('http://localhost:3000')
    .get('/v1/projects/123/integrations')
    .reply(200, [
      {
        name: 'Google Analytics',
        creationName: 'Google Analytics',
      },
      {
        name: 'Amplitude',
        creationName: 'Amplitude',
      },
    ])

  shallow(
    <ConsentManagerBuilder writeKey="123">
      {({newDestinations}) => {
        t.deepEqual(newDestinations, [
          {
            name: 'Google Analytics',
            id: 'Google Analytics',
          },
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

  nock('http://localhost:3000')
    .get('/v1/projects/123/integrations')
    .reply(200, [
      {
        name: 'Amplitude',
        creationName: 'Amplitude',
      },
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
            'Segment.io': false,
          },
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

  nock('http://localhost:3000')
    .get('/v1/projects/123/integrations')
    .reply(200, [
      {
        name: 'Amplitude',
        creationName: 'Amplitude',
      },
    ])

  shallow(
    <ConsentManagerBuilder writeKey="123">
      {({preferences}) => {
        t.deepEqual(preferences, {
          Amplitude: true,
        })
        t.end()
      }}
    </ConsentManagerBuilder>
  )
})

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

test.cb.serial(
  'calls the onLoad event handler with the destinations, newDestinations and preferences',
  t => {
    global.document.cookie =
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true%2C%22Segment.io%22:false}}'
    global.window.analytics = {load() {}}

    nock('http://localhost:3000')
      .get('/v1/projects/123/integrations')
      .reply(200, [
        {
          name: 'Google Analytics',
          creationName: 'Google Analytics',
        },
        {
          name: 'Amplitude',
          creationName: 'Amplitude',
        },
      ])

    function onLoad({destinations, newDestinations, preferences}) {
      t.deepEqual(destinations, [
        {
          name: 'Amplitude',
          id: 'Amplitude',
        },
        {
          name: 'Google Analytics',
          id: 'Google Analytics',
        },
        {
          name: 'Segment',
          id: 'Segment.io',
          category: 'Analytics',
          website: 'https://segment.com',
          description:
            'Segment is trusted by thousands of companies as their Customer Data Platform. Collect user data with one API and send it to hundreds of tools or a data warehouse.',
        },
      ])
      t.deepEqual(newDestinations, [
        {
          name: 'Google Analytics',
          id: 'Google Analytics',
        },
      ])
      t.deepEqual(preferences, {
        Amplitude: true,
        'Segment.io': false,
      })
      t.end()
    }

    shallow(
      <ConsentManagerBuilder writeKey="123" onLoad={onLoad}>
        {() => {}}
      </ConsentManagerBuilder>
    )
  }
)

test.todo('calls the onSave event handler with the preferences')

test.todo(
  'the onSave event handler can overwrite the preferences by returning a value'
)
