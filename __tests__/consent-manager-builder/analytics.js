import test from 'ava'
import sinon from 'sinon'
import conditionallyLoadAnalytics from '../../src/consent-manager-builder/analytics'

test.beforeEach(() => {
  global.window = {}
})

test.serial('loads analytics.js with preferences', t => {
  const ajsLoad = sinon.spy()
  global.window.analytics = {load: ajsLoad}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
  const destinationPreferences = {
    Amplitude: true
  }

  conditionallyLoadAnalytics({
    writeKey,
    destinations,
    destinationPreferences,
    isConsentRequired: true
  })

  t.true(ajsLoad.calledOnce)
  t.is(ajsLoad.args[0][0], writeKey)
  t.deepEqual(ajsLoad.args[0][1], {
    integrations: {
      All: false,
      Amplitude: true,
      'Segment.io': true
    }
  })
})

test.serial('doesn՚t load analytics.js when there are no preferences', t => {
  const ajsLoad = sinon.spy()
  global.window.analytics = {load: ajsLoad}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
  const destinationPreferences = null

  conditionallyLoadAnalytics({
    writeKey,
    destinations,
    destinationPreferences,
    isConsentRequired: true
  })

  t.true(ajsLoad.notCalled)
})

test.serial('doesn՚t load analytics.js when all preferences are false', t => {
  const ajsLoad = sinon.spy()
  global.window.analytics = {load: ajsLoad}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
  const destinationPreferences = {
    Amplitude: false
  }

  conditionallyLoadAnalytics({
    writeKey,
    destinations,
    destinationPreferences,
    isConsentRequired: true
  })

  t.true(ajsLoad.notCalled)
})

test.serial(
  'reloads the page when analytics.js has already been initialised',
  t => {
    const reload = sinon.spy()
    global.window.analytics = {
      load() {
        this.initialized = true
      }
    }
    global.window.location = {reload}
    const writeKey = '123'
    const destinations = [{id: 'Amplitude'}]
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

    t.true(reload.calledOnce)
  }
)

test.serial('should allow the reload behvaiour to be disabled', t => {
  const reload = sinon.spy()
  global.window.analytics = {
    load() {
      this.initialized = true
    }
  }
  global.window.location = {reload}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
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

  t.false(reload.calledOnce)
})

test.serial('loads analytics.js normally when consent isn՚t required', t => {
  const ajsLoad = sinon.spy()
  global.window.analytics = {load: ajsLoad}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
  const destinationPreferences = null

  conditionallyLoadAnalytics({
    writeKey,
    destinations,
    destinationPreferences,
    isConsentRequired: false
  })

  t.true(ajsLoad.calledOnce)
  t.is(ajsLoad.args[0][0], writeKey)
  t.is(ajsLoad.args[0][1], undefined)
})

test.serial('still applies preferences when consent isn՚t required', t => {
  const ajsLoad = sinon.spy()
  global.window.analytics = {load: ajsLoad}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
  const destinationPreferences = {
    Amplitude: true
  }

  conditionallyLoadAnalytics({
    writeKey,
    destinations,
    destinationPreferences,
    isConsentRequired: false
  })

  t.true(ajsLoad.calledOnce)
  t.is(ajsLoad.args[0][0], writeKey)
  t.deepEqual(ajsLoad.args[0][1], {
    integrations: {
      All: false,
      Amplitude: true,
      'Segment.io': true
    }
  })
})
