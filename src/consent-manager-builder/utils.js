export function getNewDestinations(destinations, preferences) {
  const newDestinations = []

  // If there are no preferences then all destinations are new
  if (!preferences) {
    return destinations
  }

  for (const destination of destinations) {
    if (preferences[destination.id] === undefined) {
      newDestinations.push(destination)
    }
  }

  return newDestinations
}

// TODO: delete this
export function addMissingPreferences(destinations, preferences) {
  const newPreferences = {
    ...preferences,
  }

  for (const destination of destinations) {
    if (newPreferences[destination.id] === undefined) {
      newPreferences[destination.id] = false
    }
  }

  return newPreferences
}
