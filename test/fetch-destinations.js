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
      name: 'New Amplitude',
      id: 'Old Amplitude',
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
})
