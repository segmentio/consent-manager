import {
  AnalyticsJS,
  Destination,
  DefaultDestinationBehavior,
  CategoryPreferences,
  Middleware
} from '../types'

interface AnalyticsParams {
  analytics?: AnalyticsJS
  writeKey: string
  destinations: Destination[]
  destinationPreferences: CategoryPreferences | null | undefined
  isConsentRequired: boolean
  shouldReload?: boolean
  defaultDestinationBehavior?: DefaultDestinationBehavior
  categoryPreferences: CategoryPreferences | null | undefined
}

function getConsentMiddleware(
  destinationPreferences,
  categoryPreferences,
  defaultDestinationBehavior
): Middleware {
  return ({ payload, next }) => {
    payload.obj.context.consent = {
      defaultDestinationBehavior,
      categoryPreferences,
      destinationPreferences
    }
    next(payload)
  }
}

export default function conditionallyLoadAnalytics({
  analytics = window.analytics,
  writeKey,
  destinations,
  destinationPreferences,
  isConsentRequired,
  shouldReload = true,
  defaultDestinationBehavior,
  categoryPreferences
}: AnalyticsParams) {
  const integrations = { All: false, 'Segment.io': true }
  let isAnythingEnabled = false

  if (!destinationPreferences) {
    if (isConsentRequired) {
      return
    }

    // Load a.js normally when consent isn't required and there's no preferences
    if (!analytics.initialized) {
      analytics.load(writeKey)
    }
    return
  }

  for (const destination of destinations) {
    // Was a preference explicitly set on this destination?
    const explicitPreference = destination.id in destinationPreferences
    if (!explicitPreference && defaultDestinationBehavior === 'enable') {
      integrations[destination.id] = true
      continue
    }

    const isEnabled = Boolean(destinationPreferences[destination.id])
    if (isEnabled) {
      isAnythingEnabled = true
    }
    integrations[destination.id] = isEnabled
  }

  // Reload the page if the trackers have already been initialised so that
  // the user's new preferences can take affect
  if (analytics && analytics.initialized) {
    if (shouldReload) {
      window.location.reload()
    }
    return
  }

  // Don't load a.js at all if nothing has been enabled
  if (isAnythingEnabled) {
    const middleware = getConsentMiddleware(
      destinationPreferences,
      categoryPreferences,
      defaultDestinationBehavior
    )
    // @ts-ignore: Analytics.JS type should be updated with addSourceMiddleware
    analytics.addSourceMiddleware(middleware)

    analytics.load(writeKey, { integrations })
  }
}
