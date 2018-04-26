import test from 'ava'
import {
  getNewDestinations,
  mergePreferences,
  addMissingPreferences,
} from '../../src/consent-manager-builder/utils'

test.beforeEach(() => {
  global.navigator = {}
  global.window = {}
})

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

test('mergePreferences() merges two preferences objects', t => {
  const destinations = [{id: 'Google Analytics'}, {id: 'Amplitude'}]
  const existingPreferences = {
    Amplitude: false,
  }
  const newPreferences = {
    'Google Analytics': true,
  }
  t.deepEqual(
    mergePreferences({
      destinations,
      existingPreferences,
      newPreferences,
    }),
    {Amplitude: false, 'Google Analytics': true}
  )
})

test('mergePreferences() sets all destinations for booleans', t => {
  const destinations = [{id: 'Google Analytics'}, {id: 'Amplitude'}]
  const existingPreferences = {
    Amplitude: true,
  }
  const newPreferences = false
  t.deepEqual(
    mergePreferences({
      destinations,
      existingPreferences,
      newPreferences,
    }),
    {Amplitude: false, 'Google Analytics': false}
  )
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
