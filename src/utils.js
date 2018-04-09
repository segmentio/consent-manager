export function doNotTrack() {
  let doNotTrackValue =
    navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack

  // Normalise Firefox < 32
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
  if (doNotTrackValue === 'yes') {
    doNotTrackValue = '1'
  } else if (doNotTrackValue === 'no') {
    doNotTrackValue = '0'
  }

  if (doNotTrackValue === '1') {
    return true
  }
  if (doNotTrackValue === '0') {
    return false
  }
  return null
}

export function getNewDestinations(destinations, preferences) {
  const newDestinations = []

  for (const destination of destinations) {
    if (!preferences[destination.id]) {
      newDestinations.push(destination)
    }
  }

  return newDestinations
}

export function mergePreferences({
  destinations,
  existingPreferences,
  newPreferences,
}) {
  let preferences

  if (typeof newPreferences === 'boolean') {
    preferences = {}
    for (const destination of destinations) {
      preferences[destination.id] = newPreferences
    }
  } else {
    preferences = {
      ...existingPreferences,
      ...newPreferences,
    }
  }

  return preferences
}
