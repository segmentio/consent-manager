import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ConsentManagerBuilder from '../consent-manager-builder'
import Container from './container'
import {ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES} from './categories'

const initialPreferences = {
  marketingAndAnalytics: null,
  advertising: null,
  functional: null
}

export default class ConsentManager extends PureComponent {
  static displayName = 'ConsentManager'

  static propTypes = {
    writeKey: PropTypes.string.isRequired,
    otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
    shouldRequireConsent: PropTypes.func,
    implyConsentOnInteraction: PropTypes.bool,
    cookieDomain: PropTypes.string,
    bannerContent: PropTypes.node.isRequired,
    bannerSubContent: PropTypes.string,
    bannerTextColor: PropTypes.string,
    bannerBackgroundColor: PropTypes.string,
    preferencesDialogTitle: PropTypes.node,
    preferencesDialogContent: PropTypes.node.isRequired,
    cancelDialogTitle: PropTypes.node,
    cancelDialogContent: PropTypes.node.isRequired
  }

  static defaultProps = {
    otherWriteKeys: [],
    shouldRequireConsent: () => true,
    implyConsentOnInteraction: true,
    cookieDomain: undefined,
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
      cancelDialogContent
    } = this.props

    return (
      <ConsentManagerBuilder
        writeKey={writeKey}
        otherWriteKeys={otherWriteKeys}
        shouldRequireConsent={shouldRequireConsent}
        cookieDomain={cookieDomain}
        initialPreferences={initialPreferences}
        mapCustomPreferences={this.handleMapCustomPreferences}
      >
        {({
          destinations,
          newDestinations,
          preferences,
          isConsentRequired,
          setPreferences,
          resetPreferences,
          saveConsent
        }) => (
          <Container
            destinations={destinations}
            newDestinations={newDestinations}
            preferences={preferences}
            isConsentRequired={isConsentRequired}
            setPreferences={setPreferences}
            resetPreferences={resetPreferences}
            saveConsent={saveConsent}
            implyConsentOnInteraction={implyConsentOnInteraction}
            bannerContent={bannerContent}
            bannerSubContent={bannerSubContent}
            bannerTextColor={bannerTextColor}
            bannerBackgroundColor={bannerBackgroundColor}
            preferencesDialogTitle={preferencesDialogTitle}
            preferencesDialogContent={preferencesDialogContent}
            cancelDialogTitle={cancelDialogTitle}
            cancelDialogContent={cancelDialogContent}
          />
        )}
      </ConsentManagerBuilder>
    )
  }

  handleMapCustomPreferences = ({destinations, preferences}) => {
    const destinationPreferences = {}
    const customPreferences = {}

    // Default unset preferences to true (for implicit consent)
    for (const preferenceName of Object.keys(preferences)) {
      const value = preferences[preferenceName]
      if (typeof value === 'boolean') {
        customPreferences[preferenceName] = value
      } else {
        customPreferences[preferenceName] = true
      }
    }

    for (const destination of destinations) {
      if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
        destinationPreferences[destination.id] = customPreferences.advertising
      } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
        destinationPreferences[destination.id] = customPreferences.functional
      } else {
        // Fallback to marketing
        destinationPreferences[destination.id] =
          customPreferences.marketingAndAnalytics
      }
    }

    return {destinationPreferences, customPreferences}
  }
}
