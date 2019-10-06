import { WindowWithAJS } from "../types"

interface AnalyticsParams {
  writeKey: string
  destinations: any[]
  destinationPreferences: object
  isConsentRequired: boolean
  shouldReload?: boolean
}

export default function conditionallyLoadAnalytics({
  writeKey,
  destinations,
  destinationPreferences,
  isConsentRequired,
  shouldReload = true
}: AnalyticsParams) {
  const wd = window as WindowWithAJS
  const integrations = {All: false, 'Segment.io': true}
  let isAnythingEnabled = false

  if (!destinationPreferences) {
    if (isConsentRequired) {
      return
    }

    // Load a.js normally when consent isn't required and there's no preferences
    if (!wd.analytics.initialized) {
      wd.analytics.load(writeKey)
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
  if (wd.analytics && wd.analytics.initialized) {
    if (shouldReload) {
      window.location.reload()
    }
    return
  }

  // Don't load a.js at all if nothing has been enabled
  if (isAnythingEnabled) {
    wd.analytics.load(writeKey, {integrations})
  }
}
