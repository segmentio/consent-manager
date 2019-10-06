export type WindowWithAJS = Window & typeof globalThis & {
  // TODO: add AJS types
  analytics?: any
}

export interface Preferences {
  destinationPreferences?: object
  customPreferences?: object
}

export type Destination = any