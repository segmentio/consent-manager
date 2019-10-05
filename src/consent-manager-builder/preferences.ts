// TODO: remove duplicate cookie library from bundle
import cookies from 'js-cookie'
import topDomain from '@segment/top-domain'

const COOKIE_KEY = 'tracking-preferences'
const COOKIE_EXPIRES = 365

interface Preferences {
  destinationPreferences?: object
  customPreferences?: object
}

type WindowWithAJS = Window & {
  // TODO: add AJS types
  analytics?: any
}

// TODO: harden against invalid cookies
export function loadPreferences(): Preferences {
  const preferences = cookies.getJSON(COOKIE_KEY)

  if (!preferences) {
    return {}
  }

  return {
    destinationPreferences: preferences.destinations,
    customPreferences: preferences.custom
  }
}

type SavePreferences = Preferences & { cookieDomain?:  string}

export function savePreferences({ destinationPreferences, customPreferences, cookieDomain }: SavePreferences) {
  const wd = window as WindowWithAJS

  if (wd.analytics) {
    wd.analytics.identify({
      destinationTrackingPreferences: destinationPreferences,
      customTrackingPreferences: customPreferences
    })
  }

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
