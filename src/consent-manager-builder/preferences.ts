// TODO: remove duplicate cookie library from bundle
import cookies from 'js-cookie'
import topDomain from '@segment/top-domain'
import { WindowWithAJS, Preferences, CategoryPreferences } from '../types'
import { EventEmitter } from 'events'

const DEFAULT_COOKIE_NAME = 'tracking-preferences'
const COOKIE_DEFAULT_EXPIRES = 365

export interface PreferencesManager {
  loadPreferences(cookieName?: string): Preferences
  onPreferencesSaved(listener: (prefs: Preferences) => void): void
  savePreferences(prefs: SavePreferences): void
}

// TODO: harden against invalid cookies
// TODO: harden against different versions of cookies
export function loadPreferences(cookieName?: string): Preferences {
  const preferences = cookies.getJSON(cookieName || DEFAULT_COOKIE_NAME)

  if (!preferences) {
    return {}
  }

  return {
    destinationPreferences: preferences.destinations as CategoryPreferences,
    customPreferences: preferences.custom as CategoryPreferences
  }
}

type SavePreferences = Preferences & {
  cookieDomain?: string
  cookieName?: string
  cookieExpires?: number
}

const emitter = new EventEmitter()

/**
 * Subscribes to consent preferences changing over time and returns
 * a cleanup function that can be invoked to remove the instantiated listener.
 *
 * @param listener a function to be invoked when ConsentPreferences are saved
 */
export function onPreferencesSaved(listener: (prefs: Preferences) => void) {
  emitter.on('preferencesSaved', listener)
  return () => emitter.off('preferencesSaved', listener)
}

export function savePreferences({
  destinationPreferences,
  customPreferences,
  cookieDomain,
  cookieName,
  cookieExpires
}: SavePreferences) {
  const wd = window as WindowWithAJS
  if (wd.analytics) {
    wd.analytics.identify({
      destinationTrackingPreferences: destinationPreferences,
      customTrackingPreferences: customPreferences
    })
  }

  const domain = cookieDomain || topDomain(window.location.href)
  const expires = cookieExpires || COOKIE_DEFAULT_EXPIRES
  const value = {
    version: 1,
    destinations: destinationPreferences,
    custom: customPreferences
  }

  cookies.set(cookieName || DEFAULT_COOKIE_NAME, value, {
    expires,
    domain
  })

  emitter.emit('preferencesSaved', {
    destinationPreferences,
    customPreferences
  })
}
