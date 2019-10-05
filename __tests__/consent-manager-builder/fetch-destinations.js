import test from 'ava'
import nock from 'nock'
import fetchDestinations from '../../src/consent-manager-builder/fetch-destinations'

test('Returns destinations for a writekey', async t => {
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

  t.deepEqual(await fetchDestinations(['123']), [
    {
      id: 'Amplitude',
      name: 'Amplitude'
    },
    {
      id: 'Google Analytics',
      name: 'Google Analytics'
    }
  ])
})

test('Renames creationName to id', async t => {
  nock('https://cdn.segment.com')
    .get('/v1/projects/123/integrations')
    .reply(200, [
      {
        name: 'New Amplitude',
        creationName: 'Old Amplitude'
      }
    ])

  t.deepEqual(await fetchDestinations(['123']), [
    {
      id: 'Old Amplitude',
      name: 'New Amplitude'
    }
  ])
})

test('Doesn՚t include duplicate destinations', async t => {
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
        name: 'Google Analytics',
        creationName: 'Google Analytics'
      },
      {
        name: 'FullStory',
        creationName: 'FullStory'
      }
    ])

  t.deepEqual(await fetchDestinations(['123', 'abc']), [
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
})
