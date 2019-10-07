export type WindowWithAJS = Window &
  typeof globalThis & {
    // TODO: add AJS types
    analytics?: any
  }

export type WindowWithConsentManagerConfig = Window &
  typeof globalThis & {
    consentManagerConfig?: (
      args: StandaloneConsentManagerParams
    ) => Partial<ConsentManagerProps> | Partial<ConsentManagerProps>
  }

interface StandaloneConsentManagerParams {
  React: any
  version?: string
  openConsentManager: () => void
  doNotTrack: () => boolean | null
  inEU: () => boolean
}

export interface Preferences {
  destinationPreferences?: CategoryPreferences
  customPreferences?: CategoryPreferences
}

export type Destination = any

export interface CategoryPreferences {
  functional?: boolean | null | undefined
  marketingAndAnalytics?: boolean | null | undefined
  advertising?: boolean | null | undefined
  [category: string]: boolean | null | undefined
}

export interface ConsentManagerProps {
  writeKey: string
  otherWriteKeys?: string[]
  shouldRequireConsent?: (...args: any[]) => any
  implyConsentOnInteraction?: boolean
  cookieDomain?: string
  bannerContent: React.ReactNode
  bannerSubContent?: string
  bannerTextColor?: string
  bannerBackgroundColor?: string
  preferencesDialogTitle?: React.ReactNode
  preferencesDialogContent: React.ReactNode
  onError?: (...args: any[]) => any
  cancelDialogTitle?: React.ReactNode
  cancelDialogContent: React.ReactNode
}
