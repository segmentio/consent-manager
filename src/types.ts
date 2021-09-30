import { CloseBehavior, CloseBehaviorFunction } from './consent-manager/container'
import { PreferencesManager } from './consent-manager-builder/preferences'

type AJS = SegmentAnalytics.AnalyticsJS & {
  initialized: boolean
  track: (event: string, properties: { [key: string]: any }) => void
  addSourceMiddleware: (middleware: Middleware) => void
}

export type Middleware = (input: MiddlewareInput) => void
interface MiddlewareInput {
  payload: {
    obj: Record<string, any>
    [key: string]: any
  }
  integrations?: Record<string, boolean>
  next: (payload: MiddlewareInput['payload']) => void
}

export type WindowWithAJS = Window &
  typeof globalThis & {
    analytics?: AJS
  }

export type WindowWithConsentManagerConfig = Window &
  typeof globalThis & {
    consentManagerConfig?: (
      args: StandaloneConsentManagerParams
    ) => ConsentManagerInput | ConsentManagerInput
  }

export type ConsentManagerInput = ConsentManagerProps & {
  container: string
}

export type DefaultDestinationBehavior = 'enable' | 'disable' | 'imply' | 'ask'

interface StandaloneConsentManagerParams {
  React: unknown
  version?: string
  openConsentManager: () => void
  doNotTrack: () => boolean | null
  inEU: () => boolean
  preferences: PreferencesManager
  inRegions: (regions: string[]) => () => boolean
}

export interface Preferences {
  destinationPreferences?: CategoryPreferences
  customPreferences?: CategoryPreferences
}

export interface Destination {
  id: string
  name: string
  creationName: string
  description: string
  website: string
  category: string
}

export interface CategoryPreferences {
  functional?: boolean | null | undefined
  marketingAndAnalytics?: boolean | null | undefined
  advertising?: boolean | null | undefined
  [category: string]: boolean | null | undefined
}

export interface CustomCategories {
  [key: string]: CustomCategory
}

interface CustomCategory {
  integrations: string[]
  purpose: string
}

export enum PreferencesCategoriesKeys {
  FUNCTIONAL = 'functional',
  MARKETING = 'marketing',
  ADVERTISING = 'advertising',
  ESSENTIAL = 'essential'
}

export interface PreferencesCategories {
  key: PreferencesCategoriesKeys
  name?: string
  description?: string
  example?: string
}

interface PreferenceHeadings {
  allowValue?: string
  categoryValue?: string
  purposeValue?: string
  toolsValue?: string
}

export interface PreferenceDialogTemplate {
  headings: PreferenceHeadings
  checkboxes: string[]
  actionButtons: string[]
  categories: PreferencesCategories[]
}

export interface ConsentManagerProps {
  writeKey: string
  otherWriteKeys?: string[]
  shouldRequireConsent?: () => Promise<boolean> | boolean
  implyConsentOnInteraction?: boolean
  cookieDomain?: string
  cookieName?: string
  cookieExpires?: number
  bannerContent: React.ReactNode
  bannerSubContent?: string
  bannerActionsBlock?: ((props: ActionsBlockProps) => React.ReactElement) | true
  bannerTextColor?: string
  bannerBackgroundColor?: string
  bannerHideCloseButton: boolean
  bannerAsModal?: boolean
  preferencesDialogTitle?: React.ReactNode
  preferencesDialogContent: React.ReactNode
  onError?: (error: Error | undefined) => void
  cancelDialogTitle?: React.ReactNode
  cancelDialogContent: React.ReactNode
  closeBehavior?: CloseBehavior | CloseBehaviorFunction
  initialPreferences?: CategoryPreferences
  customCategories?: CustomCategories
  defaultDestinationBehavior?: DefaultDestinationBehavior
  cdnHost?: string
  preferencesDialogTemplate?: PreferenceDialogTemplate
}

export interface ActionsBlockProps {
  acceptAll: () => void
  denyAll: () => void
  changePreferences: () => void
}
