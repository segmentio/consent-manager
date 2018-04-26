export default function conditionallyLoadAnalytics({
  writeKey,
  destinations,
  preferences,
}) {
  const integrations = {All: false, 'Segment.io': true}
  if (!preferences) {
    return
  }

  for (const destination of destinations) {
    integrations[destination.id] = Boolean(preferences[destination.id])
  }

  // Reload the page if the trackers have already been initialised so that
  // the user's new preferences can take affect
  if (window.analytics.initialized) {
    window.location.reload()
    return
  }

  window.analytics.load(writeKey, {integrations})
}
