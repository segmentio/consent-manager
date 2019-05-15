import {URL} from 'url'
import test from 'ava'
import sinon from 'sinon'
import {
  loadPreferences,
  savePreferences
} from '../../src/consent-manager-builder/preferences'

test.beforeEach(() => {
  global.window = {
    location: {
      href: 'http://localhost/'
    }
  }
  global.document = {
    createElement(type) {
      if (type === 'a') {
        return new URL('http://localhost/')
      }
    }
  }
})

test.serial('loadPreferences() returns preferences when cookie exists', t => {
  global.document.cookie =
    'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22functional%22:true}%2C%22isBannerVisible%22:true}'

  t.deepEqual(loadPreferences(), {
    destinationPreferences: {
      Amplitude: true
    },
    customPreferences: {
      functional: true
    },
    isBannerVisible: true
  })
})

test.serial('savePreferences() saves the preferences', t => {
  const ajsIdentify = sinon.spy()
  global.window.analytics = {identify: ajsIdentify}
  global.document.cookie = ''
  const destinationPreferences = {
    Amplitude: true
  }
  const customPreferences = {
    functional: true
  }

  savePreferences({
    destinationPreferences,
    customPreferences,
    isBannerVisible: true
  })

  t.true(ajsIdentify.calledOnce)
  t.deepEqual(ajsIdentify.args[0][0], {
    destinationTrackingPreferences: destinationPreferences,
    customTrackingPreferences: customPreferences
  })

  t.true(
    global.document.cookie.includes(
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22functional%22:true}%2C%22isBannerVisible%22:true}'
    )
  )
})

test.serial('savePreferences() sets the cookie domain', t => {
  const ajsIdentify = sinon.spy()
  global.window.analytics = {identify: ajsIdentify}
  global.document.cookie = ''
  const destinationPreferences = {
    Amplitude: true
  }

  savePreferences({
    destinationPreferences,
    cookieDomain: 'example.com'
  })

  t.true(ajsIdentify.calledOnce)
  t.deepEqual(ajsIdentify.args[0][0], {
    destinationTrackingPreferences: destinationPreferences,
    customTrackingPreferences: undefined
  })

  t.true(global.document.cookie.includes('domain=example.com'))
})
