// TODO: remove duplicate cookie library from bundle
import topDomain from '@segment/top-domain'
import { EventEmitter } from 'events'
import cookies from 'js-cookie'

import { WindowWithAJS, Preferences, CategoryPreferences } from '../types'

const COOKIE_KEY = 'tracking-preferences'
// TODO: Make cookie expiration configurable
const COOKIE_EXPIRES = 730

export interface PreferencesManager {
  loadPreferences(): Preferences
  onPreferencesSaved(listener: (prefs: Preferences) => void): void
  savePreferences(prefs: SavePreferences): void
}

// TODO: harden against invalid cookies
// TODO: harden against different versions of cookies
export function loadPreferences(): Preferences {
  const preferences = cookies.getJSON(COOKIE_KEY)

  if (!preferences) {
    return {}
  }

  return {
    destinationPreferences: preferences.destinations as CategoryPreferences,
    customPreferences: preferences.custom as CategoryPreferences
  }
}

type SavePreferences = Preferences & { cookieDomain?: string }

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
  cookieDomain
}: SavePreferences) {
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

  emitter.emit('preferencesSaved', {
    destinationPreferences,
    customPreferences
  })
}
