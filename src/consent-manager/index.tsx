import React, { PureComponent } from 'react'
import ConsentManagerBuilder from '../consent-manager-builder'
import Container from './container'
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories'
import { CategoryPreferences, Destination, ConsentManagerProps } from '../types'

const zeroValuePreferences: CategoryPreferences = {
  marketingAndAnalytics: null,
  advertising: null,
  functional: null
}

export default class ConsentManager extends PureComponent<ConsentManagerProps, {}> {
  static displayName = 'ConsentManager'

  static defaultProps = {
    otherWriteKeys: [],
    shouldRequireConsent: () => true,
    implyConsentOnInteraction: false,
    onError: undefined,
    cookieDomain: undefined,
    categories: undefined,
    bannerTextColor: '#fff',
    bannerSubContent: 'You can change your preferences at any time.',
    bannerBackgroundColor: '#1f4160',
    preferencesDialogTitle: 'Website Data Collection Preferences',
    cancelDialogTitle: 'Are you sure you want to cancel?'
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
      initialPreferences,
      categories,
      onError
    } = this.props

    return (
      <ConsentManagerBuilder
        onError={onError}
        writeKey={writeKey}
        otherWriteKeys={otherWriteKeys}
        shouldRequireConsent={shouldRequireConsent}
        cookieDomain={cookieDomain}
        initialPreferences={initialPreferences || zeroValuePreferences}
        mapCustomPreferences={this.handleMapCustomPreferences}
        categories={categories}
      >
        {({
          destinations,
          categories,
          newDestinations,
          preferences,
          isConsentRequired,
          setPreferences,
          resetPreferences,
          saveConsent
        }) => {
          return <Container
            categories={categories}
            destinations={destinations}
            newDestinations={newDestinations}
            preferences={preferences}
            isConsentRequired={isConsentRequired}
            setPreferences={setPreferences}
            resetPreferences={resetPreferences}
            saveConsent={saveConsent}
            closeBehavior={this.props.closeBehavior}
            implyConsentOnInteraction={implyConsentOnInteraction ?? ConsentManager.defaultProps.implyConsentOnInteraction}
            bannerContent={bannerContent}
            bannerSubContent={bannerSubContent}
            bannerTextColor={bannerTextColor || ConsentManager.defaultProps.bannerTextColor}
            bannerBackgroundColor={
              bannerBackgroundColor || ConsentManager.defaultProps.bannerBackgroundColor
            }
            preferencesDialogTitle={preferencesDialogTitle}
            preferencesDialogContent={preferencesDialogContent}
            cancelDialogTitle={cancelDialogTitle}
            cancelDialogContent={cancelDialogContent}
          />
        }}
      </ConsentManagerBuilder>
    )
  }

  handleMapCustomPreferences = (destinations: Destination[], preferences: CategoryPreferences) => {
    const { categories } = this.props
    const destinationPreferences = {}
    const customPreferences = {}

    const categoryNames = categories ? [...Object.keys(preferences), ...Object.keys(categories)] : Object.keys(preferences)
    // Default unset preferences to true (for implicit consent)
    for (const preferenceName of categoryNames) {
      const value = preferences[preferenceName]
      if (typeof value === 'boolean') {
        customPreferences[preferenceName] = value
      } else {
        customPreferences[preferenceName] = true
      }
    }

    const customPrefs = customPreferences as CategoryPreferences

    for (const destination of destinations) {
      if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
        destinationPreferences[destination.id] = customPrefs.advertising
      } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
        destinationPreferences[destination.id] = customPrefs.functional
      } else if (categories) {
        Object.entries(categories).forEach(([categoryName, segmentDestinationCategories]) => {
          if (segmentDestinationCategories.includes(destination.category)) {
            destinationPreferences[destination.id] = customPrefs[categoryName]
          }
        })
      } else {
        // Fallback to marketing
        destinationPreferences[destination.id] = customPrefs.marketingAndAnalytics
      }
    }

    return { destinationPreferences, customPreferences }
  }
}
