import sinon from 'sinon'
import { WindowWithAJS } from '../../src/types'
import conditionallyLoadAnalytics from '../../src/consent-manager-builder/analytics'

describe('analytics', () => {
  let wd

  beforeEach(() => {
    window = {} as WindowWithAJS
    wd = window
  })

  test('loads analytics.js with preferences', () => {
    const ajsLoad = sinon.spy()
    wd.analytics = { load: ajsLoad }
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' }]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true
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
    wd.analytics = { load: ajsLoad }
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' }]
    const destinationPreferences = null

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true
    })

    expect(ajsLoad.notCalled).toBe(true)
  })

  test('doesn՚t load analytics.js when all preferences are false', () => {
    const ajsLoad = sinon.spy()
    wd.analytics = { load: ajsLoad }
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' }]
    const destinationPreferences = {
      Amplitude: false
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true
    })

    expect(ajsLoad.notCalled).toBe(true)
  })

  test('reloads the page when analytics.js has already been initialised', () => {
    wd.analytics = {
      load() {
        this.initialized = true
      }
    }
    jest.spyOn(window.location, 'reload')

    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' }]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true
    })
    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true
    })

    expect(window.location.reload).toHaveBeenCalled()
  })

  test('should allow the reload behvaiour to be disabled', () => {
    const reload = sinon.spy()
    wd.analytics = {
      load() {
        this.initialized = true
      }
    }
    wd.location = { reload }
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' }]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true
    })
    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: true,
      shouldReload: false
    })

    expect(reload.calledOnce).toBe(false)
  })

  test('loads analytics.js normally when consent isn՚t required', () => {
    const ajsLoad = sinon.spy()
    wd.analytics = { load: ajsLoad }
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' }]
    const destinationPreferences = null

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: false
    })

    expect(ajsLoad.calledOnce).toBe(true)
    expect(ajsLoad.args[0][0]).toBe(writeKey)
    expect(ajsLoad.args[0][1]).toBeUndefined()
  })

  test('still applies preferences when consent isn՚t required', () => {
    const ajsLoad = sinon.spy()
    wd.analytics = { load: ajsLoad }
    const writeKey = '123'
    const destinations = [{ id: 'Amplitude' }]
    const destinationPreferences = {
      Amplitude: true
    }

    conditionallyLoadAnalytics({
      writeKey,
      destinations,
      destinationPreferences,
      isConsentRequired: false
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
})
