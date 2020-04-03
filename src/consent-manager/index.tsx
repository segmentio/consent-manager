import React, { PureComponent } from 'react'
import ConsentManagerBuilder from '../consent-manager-builder'
import Container from './container'
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories'
import { CategoryPreferences, Destination, ConsentManagerProps } from '../types'
import defaultMessages from './default-messages'

const zeroValuePreferences: CategoryPreferences = {
  marketingAndAnalytics: null,
  advertising: null,
  functional: null,
}

export default class ConsentManager extends PureComponent<ConsentManagerProps, {}> {
  static displayName = 'ConsentManager'

  static defaultProps = {
    otherWriteKeys: [],
    shouldRequireConsent: () => true,
    implyConsentOnInteraction: false,
    onError: undefined,
    cookieDomain: undefined,
    customCategories: undefined,
    bannerTextColor: '#fff',
    bannerBackgroundColor: '#1f4160',
    locale: 'en',
    translations: defaultMessages,
  }

  render() {
    const {
      writeKey,
      otherWriteKeys,
      shouldRequireConsent,
      implyConsentOnInteraction,
      cookieDomain,
      bannerContent,
      bannerSubContent,
      bannerTextColor,
      bannerBackgroundColor,
      preferencesDialogTitle,
      preferencesDialogContent,
      cancelDialogTitle,
      cancelDialogContent,
      customCategories,
      onError,
      locale,
      translations,
    } = this.props

    const translate = (key) => {
      let transDictionary
      let lng
      if (translations) {
        // Not a deep merge, consider changing to lodash
        transDictionary = {
          ...ConsentManager.defaultProps.translations,
          ...translations,
        }
      } else {
        transDictionary = ConsentManager.defaultProps.translations
      }

      if (locale && transDictionary[locale]) {
        lng = locale
      } else {
        lng = ConsentManager.defaultProps.locale
      }
      return transDictionary[lng][key]
    }
    return (
      <ConsentManagerBuilder
        onError={onError}
        writeKey={writeKey}
        otherWriteKeys={otherWriteKeys}
        shouldRequireConsent={shouldRequireConsent}
        cookieDomain={cookieDomain}
        initialPreferences={this.getInitialPreferences()}
        mapCustomPreferences={this.handleMapCustomPreferences}
        customCategories={customCategories}
      >
        {({
          destinations,
          customCategories,
          newDestinations,
          preferences,
          isConsentRequired,
          setPreferences,
          resetPreferences,
          saveConsent,
          havePreferencesChanged,
        }) => {
          return (
            <Container
              customCategories={customCategories}
              destinations={destinations}
              newDestinations={newDestinations}
              preferences={preferences}
              isConsentRequired={isConsentRequired}
              setPreferences={setPreferences}
              resetPreferences={resetPreferences}
              saveConsent={saveConsent}
              closeBehavior={this.props.closeBehavior}
              cancelBehavior={this.props.cancelBehavior}
              implyConsentOnInteraction={
                implyConsentOnInteraction ?? ConsentManager.defaultProps.implyConsentOnInteraction
              }
              bannerContent={bannerContent || translate('ui.banner.content')}
              bannerSubContent={bannerSubContent || translate('ui.banner.subContent')}
              bannerTextColor={bannerTextColor || ConsentManager.defaultProps.bannerTextColor}
              bannerBackgroundColor={
                bannerBackgroundColor || ConsentManager.defaultProps.bannerBackgroundColor
              }
              preferencesDialogTitle={preferencesDialogTitle || translate('ui.preferences.title')}
              preferencesDialogContent={
                preferencesDialogContent || translate('ui.preferences.content')
              }
              cancelDialogTitle={cancelDialogTitle || translate('ui.cancel.title')}
              cancelDialogContent={cancelDialogContent || translate('ui.cancel.content')}
              havePreferencesChanged={havePreferencesChanged}
              translate={translate}
            />
          )
        }}
      </ConsentManagerBuilder>
    )
  }

  getInitialPreferences = () => {
    const { initialPreferences, customCategories } = this.props
    if (initialPreferences) {
      return initialPreferences
    }

    if (!customCategories) {
      return zeroValuePreferences
    }

    const initialCustomPreferences = {}
    Object.keys(customCategories).forEach((category) => {
      initialCustomPreferences[category] = null
    })

    return initialCustomPreferences
  }

  handleMapCustomPreferences = (destinations: Destination[], preferences: CategoryPreferences) => {
    const { customCategories } = this.props
    const destinationPreferences = {}
    const customPreferences = {}

    if (customCategories) {
      for (const preferenceName of Object.keys(customCategories)) {
        const value = preferences[preferenceName]
        if (typeof value === 'boolean') {
          customPreferences[preferenceName] = value
        } else {
          customPreferences[preferenceName] = true
        }
      }

      destinations.forEach((destination) => {
        // Mark custom categories
        Object.entries(customCategories).forEach(([categoryName, { integrations }]) => {
          const consentAlreadySetToFalse = destinationPreferences[destination.id] === false
          const shouldSetConsent = integrations.includes(destination.id)
          if (shouldSetConsent && !consentAlreadySetToFalse) {
            destinationPreferences[destination.id] = customPreferences[categoryName]
          }
        })
      })

      return { destinationPreferences, customPreferences }
    }

    // Default unset preferences to true (for implicit consent)
    for (const preferenceName of Object.keys(preferences)) {
      const value = preferences[preferenceName]
      if (typeof value === 'boolean') {
        customPreferences[preferenceName] = value
      } else {
        customPreferences[preferenceName] = true
      }
    }

    const customPrefs = customPreferences as CategoryPreferences

    for (const destination of destinations) {
      // Mark advertising destinations
      if (
        ADVERTISING_CATEGORIES.find((c) => c === destination.category) &&
        destinationPreferences[destination.id] !== false
      ) {
        destinationPreferences[destination.id] = customPrefs.advertising
      }

      // Mark function destinations
      if (
        FUNCTIONAL_CATEGORIES.find((c) => c === destination.category) &&
        destinationPreferences[destination.id] !== false
      ) {
        destinationPreferences[destination.id] = customPrefs.functional
      }

      // Fallback to marketing
      if (!(destination.id in destinationPreferences)) {
        destinationPreferences[destination.id] = customPrefs.marketingAndAnalytics
      }
    }

    return { destinationPreferences, customPreferences }
  }
}
