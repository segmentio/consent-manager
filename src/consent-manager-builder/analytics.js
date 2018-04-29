export default function conditionallyLoadAnalytics({
  writeKey,
  destinations,
  preferences,
}) {
  const integrations = {All: false, 'Segment.io': true}
  let isAnythingEnabled = false

  if (!preferences) {
    return
  }

  for (const destination of destinations) {
    const isEnabled = Boolean(preferences[destination.id])
    if (isEnabled) {
      isAnythingEnabled = true
    }
    integrations[destination.id] = isEnabled
  }

  // Reload the page if the trackers have already been initialised so that
  // the user's new preferences can take affect
  if (window.analytics.initialized) {
    window.location.reload()
    return
  }

  // Don't load a.js at all if nothing has been enabled
  if (isAnythingEnabled) {
    window.analytics.load(writeKey, {integrations})
  }
}
