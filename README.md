# consent-manager [![build status](https://circleci.com/gh/segmentio/consent-manager.svg?style=svg&circle-token=d3a9e0da7a07fb443f1b4e558ad9c60a55dca223)](https://circleci.com/gh/segmentio/consent-manager)

> Drop-in consent management plugin for analytics.js

[StoryBook](https://segmentio.github.io/consent-manager/index.html)

## Segment Consent Manager

The Segment Consent Manager is an analytics.js add-on with support to consent management.

At its core, the Consent Manager empowers your visitors to control and customize their tracking preferences on a website. They can opt out entirely of being tracked, or selectively opt out of tools in which they don’t want their information stored.

It works by taking control of the analytics.js load process to only load destinations that the user has consented to and not loading analytics.js at all if the user has opted out of everything. The user's tracking preferences are saved to a cookie and sent as an identify trait (if they haven't opted out of everything) so that you can also access them on the server-side and from destinations (warehouse).

_Segment works to ensure the Consent Manager Tech Demo works with most of our product pipeline. We cannot ensure it works in your specific implementation or website. Please contact our Professional Services team for implementation support. Please see the License.txt included._

### Features

- Give users the ability to opt-in or opt-out to tracking.
- Fine grained control of tools or categories used for tracking.
- 30s setup with a drop in script tag.
- Or fully customizable UI/UX through React components.
- EU traffic detection through [@segment/in-eu][ineu].
- Ability for visitors to reconsent and change preferences.
- Automatically asks again for consent after 12 months (365 days).
- Automatically updates to reflect the destinations you have enabled in Segment.
- **5.0.0**: Consent Manager will add consent metadata to the context of all track calls:

Track call message payloads will be extended to include Consent metadata in the `context` object:

```
{
  "context": {
    "campaign": {},
    "consent": {
      "categoryPreferences": {
        "Amplitude": true,
        "Customer.io": true,
        "Google Analytics": true,
        "Webhooks": true
      },
      "defaultDestinationBehavior": "disable",
      "destinationPreferences": {
        "Amplitude": true,
        "Customer.io": true,
        "Google Analytics": true,
        "Webhooks": true
      }
    }
  },
  "event": "Send Track Event Clicked",
  "integrations": {
    "All": false,
    "Amplitude": true,
    "HubSpot": false,
    "Salesforce": false,
    "Segment.io": true
  }
}
```

**Breaking Changes:** Version 5.0.0 and above require that your analytics.js snippet include the method `addSourceMiddleware` in the `analytics.methods` array:

```
analytics.methods = [
  'trackSubmit',
  'trackClick',
  'trackLink',
  'trackForm',
  'pageview',
  'identify',
  'reset',
  'group',
  'track',
  'ready',
  'alias',
  'debug',
  'page',
  'once',
  'off',
  'on',
  'addSourceMiddleware' // This method is necessary for Consent Manager to forward consent metadata.
]
```

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
  window.consentManagerConfig = function(exports) {
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
      cancelDialogContent: cancelDialogContent
    }
  }
</script>

<script
  src="https://unpkg.com/@segment/consent-manager@5.0.0/standalone/consent-manager.js"
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
- `accept` - Assume consent across every category.
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

##### implyConsentOnInteraction

**_Breaking Change_** (versions < 3.0.0 will default this option `true`)

Type: `boolean`<br>
Default: `false` (as of 3.0.0)

Whether or not consent should be implied if the user interacts with the website (clicks anywhere outside the consent manager banner or dialogs).

##### defaultDestinationBehavior

Type: `string`<br>
Default: 'disable'

Determines how newly detected destinations are treated when the user already has a cookie set on their browser. This will be relevent when you've added a connected a new destination to any of the sources managed by Consent Manager.

Options:

- `disable` (default) - Newly detected destinations are by default, disabled.
- `enable` - Newly detected destinations are by default, enabled.
- `imply` - Newly detected destinations are by default, enabled or disabled, depending on the user's consent to the consent group that the new destination belongs to.
  - For example, if a user has already consented to the "marketingAndAnalytics" category, and we detect a new destination with category "Analytics", that destination will be enabled.
- `ask` - If we detect new destinations upon initializing the Consent Manager, the preferences dialog will automatically open, asking the user for their consent again.

##### cookieDomain

Type: `string`<br>
Default: the [top most domain][top-domain] and all sub domains

The domain the `tracking-preferences` cookie should be scoped to.

##### cookieExpires

Type: `number`<br>
Default: 365

The number of dates until the `tracking-preferences` cookie should expire.

##### bannerContent

Type: `PropTypes.node`

The consent of the consent banner.

##### bannerSubContent

Type: `PropTypes.node`

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

Type: `PropTypes.node`<br>
Default: `Website Data Collection Preferences`

The title of the preferences dialog.

##### preferencesDialogContent

Type: `PropTypes.node`

The top descriptive content of the preferences dialog.

##### cancelDialogTitle

Type: `PropTypes.node`<br>
Default: `Are you sure you want to cancel?`

The title of the cancel dialog.

##### cancelDialogContent

Type: `PropTypes.node`

The content of the cancel dialog.

##### customCategories

Type: `PropTypes.object`<br>
Default: `undefined`

An object representing custom consent categories - mapping custom categories to Segment integrations, i.e:

```javascript
const customCategories = {
  'New Category': {
    purpose: 'A new consent category to capture more granular consent groupings',
    integrations: ['Google Adwords (Classic)', 'Amplitude', 'Slack']
  }
}
```

The values for `integrations` should be an integration's creationName (`integration.creationName`). You can find examples of that by going to `https://cdn.segment.com/v1/projects/<writeKey>/integrations`

#### Example

```javascript
import React from 'react'
import { ConsentManager, openConsentManager } from '@segment/consent-manager'
import inEU from '@segment/in-eu'

export default function() {
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
  const bannerSubContent = 'You can change your preferences at any time.'
  const preferencesDialogTitle = 'Website Data Collection Preferences'
  const preferencesDialogContent =
    'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.'
  const cancelDialogTitle = 'Are you sure you want to cancel?'
  const cancelDialogContent =
    'Your preferences have not been saved. By continuing to use our website, you՚re agreeing to our Website Data Collection Policy.'

  return (
    <div>
      <ConsentManager
        writeKey="<your-segment-write-key>"
        shouldRequireConsent={inEU}
        bannerContent={bannerContent}
        bannerSubContent={bannerSubContent}
        preferencesDialogTitle={preferencesDialogTitle}
        preferencesDialogContent={preferencesDialogContent}
        cancelDialogTitle={cancelDialogTitle}
        cancelDialogContent={cancelDialogContent}
      />

      <button type="button" onClick={openConsentManager}>
        Website Data Collection Preferences
      </button>
    </div>
  )
}
```

##### cdnHost

Type: `string`<br>
Default: `cdn.segment.com`

The CDN to fetch list of integrations from

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

##### defaultDestinationBehavior

Type: `string`<br>
Default: 'disable'

Determines how newly detected destinations are treated when the user already has a cookie set on their browser. This will be relevent when you've added a connected a new destination to any of the sources managed by Consent Manager.

Options:

- `disable` (default) - Newly detected destinations are by default, disabled.
- `enable` - Newly detected destinations are by default, enabled.
- `imply` - Newly detected destinations are by default, enabled or disabled, depending on the user's consent to the consent group that the new destination belongs to.
  - For example, if a user has already consented to the "marketingAndAnalytics" category, and we detect a new destination with category "Analytics", that destination will be enabled.

This setting will also also affect replays to new destinations. Only `disable` and `enable` will apply to these replays. Setting `defaultDestinationBehavior` to `imply` here will be interpreted as `enable` during a replay.

##### mapCustomPreferences

Type: `function`<br>
Default: `undefined`

Callback function allows you to use a custom preferences format (e.g: categories) instead of the default destination based one. The function gets called during the consent saving process and gets passed `(destinations, preferences)`. The function should return `{destinationPreferences, customPreferences}` where `destinationPreferences` is your custom preferences mapped to the destinations format (`{destiantionId: true|false}`) and `customPreferences` is your custom preferences if you changed them in the callback (optional).

##### cookieDomain

Type: `string`<br>
Default: the [top most domain][top-domain] and all sub domains

The domain the `tracking-preferences` cookie should be scoped to.

#### cookieExpires

Type: `number`<br>
Default: 365

The number of dates until the `tracking-preferences` cookie should expire.

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

##### destinationPreferences

Type: `object`<br>
Default: `{}`

The current _destination specific_ preferences, i.e. `{Amplitude: true}`.

##### havePreferencesChanged

Type: `boolean`<br>
Default: `false`

A boolean value representing whether or not the user has changed their preferences since opening the preferences modal. Will be set to `true` if the user interacts with the preferences modal by selecting "Yes" or "No" on any of the consent categories.

This is used to not reload the page if no preferences have changed, as to not create a disruptive user experience.

##### isConsentRequired

Type: `boolean`<br>
Default: `true`

The result of [shouldRequireConsent][].

##### workspaceAddedNewDestinations

Type: `boolean`<br>
Default: `false`

A boolean value representing whether or not there have been new destinations connected to the source(s) managed by Consent Manager, compared to the destinations set on the existing cookie.

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

export default function() {
  return (
    <ConsentManagerBuilder writeKey="<your-segment-write-key>">
      {({ destinations, preferences, setPreferences, saveConsent }) => (
        <div>
          <h2>Tracking tools</h2>
          <ul>
            {destinations.map(destination => (
              <li key={destination.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(preferences[destination.id])}
                    onChange={() =>
                      setPreferences({
                        [destination.id]: !preferences[destination.id]
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

##### cdnHost

Type: `string`<br>
Default: `cdn.segment.com`

The CDN to fetch list of integrations from

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
