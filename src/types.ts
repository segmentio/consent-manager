export type WindowWithAJS = Window &
  typeof globalThis & {
    // TODO: add AJS types
    analytics?: any
  }

export interface Preferences {
  destinationPreferences?: CategoryPreferences
  customPreferences?: CategoryPreferences
}

export type Destination = any

export interface CategoryPreferences {
  [category: string]: boolean | null
}
