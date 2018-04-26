import test from 'ava'
import sinon from 'sinon'
import {loadPreferences, savePreferences} from '../src/preferences'

test.beforeEach(() => {
  global.window = {}
  global.document = {}
})

test('loadPreferences() returns preferences when cookie exists', t => {
  global.document.cookie =
    'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true%2C%22_tbd%22:false}}'

  t.deepEqual(loadPreferences(), {
    Amplitude: true,
    _tbd: false,
  })
})

test('loadPreferences() returns null when cookie doesn՚t exist', t => {
  global.document.cookie = ''

  t.is(loadPreferences(), null)
})

test('savePreferences() saves the preferences', t => {
  const ajsIdentify = sinon.spy()
  global.window.analytics = {identify: ajsIdentify}
  global.document.cookie = ''
  const preferences = {
    Amplitude: true,
    _tbd: false,
  }

  savePreferences(preferences)

  t.true(ajsIdentify.calledOnce)
  t.deepEqual(ajsIdentify.args[0][0], {tbd: false})

  t.true(
    global.document.cookie.includes(
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true%2C%22_tbd%22:false}}'
    )
  )
})
