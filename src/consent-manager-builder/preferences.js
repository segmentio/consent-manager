import cookies from 'js-cookie'

const COOKIE_KEY = 'tracking-preferences'
const COOKIE_EXPIRES = 365

// TODO: harden against invalid cookies
export function loadPreferences() {
  const preferences = cookies.getJSON(COOKIE_KEY)

  if (!preferences) {
    return null
  }

  // TODO: add support for custom preferences
  return preferences.destinations
}

export function savePreferences(preferences, cookieDomain) {
  window.analytics.identify({
    tbd: preferences._tbd,
  })

  const value = {
    version: 1,
    destinations: preferences,
  }
  cookies.set(COOKIE_KEY, value, {
    expires: COOKIE_EXPIRES,
    domain: cookieDomain,
  })
}
