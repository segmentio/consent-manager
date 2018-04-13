import test from 'ava'
import {
  doNotTrack,
  getNewDestinations,
  mergePreferences,
  addMissingPreferences,
} from '../src/utils'

test.beforeEach(() => {
  global.navigator = {}
  global.window = {}
})

test.serial('doNotTrack() supports standard API', t => {
  global.navigator.doNotTrack = '1'
  t.true(doNotTrack())

  global.navigator.doNotTrack = '0'
  t.false(doNotTrack())

  global.navigator.doNotTrack = 'unspecified'
  t.is(doNotTrack(), null)
})

test.serial('doNotTrack() supports window', t => {
  global.window.doNotTrack = '1'
  t.true(doNotTrack())

  global.window.doNotTrack = '0'
  t.false(doNotTrack())

  global.window.doNotTrack = 'unspecified'
  t.is(doNotTrack(), null)
})

test.serial('doNotTrack() support yes/no', t => {
  global.navigator.doNotTrack = 'yes'
  t.true(doNotTrack())

  global.navigator.doNotTrack = 'no'
  t.false(doNotTrack())
})

test.serial('doNotTrack() supports ms prefix', t => {
  global.navigator.msDoNotTrack = '1'
  t.true(doNotTrack())

  global.navigator.msDoNotTrack = '0'
  t.false(doNotTrack())

  global.navigator.msDoNotTrack = 'unspecified'
  t.is(doNotTrack(), null)
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
