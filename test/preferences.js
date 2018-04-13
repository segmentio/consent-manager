import test from 'ava'
import {loadPreferences, savePreferences} from '../src/preferences'

test.beforeEach(() => {
  global.document = {}
})

test('loadPreferences() returns preferences when cookie exists', t => {
  global.document.cookie =
    'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true%2C%22Segment.io%22:false}}'

  t.deepEqual(loadPreferences(), {
    Amplitude: true,
    'Segment.io': false,
  })
})

test('loadPreferences() returns null when cookie doesn՚t exist', t => {
  global.document.cookie = ''

  t.is(loadPreferences(), null)
})

test('savePreferences() sets the cookie', t => {
  const preferences = {
    Amplitude: true,
    'Segment.io': false,
  }

  savePreferences(preferences)

  t.true(
    global.document.cookie.includes(
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true%2C%22Segment.io%22:false}}'
    )
  )
})
