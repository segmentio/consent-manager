import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ConsentManagerBuilder from '../consent-manager-builder'
import Container from './container'
import {ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES} from './categories'
import defaultMessages from './default-messages'

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
    implyConsentType: PropTypes.oneOf(['all', 'links']),
    cookieDomain: PropTypes.string,
    bannerContent: PropTypes.node.isRequired,
    bannerSubContent: PropTypes.string,
    bannerTextColor: PropTypes.string,
    bannerBackgroundColor: PropTypes.string,
    preferencesDialogTitle: PropTypes.node,
    preferencesDialogContent: PropTypes.node.isRequired,
    onError: PropTypes.func,
    cancelDialogTitle: PropTypes.node,
    cancelDialogContent: PropTypes.node.isRequired,
    translationMessages: PropTypes.object
  }

  static defaultProps = {
    otherWriteKeys: [],
    shouldRequireConsent: () => true,
    implyConsentOnInteraction: true,
    implyConsentType: 'all',
    onError: undefined,
    cookieDomain: undefined,
    bannerTextColor: '#fff',
    bannerSubContent: 'You can change your preferences at any time.',
    bannerBackgroundColor: '#1f4160',
    preferencesDialogTitle: 'Website Data Collection Preferences',
    cancelDialogTitle: 'Are you sure you want to cancel?',
    translationMessages: {}
  }

  constructor(props) {
    super(props)

    this.state = {
      translationMessages: Object.assign(
        {},
        defaultMessages.translationMessages,
        this.props.translationMessages
      )
    }
  }

  render() {
    const {
      writeKey,
      otherWriteKeys,
      shouldRequireConsent,
      implyConsentOnInteraction,
      implyConsentType,
      cookieDomain,
      bannerContent,
      bannerSubContent,
      bannerTextColor,
      bannerBackgroundColor,
      preferencesDialogTitle,
      preferencesDialogContent,
      cancelDialogTitle,
      cancelDialogContent,
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
          isBannerVisible,
          isConsentRequired,
          setPreferences,
          resetPreferences,
          saveConsent
        }) => (
          <Container
            destinations={destinations}
            newDestinations={newDestinations}
            preferences={preferences}
            isBannerVisible={isBannerVisible}
            isConsentRequired={isConsentRequired}
            setPreferences={setPreferences}
            resetPreferences={resetPreferences}
            saveConsent={saveConsent}
            implyConsentOnInteraction={implyConsentOnInteraction}
            implyConsentType={implyConsentType}
            bannerContent={bannerContent}
            bannerSubContent={bannerSubContent}
            bannerTextColor={bannerTextColor}
            bannerBackgroundColor={bannerBackgroundColor}
            preferencesDialogTitle={preferencesDialogTitle}
            preferencesDialogContent={preferencesDialogContent}
            cancelDialogTitle={cancelDialogTitle}
            cancelDialogContent={cancelDialogContent}
            translate={this.translate}
          />
        )}
      </ConsentManagerBuilder>
    )
  }

  translate = key => {
    return this.state.translationMessages[key]
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
