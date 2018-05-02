import cookies from 'js-cookie'

const COOKIE_KEY = 'tracking-preferences'
const COOKIE_EXPIRES = 365

// TODO: harden against invalid cookies
export function loadPreferences() {
  const preferences = cookies.get(COOKIE_KEY)

  if (!preferences) {
    return null
  }

  // TODO: add support for custom preferences
  return JSON.parse(preferences).destinations
}

export function savePreferences(preferences) {
  window.analytics.identify({
    tbd: preferences._tbd,
  })

  const data = JSON.stringify({
    version: 1,
    destinations: preferences,
  })
  cookies.set(COOKIE_KEY, data, {expires: COOKIE_EXPIRES})
}
