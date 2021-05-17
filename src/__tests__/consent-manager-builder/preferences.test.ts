import { URL } from 'url'
import sinon from 'sinon'
import { loadPreferences, savePreferences } from '../../consent-manager-builder/preferences'

describe('preferences', () => {
  beforeEach(() => {
    window = {
      location: {
        href: 'http://localhost/'
      }
    } as Window & typeof globalThis

    document = {
      createElement(type: string) {
        if (type === 'a') {
          return new URL('http://localhost/')
        }

        return
      }
    } as Document
  })

  test('loadPreferences() returns preferences when cookie exists', () => {
    document.cookie =
      'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22functional%22:true}}'

    expect(loadPreferences()).toMatchObject({
      destinationPreferences: {
        Amplitude: true
      },
      customPreferences: {
        functional: true
      }
    })
  })

  test('loadPreferences(cookieName) returns preferences when cookie exists', () => {
    document.cookie =
      'custom-tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22functional%22:true}}'

    expect(loadPreferences('custom-tracking-preferences')).toMatchObject({
      destinationPreferences: {
        Amplitude: true
      },
      customPreferences: {
        functional: true
      }
    })
  })

  test('savePreferences() saves the preferences', () => {
    const ajsIdentify = sinon.spy()

    // @ts-ignore
    window.analytics = { identify: ajsIdentify }
    document.cookie = ''

    const destinationPreferences = {
      Amplitude: true
    }
    const customPreferences = {
      functional: true
    }

    savePreferences({
      destinationPreferences,
      customPreferences,
      cookieDomain: undefined
    })

    expect(ajsIdentify.calledOnce).toBe(true)
    expect(ajsIdentify.args[0][0]).toMatchObject({
      destinationTrackingPreferences: destinationPreferences,
      customTrackingPreferences: customPreferences
    })

    expect(
      document.cookie.includes(
        'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22functional%22:true}}'
      )
    ).toBe(true)
  })

  test('savePreferences() sets the cookie domain', () => {
    const ajsIdentify = sinon.spy()
    // @ts-ignore
    window.analytics = { identify: ajsIdentify }
    document.cookie = ''

    const destinationPreferences = {
      Amplitude: true
    }

    savePreferences({
      destinationPreferences,
      customPreferences: undefined,
      cookieDomain: 'example.com'
    })

    expect(ajsIdentify.calledOnce).toBe(true)
    expect(ajsIdentify.args[0][0]).toMatchObject({
      destinationTrackingPreferences: destinationPreferences,
      customTrackingPreferences: undefined
    })

    // TODO: actually check domain
    // expect(document.cookie.includes('domain=example.com')).toBe(true)
  })

  test('savePreferences() sets the cookie with custom key', () => {
    const ajsIdentify = sinon.spy()
    // @ts-ignore
    window.analytics = { identify: ajsIdentify }
    document.cookie = ''

    const destinationPreferences = {
      Amplitude: true
    }

    savePreferences({
      destinationPreferences,
      customPreferences: undefined,
      cookieDomain: undefined,
      cookieName: 'custom-tracking-preferences'
    })

    expect(ajsIdentify.calledOnce).toBe(true)
    expect(ajsIdentify.args[0][0]).toMatchObject({
      destinationTrackingPreferences: destinationPreferences,
      customTrackingPreferences: undefined
    })

    expect(document.cookie.includes('custom-tracking-preferences')).toBe(true)
  })
})
