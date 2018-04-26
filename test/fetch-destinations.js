import test from 'ava'
import nock from 'nock'
import fetchDestinations from '../src/fetch-destinations'

test('Returns destinations for a writekey', async t => {
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

  t.deepEqual(await fetchDestinations(['123']), [
    {
      id: 'Amplitude',
      name: 'Amplitude',
    },
    {
      id: 'Google Analytics',
      name: 'Google Analytics',
    },
    {
      id: '_tbd',
      name: 'TBD',
      category: 'TBD',
      description: 'TBD',
      website: 'https://segment.com',
    },
  ])
})

test('Renames creationName to id', async t => {
  nock('http://localhost:3000')
    .get('/v1/projects/123/integrations')
    .reply(200, [
      {
        name: 'New Amplitude',
        creationName: 'Old Amplitude',
      },
    ])

  t.deepEqual(await fetchDestinations(['123']), [
    {
      id: 'Old Amplitude',
      name: 'New Amplitude',
    },
    {
      id: '_tbd',
      name: 'TBD',
      category: 'TBD',
      description: 'TBD',
      website: 'https://segment.com',
    },
  ])
})

test('Doesn՚t include duplicate destinations', async t => {
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

  t.deepEqual(await fetchDestinations(['123', 'abc']), [
    {
      id: 'Amplitude',
      name: 'Amplitude',
    },
    {
      id: 'FullStory',
      name: 'FullStory',
    },
    {
      id: 'Google Analytics',
      name: 'Google Analytics',
    },
    {
      id: '_tbd',
      name: 'TBD',
      category: 'TBD',
      description: 'TBD',
      website: 'https://segment.com',
    },
  ])
})
