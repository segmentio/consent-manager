import nock from 'nock'
import fetchDestinations from '../../consent-manager-builder/fetch-destinations'

describe('fetchDestinations', () => {
  test('Returns destinations for a writekey', async () => {
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

    expect(await fetchDestinations(['123'])).toMatchObject([
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

  test('Renames creationName to id', async () => {
    nock('https://cdn.segment.com')
      .get('/v1/projects/123/integrations')
      .reply(200, [
        {
          name: 'New Amplitude',
          creationName: 'Old Amplitude'
        }
      ])

    expect(await fetchDestinations(['123'])).toMatchObject([
      {
        id: 'Old Amplitude',
        name: 'New Amplitude'
      }
    ])
  })

  test('Doesn՚t include duplicate destinations', async () => {
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

    expect(await fetchDestinations(['123', 'abc'])).toMatchObject([
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
})
