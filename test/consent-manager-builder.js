/*
Doesn't initialise if we shouldn't enforce consent
~~Includes destinations for every provided write key~~
~~There's no duplicate destinations~~
Loads analytics.js with the user's preferences

~~Provides a list of enabled destinations~~
~~Provides a list of newly added destinations~~
Provides an object containing the WIP preferences
Provides a setPreferences() function for setting the preferences
setPreferences() function can be passed a boolean to set all preferences
Provides a resetPreferences() function for resetting the preferences
Provides a saveConsent() function for persisting the preferences and loading analytics.js
saveConsent() can be passed additional preferences to persist
saveConsent() can be passed a boolean to set all preferences
saveConsent() fills in missing preferences
Calls the onLoad event handler with the destinations, newDestinations and preferences
Calls the onSave event handler with the preferences
The onSave event handler can overwrite the preferences by returning a value
*/
import test from 'ava'
import React from 'react'
import {shallow} from 'enzyme'
import nock from 'nock'
import ConsentManagerBuilder from '../src/consent-manager-builder'

test.beforeEach(() => {
  global.document = {}
  global.window = {}
})

test.failing('doesn՚t initialise if we shouldn՚t enforce consent', () => {
  const falsy = () => Promise.resolve(false)
  shallow(
    <ConsentManagerBuilder shouldEnforceConsent={falsy} writeKey="123">
      {() => {}}
    </ConsentManagerBuilder>
  )
})

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
            category: 'Segment',
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

test.cb.serial('doesn՚t include any duplicates in the destinations list', t => {
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
        name: 'Google Analytics',
        creationName: 'Google Analytics',
      },
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
            category: 'Segment',
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
