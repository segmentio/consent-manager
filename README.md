# consent-manager [![build status](https://circleci.com/gh/segmentio/consent-manager.svg?style=svg&circle-token=d3a9e0da7a07fb443f1b4e558ad9c60a55dca223)](https://circleci.com/gh/segmentio/consent-manager)

> Drop-in consent management plugin for analytics.js

[StoryBook](https://segmentio.github.io/consent-manager/index.html)

## Segment Consent Manager

The Segment Consent Manager is an analytics.js add-on with support to consent management.

At its core, the Consent Manager empowers your visitors to control and customize their tracking preferences on a website. They can opt out entirely of being tracked, or selectively opt out of tools in which they don’t want their information stored.

It works by taking control of the analytics.js load process to only load destinations that the user has consented to and not loading analytics.js at all if the user has opted out of everything. The user's tracking preferences are saved to a cookie and sent as an identify trait (if they haven't opted out of everything) so that you can also access them on the server-side and from destinations (warehouse).

### Features

- Give users the ability to opt-in or opt-out to tracking.
- Fine grained control of tools or categories used for tracking.
- 30s setup with a drop in script tag.
- Or fully customizable UI/UX through React components.
- EU traffic detection through [@segment/in-eu][ineu].
- Ability for visitors to reconsent and change preferences.
- Automatically updates to reflect the destinations you have enabled in Segment.
- Customizable text for localization (for versions >= 4.5.0).

## Usage

The Segment Consent Manager can be used in multiple ways, depending on how custom you want your visitor's experience to be.

To get started, make sure you're using the latest version of the [analytics.js snippet][] (4.1.0 or above) and remove the `analytics.load("YOUR_WRITE_KEY");` call (so the consent manager can manage the loading process). Then continue onto one of the implementation methods below.

### Standalone Script

The standalone script is a prebuilt bundle that uses the [ConsentManager][] React component with [Preact][] (a lightweight React alternative). It's best for if you want to get up and running quickly or you don't have a preexisting React setup.

Include the consent manager script tag after your analytic.js snippet and add your own custom copy. The standalone script can be configured in one of two ways, via data attributes for simple usage or via a global callback function for advanced usage. Both methods allow the consent manager script to be loaded async.

#### Options

All of the [ConsentManager][] options are supported with the addition of these options:

##### container

Type: `string`

[CSS selector][] to the DOM element that will host the consent banner. It should be an empty DOM element (usually a `<div>`) because the consent manager will replace any existing DOM elements inside it. The element must also exist on the page before the script is executed.

You can also control the positioning of the consent banner by applying styles to the container element (optional). E.g:

```css
#target-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
```

```html
<div id="target-container"></div>
```

#### Globals

The following global variables are also exposed:

- `consentManager.version` - Version of the consent manager.
- `consentManager.openConsentManager()` - Opens the consent manager preferences dialog.
- `consentManager.doNotTrack()` - Utility function that returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).
- `consentManager.inEU()` - The [@segment/in-eu][ineu] `inEU()` function.
- `consentManager.preferences` - Returns an instance of `PreferencesManager` with the following helper functions:
  - `loadPreferences` - returns the cookie value for consent preferences
  - `savePreferences` - allows for managing the consent cookie programatically (useful if you want to re-hydrate consent from your own database or prefill consent options)
  - `onPreferencesSaved(callback)` - allows for subscribing to changes in preferences.

#### Callback Function

All the options are supported. The callback function also receives these exports:

- `React` - Reference to the [Preact][] library (the API is React compatible). Useful for if you need to use virtual DOM in your content.
- `version` - Version of the consent manager.
- `openConsentManager()` - Opens the consent manager preferences dialog.
- `doNotTrack()` - Utility function that returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).
- `inEU()` - The [@segment/in-eu][ineu] `inEU()` function.
- `consentManager.preferences` - Returns an instance of `PreferencesManager` with the following helper functions:
  - `loadPreferences` - returns the cookie value for consent preferences
  - `savePreferences` - allows for managing the consent cookie programatically (useful if you want to re-hydrate consent from your own database or prefill consent options)
  - `onPreferencesSaved(callback)` - allows for subscribing to changes in preferences.

```html
<script>
  window.consentManagerConfig = function (exports) {
    var React = exports.React
    var inEU = exports.inEU

    var bannerContent = React.createElement(
      'span',
      null,
      'We use cookies (and other similar technologies) to collect data to improve your experience on our site. By using our website, you՚re agreeing to the collection of data as described in our',
      ' ',
      React.createElement(
        'a',
        { href: '/docs/legal/website-data-collection-policy/', target: '_blank' },
        'Website Data Collection Policy'
      ),
      '.'
    )
    var bannerSubContent = 'You can change your preferences at any time.'
    var preferencesDialogTitle = 'Website Data Collection Preferences'
    var preferencesDialogContent =
      'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.'
    var cancelDialogTitle = 'Are you sure you want to cancel?'
    var cancelDialogContent =
      'Your preferences have not been saved. By continuing to use our website, you՚re agreeing to our Website Data Collection Policy.'

    return {
      container: '#target-container',
      writeKey: '<your-segment-write-key>',
      shouldRequireConsent: inEU,
      bannerContent: bannerContent,
      bannerSubContent: bannerSubContent,
      preferencesDialogTitle: preferencesDialogTitle,
      preferencesDialogContent: preferencesDialogContent,
      cancelDialogTitle: cancelDialogTitle,
      cancelDialogContent: cancelDialogContent,
    }
  }
</script>

<script
  src="https://unpkg.com/@segment/consent-manager@4.3.0/standalone/consent-manager.js"
  defer
></script>
```

### ConsentManager

The `ConsentManager` React component is a prebuilt consent manager UI (it's the one we use on https://segment.com) that uses the [ConsentManagerBuilder][] component under the hood. To use it, just mount the component where you want the consent banner to appear and pass in your own custom copy.

#### Props

##### writeKey

Type: `string`

The write key analytics.js should be loaded with.

##### otherWriteKeys

Type: `array<string>`<br>
Default: `[]`

Other write keys that you want to load destination information for. This is useful for including your server-side destinations in the consent manager, so that you can easily apply the user's tracking preferences to your server-side analytics too. _No data will be sent to these write keys._

##### shouldRequireConsent

Type: `function`<br>
Default: `() => true`

Callback function that determines if consent is required before tracking can begin. Return `true` to show the consent banner and wait for consent (if no consent has been given yet). Return `false` to not show the consent banner and start tracking immediately (unless the user has opted out). The function can return a `Promise` that resolves to a boolean.

##### closeBehavior

Type: `enum|string` or `function`<br>
Default: `dismiss`

An option to determine what should be the default behavior for the `x` button on the consent manager banner.

Options:

- `dismiss` (default) - Dismisses the banner, but don't save or change any preferences. Analytics.js won't be loaded until explicit consent is given.
- `accept` - Assume consent across every category **based on initial preferences**.
- `deny` - Denies consent across every category.

`closeBehavior` can also be customized - i.e. don't load some categories, but load everything else. For example, if you wanted to load everything _except_ advertising, you could pass the following as `closeBehavior`:

```
closeBehavior={
  (categories) => ({
    ...categories,
    advertising: false
  })
}
```

##### cancelBehavior

**_New Feature_** (versions < 4.6.0 do not support this feature)

Type: `enum|string` or `function`<br>
Default: `dismiss`

An option to determine what should be the default behavior for the `Yes, cancel` button in the Cancel modal.

Options:

- `dismiss` (default) - Dismisses the modal, but keep the banner, and don't save or change any preferences. Analytics.js won't be loaded until explicit consent is given.
- `accept` - Assume consent across every category **based on initial preferences**.
- `deny` - Denies consent across every category.

`cancelBehavior` can also be customized just like `closeBehavior` - i.e. don't load some categories, but load everything else. For example, if you wanted to load everything _except_ advertising, you could pass the following as `closeBehavior`:

```
cancelBehavior={
  (categories) => ({
    ...categories,
    advertising: false
  })
}
```

##### implyConsentOnInteraction

**_Breaking Change_** (versions < 3.0.0 will default this option `true`)

Type: `boolean`<br>
Default: `false` (as of 3.0.0)

Whether or not consent should be implied if the user interacts with the website (clicks anywhere outside the consent manager banner or dialogs).

##### cookieDomain

Type: `string`<br>
Default: the [top most domain][top-domain] and all sub domains

The domain the `tracking-preferences` cookie should be scoped to.

##### bannerContent

Type: `PropTypes.node` | `string`<br>
Default: `'We use cookies (and other similar technologies) to collect data to improve your experience on our site. By using our website, you’re agreeing to the collection of data as described in our Website Data Collection Policy.'`

The consent of the consent banner.

##### bannerSubContent

Type: `PropTypes.node` | `string`<br>
Default: `'You can change your preferences at any time.'`

The call to action under the content in the consent banner.

##### bannerTextColor

Type: `string`<br>
Default: `#fff`

The color of the consent banner text.

##### bannerBackgroundColor

Type: `string`<br>
Default: `#1f4160`

The color of the consent banner background.

##### preferencesDialogTitle

Type: `PropTypes.node` | `string`<br>
Default: `'Website Data Collection Preferences'`

The title of the preferences dialog.

##### preferencesDialogContent

Type: `PropTypes.node` | `string`<br>
Default:

```javascript
<>
  <p>
    We use data collected by cookies and JavaScript libraries to improve your browsing experience,
    analyze site traffic, deliver personalized advertisements, and increase the overall performance
    of our site.
  </p>
  <p>By using our website, you’re agreeing to our Website Data Collection Policy.</p>
  <p>
    The table below outlines how we use this data by category. To opt out of a category of data
    collection, select “No” and save your preferences.
  </p>
</>
```

The top descriptive content of the preferences dialog.

##### cancelDialogTitle

Type: `PropTypes.node` | `string`<br>
Default: `'Are you sure you want to cancel?'`

The title of the cancel dialog.

##### cancelDialogContent

Type: `PropTypes.node` | `string`<br>
Default: `'Your preferences have not been saved. By continuing to use our website, you’re agreeing to our Website Data Collection Policy.'`

The content of the cancel dialog.

##### customCategories

Type: `PropTypes.object`<br>
Default: `undefined`

An object representing custom consent categories - mapping custom categories to Segment integrations, i.e:

```javascript
const customCategories = {
  'New Category': {
    purpose: 'A new consent category to capture more granular consent groupings.',
    example: 'For example, we use these to alert our developers if something goes wrong.',
    integrations: ['Google Adwords (Classic)', 'Amplitude', 'Slack'],
  },
}
```

The values for `integrations` should be an integration's creationName (`integration.creationName`). You can find examples of that by going to `https://cdn.segment.com/v1/projects/<writeKey>/integrations`

##### translations

**_New Feature_** (versions < 4.5.0 do not support translations)

Type: `PropTypes.object`<br>
Default:

```javascript
{
  en: {
    'ui.save': 'Save',
    'ui.cancel': 'Cancel',
    'ui.yes': 'Yes',
    'ui.no': 'No',
    'ui.not_available': 'N/A',
    'ui.go_back': 'Go Back',
    'ui.yes_cancel': 'Yes, Cancel',
    'ui.header.allow': 'Allow',
    'ui.header.category': 'Category',
    'ui.header.purpose': 'Purpose',
    'ui.header.tools': 'Tools',
    'ui.banner.content':
      'We use cookies (and other similar technologies) to collect data to improve your experience on our site. By using our website, you’re agreeing to the collection of data as described in our Website Data Collection Policy.',
    'ui.banner.subContent': 'You can change your preferences at any time.',
    'ui.preferences.title': 'Website Data Collection Preferences',
    'ui.preferences.content': React.createElement(React.Fragment, null, [
      React.createElement(
        'p',
        null,
        'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.'
      ),
      React.createElement(
        'p',
        null,
        'By using our website, you’re agreeing to our Website Data Collection Policy.'
      ),
      React.createElement(
        'p',
        null,
        'The table below outlines how we use this data by category. To opt out of a category of data collection, select “No” and save your preferences.'
      ),
    ]),
    'ui.cancel.title': 'Are you sure you want to cancel?',
    'ui.cancel.content':
      'Your preferences have not been saved. By continuing to use our website, you’re agreeing to our Website Data Collection Policy.',
    'aria.functional.allow': 'Allow functional tracking',
    'aria.functional.disallow': 'Disallow functional tracking',
    'aria.marketing.allow': 'Allow marketing and analytics tracking',
    'aria.marketing.disallow': 'Disallow marketing and analytics tracking',
    'aria.advertising.allow': 'Allow advertising tracking',
    'aria.advertising.disallow': 'Disallow advertising tracking',
    'category.functional': 'Functional',
    'category.marketing': 'Marketing and Analytics',
    'category.advertising': 'Advertising',
    'category.essential': 'Essential',
    'purpose.functional.explanation':
      'To monitor the performance of our site and to enhance your browsing experience.',
    'purpose.functional.example':
      'For example, these tools enable you to communicate with us via live chat.',
    'purpose.marketing.explanation':
      'To understand user behavior in order to provide you with a more relevant browsing experience or personalize the content on our site.',
    'purpose.marketing.example':
      'For example, we collect information about which pages you visit to help us present more relevant information.',
    'purpose.advertising.explanation':
      'To personalize and measure the effectiveness of advertising on our site and other websites.',
    'purpose.advertising.example':
      'For example, we may serve you a personalized ad based on the pages you visit on our site.',
    'purpose.essential.explanation':
      'We use browser cookies that are necessary for the site to work as intended.',
    'purpose.essential.example':
      'For example, we store your website data collection preferences so we can honor them if you return to our site. You can disable these cookies in your browser settings but if you do the site may not work as intended.'
  }
}
```

An object representing translations for any number of locales (e.g. `{ 'en-US': {...}, 'en-GB': {...} }`).

##### locale

**_New Feature_** (versions < 4.5.0 do not support translations)

Type: `string`<br>
Default: `'en'`

A string representing the current locale that should be used when looking up translations.

#### Basic Example

```javascript
import React from 'react'
import { ConsentManager, openConsentManager } from '@segment/consent-manager'
import inEU from '@segment/in-eu'

export default function () {
  const bannerContent = (
    <span>
      We use cookies (and other similar technologies) to collect data to improve your experience on
      our site. By using our website, you’re agreeing to the collection of data as described in our{' '}
      <a href="/docs/legal/website-data-collection-policy/" target="_blank">
        Website Data Collection Policy
      </a>
      .
    </span>
  )

  return (
    <div>
      <ConsentManager
        writeKey="<your-segment-write-key>"
        shouldRequireConsent={inEU}
        bannerContent={bannerContent}
      />

      <button type="button" onClick={openConsentManager}>
        Website Data Collection Preferences
      </button>
    </div>
  )
}
```

#### Translation Example

```javascript
import React from 'react'
import { ConsentManager, openConsentManager } from '@segment/consent-manager'
import inEU from '@segment/in-eu'

export default function () {
  const banner = {
    header: 'Cookies auf Beispiel',
    content:
      'Wir verwenden Cookies für ein komfortableres Nutzererlebnis und zu Analyse- und Marketing-zwecken. Du kannst diese Cookies jederzeit deaktivieren.',
  }
  const preference = {
    description:
      'Segment verwendet Daten, die von Cookies und JavaScript-Bibliotheken gesammelt wurden, um Ihr Surf-Erlebnis zu verbessern, den Website-Verkehr zu analysieren, personalisierte Werbung zu liefern und die Gesamtleistung unserer Website zu steigern.',
    warning:
      'Durch die Nutzung unserer Website stimmen Sie unserer Richtlinie zur Website-Datenerfassung zu.',
    explanation:
      'Die nachstehende Tabelle gibt einen Überblick über die Verwendung dieser Daten nach Kategorien. Um eine Kategorie der Datenerhebung abzulehnen, wählen Sie "Nein" und speichern Sie Ihre Präferenzen.',
  }

  const translations = {
    de: {
      'ui.save': 'Speichern',
      'ui.cancel': 'Abbrechen',
      'ui.yes': 'Ja',
      'ui.no': 'Nein',
      'ui.not_available': 'NICHT VERFÜGBAR',
      'ui.go_back': 'Zurückgehen',
      'ui.yes_cancel': 'Ja, abbrechen',
      'ui.header.allow': 'Erlauben',
      'ui.header.category': 'Kategorie',
      'ui.header.purpose': 'Zweck',
      'ui.header.tools': 'Werkzeuge',
      'ui.banner.content': React.createElement(React.Fragment, null, [
        React.createElement('strong', null, banner.header),
        React.createElement('div', null, banner.content),
      ]),
      'ui.banner.subContent': 'INFORMATIONEN & EINSTELLUNGEN',
      'ui.preferences.title': 'Website-Datenerhebungs-Präferenzen',
      'ui.preferences.content': React.createElement(React.Fragment, null, [
        React.createElement('p', null, preference.description),
        React.createElement('p', null, preference.warning),
        React.createElement('p', null, preference.explanation),
      ]),
      'ui.cancel.title': 'Sind Sie sicher, dass Sie absagen wollen?',
      'ui.cancel.content':
        'Ihre Einstellungen wurden nicht gespeichert. Wenn Sie unsere Website weiterhin nutzen, stimmen Sie unserer Richtlinie zur Datenerfassung auf der Website zu.',
      'aria.functional.allow': 'Funktionales Verfolgung erlauben',
      'aria.functional.disallow': 'Funktionale Verfolgung verbieten',
      'aria.marketing.allow': 'Marketing und Analyse-Verfolgung erlauben',
      'aria.marketing.disallow': 'Marketing und Analyse-Verfolgung verbieten',
      'aria.advertising.allow': 'Werbetracking erlauben',
      'aria.advertising.disallow': 'Werbetracking verbieten',
      'category.functional': 'Funktionell',
      'category.marketing': 'Marketing und Analytik',
      'category.advertising': 'Werbung',
      'category.essential': 'Wesentlich',
      'purpose.functional.explanation':
        'Um die Leistung unserer Website zu überwachen und Ihr Surf-Erlebnis zu verbessern.',
      'purpose.functional.example':
        'Zum Beispiel können Sie mit diesen Tools mit uns per Live-Chat kommunizieren.',
      'purpose.marketing.explanation':
        'Um das Nutzerverhalten zu verstehen, um Ihnen ein relevanteres Browsing-Erlebnis zu bieten oder den Inhalt unserer Website zu personalisieren.',
      'purpose.marketing.example':
        'Zum Beispiel sammeln wir Informationen darüber, welche Seiten Sie besuchen, um uns zu helfen, relevantere Informationen zu präsentieren',
      'purpose.advertising.explanation':
        'Um die Wirksamkeit der Werbung auf unserer und anderen Websites zu personalisieren und zu messen.',
      'purpose.advertising.example':
        'Wir können Ihnen beispielsweise eine personalisierte Werbung auf der Grundlage der von Ihnen besuchten Seiten auf unserer Website anbieten.',
      'purpose.essential.explanation':
        'Wir verwenden Browser-Cookies, die notwendig sind, damit die Site wie beabsichtigt funktioniert.',
      'purpose.essential.example':
        'Wir speichern zum Beispiel Ihre Präferenzen für die Datenerfassung auf der Website, damit wir sie berücksichtigen können, wenn Sie zu unserer Website zurückkehren. Sie können diese Cookies in Ihren Browsereinstellungen deaktivieren, aber wenn Sie das tun, funktioniert die Website möglicherweise nicht wie beabsichtigt.',
    },
  }

  return (
    <div>
      <ConsentManager
        writeKey="<your-segment-write-key>"
        shouldRequireConsent={inEU}
        bannerContent={bannerContent}
        translations={translations}
        locale="de"
      />

      <button type="button" onClick={openConsentManager}>
        Website Data Collection Preferences
      </button>
    </div>
  )
}
```

### ConsentManagerBuilder

The `ConsentManagerBuilder` React component is a low level render props component for building your own consent manager UI. It abstracts away all the logic for fetching destinations, checking/saving consent and loading analytics.js.

#### Props

##### children

Type: `function`

The render props function that returns your UI.

##### writeKey

Type: `string`

The write key analytics.js should be loaded with.

##### otherWriteKeys

Type: `array<string>`<br>
Default: `[]`

Other write keys that you want to load destination information for. This is useful for including your server-side destinations in the consent manager, so that you can easily apply the user's tracking preferences to your server-side analytics too. _No data will be sent to these write keys._

##### shouldRequireConsent

Type: `function`<br>
Default: `() => true`

Callback function that determines if consent is required before tracking can begin. Return `true` to show the consent banner and wait for consent (if no consent has been given yet). Return `false` to not show the consent banner and start tracking immediately (unless the user has opted out). The function can return a `Promise` that resolves to a boolean.

##### initialPreferences

Type: `object`<br>
Default: `{}`

The initial value of the preferences. By default it should be an object map of `{destinationId: true|false}`. If you're using [mapCustomPreferences][] it should be an object map of your custom preferences' default values.

##### mapCustomPreferences

Type: `function`<br>
Default: `undefined`

Callback function allows you to use a custom preferences format (e.g: categories) instead of the default destination based one. The function gets called during the consent saving process and gets passed `(destinations, preferences)`. The function should return `{destinationPreferences, customPreferences}` where `destinationPreferences` is your custom preferences mapped to the destinations format (`{destiantionId: true|false}`) and `customPreferences` is your custom preferences if you changed them in the callback (optional).

##### cookieDomain

Type: `string`<br>
Default: the [top most domain][top-domain] and all sub domains

The domain the `tracking-preferences` cookie should be scoped to.

#### Render Props

##### destinations

Type: `array<object>`<br>
Default: `[]`

Destinations enabled for the provided write keys. Each destination contains these properties:

```
{
  id,
  name,
  description,
  website,
  category
}
```

##### newDestinations

Type: `array<object>`<br>
Default: `[]`

New destinations that have been enabled since the user last gave consent.

##### preferences

Type: `object`<br>
Default: `{}`

The current preferences in state. By default if should be in the format of `{destinationId: true|false}`, but if you're using [mapCustomPreferences][] the object map can be in any format you want. _Note: this isn't the saved preferences._

##### havePreferencesChanged

Type: `boolean`<br>
Default: `false`

A boolean value representing whether or not the user has changed their preferences since opening the preferences modal. Will be set to `true` if the user interacts with the preferences modal by selecting "Yes" or "No" on any of the consent categories.

This is used to not reload the page if no preferences have changed, as to not create a disruptive user experience.

##### isConsentRequired

Type: `boolean`<br>
Default: `true`

The result of [shouldRequireConsent][].

##### setPreferences

Type: `function(object|boolean)`

Sets a preference to a new value in state. By default it takes an object map in the format of `{destinationId: true|false}`, but if you're using [mapCustomPreferences][] the object map can be in any format you want. It behaves like `setState()` in that you can set one or more preferences at a time and they get merged with what's currently in state. You can also pass a boolean to set all destination preferences to `true` or `false` (you shouldn't do this if you're using [mapCustomPreferences][]).

##### resetPreferences

Type: `function`

Resets the [preferences][] state to the value saved in the cookie. Useful for resetting the state when the preferences dialog is closed without saving for example.

##### saveConsent

Type: `function(object|boolean)`

Saves the preferences currently in state to a cookie called `tracking-preferences`, triggers an identify call with `destinationTrackingPreferences` and `customTrackingPreferences` traits and then reloads analytics.js using the new preferences. It can also be passed preferences like [setPreferences][] to do a final update before saving.

#### Example

For a more detailed/advanced example, checkout the [ConsentManager implementation][].

```javascript
import React from 'react'
import { ConsentManagerBuilder } from '@segment/consent-manager'

export default function () {
  return (
    <ConsentManagerBuilder writeKey="<your-segment-write-key>">
      {({ destinations, preferences, setPreferences, saveConsent }) => (
        <div>
          <h2>Tracking tools</h2>
          <ul>
            {destinations.map((destination) => (
              <li key={destination.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(preferences[destination.id])}
                    onChange={() =>
                      setPreferences({
                        [destination.id]: !preferences[destination.id],
                      })
                    }
                  />
                  {destination.name}
                </label>
              </li>
            ))}
          </ul>

          <button type="button" onClick={() => saveConsent()}>
            Save
          </button>
          <button type="button" onClick={() => saveConsent(true)}>
            Allow all
          </button>
          <button type="button" onClick={() => saveConsent(false)}>
            Deny all
          </button>
        </div>
      )}
    </ConsentManagerBuilder>
  )
}
```

### Utility functions

- `openConsentManager()` - Opens the [ConsentManager][] preferences dialog.
- `doNotTrack()` - Returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).

## Development

To run our storybook locally, simply do:

```
$ yarn dev
```

and the storybook should be opened in your browser. We recommend adding a new story for new features, and testing against existing stories when making bug fixes.

### Publishing New Version

This package follows semantic versioning. To publish a new version:

```
$ npm version <new-version>
$ npm publish
```

## License

consent-manager is released under the MIT license.

Copyright © 2018, Segment.io, Inc.

[analytics.js snippet]: https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet
[preact]: https://preactjs.com
[currentscript]: https://caniuse.com/#feat=document-currentscript
[ineu]: https://github.com/segmentio/in-eu
[consentmanager]: #consentmanager
[consentmanagerbuilder]: #consentmanagerbuilder
[top-domain]: https://github.com/segmentio/top-domain
[mapcustompreferences]: #mapcustompreferences
[shouldrequireconsent]: #shouldrequireconsent-1
[preferences]: #preferences
[setpreferences]: #setpreferences
[consentmanager implementation]: src/consent-manager
[css selector]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
