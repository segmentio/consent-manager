import test from 'ava'
import {
  getNewDestinations,
  addMissingPreferences,
} from '../../src/consent-manager-builder/utils'

test('getNewDestinations() returns new destinations with no preference', t => {
  const destinations = [{id: 'Google Analytics'}, {id: 'Amplitude'}]
  const preferences = {
    Amplitude: false,
  }
  t.deepEqual(getNewDestinations(destinations, preferences), [
    {id: 'Google Analytics'},
  ])
})

test('getNewDestinations() returns all destinations when there՚s no preferences', t => {
  const destinations = [{id: 'Google Analytics'}, {id: 'Amplitude'}]
  const preferences = null
  t.deepEqual(getNewDestinations(destinations, preferences), destinations)
})

test('addMissingPreferences() adds destinations that don՚t have a preference', t => {
  const destinations = [{id: 'Google Analytics'}, {id: 'Amplitude'}]
  const preferences = {
    Amplitude: true,
  }
  t.deepEqual(addMissingPreferences(destinations, preferences), {
    Amplitude: true,
    'Google Analytics': false,
  })
})
