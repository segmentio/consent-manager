/* eslint-disable @typescript-eslint/camelcase */
import {
  LanguageData,
  TranslationsDictionary,
  WindowWithConsentManagerLocalizations
} from '../types'

// NOTE: below are fallback phrases for consent manager
const fallbackDictionary: TranslationsDictionary = {
  cancel: 'Cancel',
  save: 'Save',
  allow: 'Allow',
  accept_all_cookies: 'Accept All Cookies',
  reject_all: 'Reject all',
  gdpr_settings: 'Settings',
  category: 'Category',
  purpose: 'Purpose',
  allow_category_tracking: 'Allow [CATEGORY_NAME] tracking',
  disallow_category_tracking: 'Disallow [CATEGORY_NAME] tracking',
  functional_category: 'Functional',
  functional_purpose:
    'Enables enhanced functionality, such as videos and live chat. If you do not allow these, then some or all of these functions may not work properly.',
  analytics_category: 'Analytics',
  analytics_purpose:
    'Provide statistical information on site usage, e.g., web analytics so we can improve this website over time.',
  targeting_category: 'Targeting',
  advertising_category: 'Advertising',
  advertising_purpose:
    'Used to create profiles or personalize content to enhance your shopping experience.',
  essential_category: 'Essential',
  esential_purpose:
    'Essential for the site and any requested services to work, but do not perform any additional or secondary function.',
  yes: 'Yes',
  no: 'No',
  change_preferences: 'You can change your preferences at any time',
  cancel_dialog_title: 'Are you sure you want to cancel?',
  data_collection_preferences: 'Website Data Collection Preferences',
  back_to_preferences: 'Back to Preferences'
}
const localWindow = window as WindowWithConsentManagerLocalizations
const createDictionary = (obj: LanguageData): TranslationsDictionary => {
  const localizedDictionary = obj.translations
  const translationKeys = Object.keys(localizedDictionary)
  const isEmpty = !translationKeys.length

  if (isEmpty) return localizedDictionary

  return translationKeys.reduce((dictionary, key) => {
    dictionary[key.split('.').pop()!] = localizedDictionary[key]
    return dictionary
  }, {})
}
const composeTranslations = (stringJson: string) => createDictionary(JSON.parse(stringJson))
const localizedDictionary =
  localWindow.consentManagerTranslations &&
  composeTranslations(localWindow.consentManagerTranslations)

export const translations = { ...fallbackDictionary, ...localizedDictionary }
