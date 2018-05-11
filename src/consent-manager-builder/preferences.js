import cookies from 'js-cookie'
import topDomain from '@segment/top-domain'

const COOKIE_KEY = 'tracking-preferences'
const COOKIE_EXPIRES = 365

// TODO: harden against invalid cookies
export function loadPreferences() {
  const preferences = cookies.getJSON(COOKIE_KEY)

  if (!preferences) {
    return {}
  }

  return {
    destinationPreferences: preferences.destinations,
    customPreferences: preferences.custom
  }
}

export function savePreferences({
  destinationPreferences,
  customPreferences,
  cookieDomain
}) {
  window.analytics.identify({
    destinationTrackingPreferences: destinationPreferences,
    customTrackingPreferences: customPreferences
  })

  const domain = cookieDomain || topDomain(window.location.href)
  const value = {
    version: 1,
    destinations: destinationPreferences,
    custom: customPreferences
  }
  cookies.set(COOKIE_KEY, value, {
    expires: COOKIE_EXPIRES,
    domain
  })
}
