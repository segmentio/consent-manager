import test from 'ava'
import sinon from 'sinon'
import conditionallyLoadAnalytics from '../../src/consent-manager-builder/analytics'

test.beforeEach(() => {
  global.window = {}
})

test('loads analytics.js with preferences', t => {
  const ajsLoad = sinon.spy()
  global.window.analytics = {load: ajsLoad}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
  const preferences = {
    Amplitude: true,
  }

  conditionallyLoadAnalytics({writeKey, destinations, preferences})

  t.true(ajsLoad.calledOnce)
  t.is(ajsLoad.args[0][0], writeKey)
  t.deepEqual(ajsLoad.args[0][1], {
    integrations: {
      All: false,
      Amplitude: true,
      'Segment.io': true,
    },
  })
})

test('doesn՚t load analytics.js when there are no preferences', t => {
  const ajsLoad = sinon.spy()
  global.window.analytics = {load: ajsLoad}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
  const preferences = null

  conditionallyLoadAnalytics({writeKey, destinations, preferences})

  t.true(ajsLoad.notCalled)
})

test('reloads the page when analytics.js has already been initialised', t => {
  const reload = sinon.spy()
  global.window.analytics = {
    load() {
      this.initialized = true
    },
  }
  global.window.location = {reload}
  const writeKey = '123'
  const destinations = [{id: 'Amplitude'}]
  const preferences = {
    Amplitude: true,
  }

  conditionallyLoadAnalytics({writeKey, destinations, preferences})
  conditionallyLoadAnalytics({writeKey, destinations, preferences})

  t.true(reload.calledOnce)
})
