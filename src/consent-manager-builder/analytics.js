export default function conditionallyLoadAnalytics({
  analyticsLibrary,
  writeKey,
  destinations,
  destinationPreferences,
  isConsentRequired,
  shouldReload = true
}) {
  const integrations = {All: false, 'Segment.io': true}
  let isAnythingEnabled = false

  if (!destinationPreferences) {
    if (isConsentRequired) {
      return
    }

    // Load a.js normally when consent isn't required and there's no preferences
    if (!analyticsLibrary.initialized) {
      analyticsLibrary.load(writeKey)
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
  if (analyticsLibrary.initialized) {
    if (shouldReload) {
      window.location.reload()
    }
    return
  }

  // Don't load a.js at all if nothing has been enabled
  if (isAnythingEnabled) {
    analyticsLibrary.load(writeKey, {integrations})
  }
}
