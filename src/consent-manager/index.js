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
    cookieDomain: PropTypes.string,
    bannerContent: PropTypes.node.isRequired,
    bannerSubContent: PropTypes.string,
    bannerTextColor: PropTypes.string,
    bannerBackgroundColor: PropTypes.string,
    bannerVerticalPosition: PropTypes.string,
    bannerHorizontalPosition: PropTypes.string,
    bannerWidth: PropTypes.string,
    onError: PropTypes.func,
    privacyPolicyContent: PropTypes.node.isRequired
  }

  static defaultProps = {
    otherWriteKeys: [],
    shouldRequireConsent: () => true,
    onError: undefined,
    cookieDomain: undefined,
    bannerTextColor: '#fff',
    bannerSubContent: 'Privacy Policy',
    bannerBackgroundColor: '#1f4160',
    bannerVerticalPosition: 'bottom',
    bannerHorizontalPosition: 'right',
    bannerWidth: null
  }

  render() {
    const {
      writeKey,
      otherWriteKeys,
      shouldRequireConsent,
      cookieDomain,
      bannerContent,
      bannerSubContent,
      bannerTextColor,
      bannerBackgroundColor,
      bannerHorizontalPosition,
      bannerVerticalPosition,
      bannerWidth,
      privacyPolicyContent,
      onError
    } = this.props

    return (
      <ConsentManagerBuilder
        onError={onError}
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
        }) => {
          Object.keys(preferences).forEach(key => {
            preferences[key] = preferences[key] !== false
          })
          return (
            <Container
              destinations={destinations}
              newDestinations={newDestinations}
              preferences={preferences}
              isConsentRequired={isConsentRequired}
              setPreferences={setPreferences}
              resetPreferences={resetPreferences}
              saveConsent={saveConsent}
              implyConsentOnInteraction
              bannerContent={bannerContent}
              bannerSubContent={bannerSubContent}
              bannerTextColor={bannerTextColor}
              bannerBackgroundColor={bannerBackgroundColor}
              privacyPolicyContent={privacyPolicyContent}
              bannerVerticalPosition={bannerVerticalPosition}
              bannerHorizontalPosition={bannerHorizontalPosition}
              bannerWidth={bannerWidth}
            />
          )
        }}
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
