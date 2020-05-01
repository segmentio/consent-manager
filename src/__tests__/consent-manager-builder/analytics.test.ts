import sinon from 'sinon'
import { WindowWithAJS, Destination, Middleware } from '../../types'
import conditionallyLoadAnalytics from '../../consent-manager-builder/analytics'

describe('analytics', () => {
  let wd

  beforeEach(() => {
    window = {} as WindowWithAJS
    wd = window
    wd.analytics = {
      track: (_event, _properties, _optionsWithConsent, _callback) => {},
      addSourceMiddleware: (_middleware: Middleware) => {}
    }
  })

  test('loads analytics.js with preferences', () => {
    const ajsLoad = sinon.spy()
    wd.analytics.load = ajsLoad
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' } as Destination]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true,
      categoryPreferences: {}
    })

    expect(ajsLoad.calledOnce).toBe(true)
    expect(ajsLoad.args[0][0]).toBe(writeKey)
    expect(ajsLoad.args[0][1]).toMatchObject({
      integrations: {
        All: false,
        Amplitude: true,
        'Segment.io': true
      }
    })
  })

  test('doesn՚t load analytics.js when there are no preferences', () => {
    const ajsLoad = sinon.spy()
    wd.analytics.load = ajsLoad
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' } as Destination]
    const destinationPreferences = null

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true,
      categoryPreferences: {}
    })

    expect(ajsLoad.notCalled).toBe(true)
  })

  test('doesn՚t load analytics.js when all preferences are false', () => {
    const ajsLoad = sinon.spy()
    wd.analytics.load = ajsLoad
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' } as Destination]
    const destinationPreferences = {
      Amplitude: false
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true,
      categoryPreferences: {}
    })

    expect(ajsLoad.notCalled).toBe(true)
  })

  test('reloads the page when analytics.js has already been initialised', () => {
    wd.analytics.load = function load() {
      this.initialized = true
    }

    jest.spyOn(window.location, 'reload')

    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' } as Destination]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true,
      categoryPreferences: {}
    })
    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true,
      categoryPreferences: {}
    })

    expect(window.location.reload).toHaveBeenCalled()
  })

  test('should allow the reload behvaiour to be disabled', () => {
    const reload = sinon.spy()
    wd.analytics.load = function load() {
      this.initialized = true
    }
    wd.location = { reload }
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' } as Destination]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true,
      categoryPreferences: {}
    })
    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true,
      shouldReload: false,
      categoryPreferences: {}
    })

    expect(reload.calledOnce).toBe(false)
  })

  test('loads analytics.js normally when consent isn՚t required', () => {
    const ajsLoad = sinon.spy()
    wd.analytics.load = ajsLoad
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' } as Destination]
    const destinationPreferences = null

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: false,
      categoryPreferences: {}
    })

    expect(ajsLoad.calledOnce).toBe(true)
    expect(ajsLoad.args[0][0]).toBe(writeKey)
    expect(ajsLoad.args[0][1]).toBeUndefined()
  })

  test('still applies preferences when consent isn՚t required', () => {
    const ajsLoad = sinon.spy()
    wd.analytics.load = ajsLoad
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' } as Destination]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: false,
      categoryPreferences: {}
    })

    expect(ajsLoad.calledOnce).toBe(true)
    expect(ajsLoad.args[0][0]).toBe(writeKey)
    expect(ajsLoad.args[0][1]).toMatchObject({
      integrations: {
        All: false,
        Amplitude: true,
        'Segment.io': true
      }
    })
  })

  test('sets new destinations to false if defaultDestinationBehavior is set to "disable"', () => {
    const ajsLoad = sinon.spy()
    wd.analytics.load = ajsLoad
    const writeKey = '123'
    const destinations = [
      { id: 'Amplitude' } as Destination,
      { id: 'Google Analytics' } as Destination
    ]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: false,
      shouldReload: true,
      defaultDestinationBehavior: 'disable',
      categoryPreferences: {}
    })

    expect(ajsLoad.args[0][1]).toMatchObject({
      integrations: {
        All: false,
        Amplitude: true,
        'Google Analytics': false,
        'Segment.io': true
      }
    })
  })

  test('sets new destinations to true if defaultDestinationBehavior is set to "enable"', () => {
    const ajsLoad = sinon.spy()
    wd.analytics.load = ajsLoad
    const writeKey = '123'
    const destinations = [
      { id: 'Amplitude' } as Destination,
      { id: 'Google Analytics' } as Destination
    ]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: false,
      shouldReload: true,
      defaultDestinationBehavior: 'enable',
      categoryPreferences: {}
    })

    expect(ajsLoad.args[0][1]).toMatchObject({
      integrations: {
        All: false,
        Amplitude: true,
        'Google Analytics': true,
        'Segment.io': true
      }
    })
  })
})
