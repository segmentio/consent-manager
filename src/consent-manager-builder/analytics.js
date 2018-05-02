export default function conditionallyLoadAnalytics({
  writeKey,
  destinations,
  destinationPreferences,
  isEnforcingConsent,
  shouldReload = true,
}) {
  const integrations = {All: false, 'Segment.io': true}
  let isAnythingEnabled = false

  if (!destinationPreferences) {
    if (isEnforcingConsent) {
      return
    }

    // Load a.js normally when not enforcing consent and there's no preferences
    if (!window.analytics.initialized) {
      window.analytics.load(writeKey)
    }
    return
  }

  for (const destination of destinations) {
    const isEnabled = Boolean(destinationPreferences[destination.id])
    if (isEnabled) {
      isAnythingEnabled = true
    }
    integrations[destination.id] = isEnabled
  }

  // Reload the page if the trackers have already been initialised so that
  // the user's new preferences can take affect
  if (window.analytics.initialized) {
    if (shouldReload) {
      window.location.reload()
    }
    return
  }

  // Don't load a.js at all if nothing has been enabled
  if (isAnythingEnabled) {
    window.analytics.load(writeKey, {integrations})
  }
}
