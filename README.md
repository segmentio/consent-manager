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
- EU traffic detection through [@segment/in-eu][inEU].
- Ability for visitors to reconsent and change preferences.
- Automatically updates to reflect the destinations you have enabled in Segment.

## Usage

The Segment Consent Manager can be used in multiple ways, depending on how custom you want your visitor's experience to be.

To get started, make sure you're using the latest version of the [analytics.js snippet][] and remove the `analytics.load("YOUR_WRITE_KEY");` call (so the consent manager can manage the loading process). Then continue onto one of the implementation methods below.

### Standalone Script

The standalone script is a prebuilt bundle that uses the [ConsentManager][] React component with [Inferno][] (a lightweight React alternative). It's best for if you want to get up and running quickly or you don't have a preexisting React setup.

Include the consent manager script tag after your analytic.js snippet and add your own custom copy. The standalone script can be configured in one of two ways, via data attributes for simple usage or via a global callback function for advanced usage. Both methods allow the consent manager script to be loaded async.

#### Options

All of the [ConsentManager][] options are supported with the addition of these options:

##### data-container

Type: `string`

CSS selector to the element that the consent banner should be rendered into. 

Note that a `div` must be created on the page to host the preferences modal, with an ID or class that matches the value of this `data-container` parameter. This div must be loaded before the script is executed. Make sure to style this the banner thanks to your CSS ID or class in order to position it on your page, eg:

```html
<div id="target-container" style="position: fixed; bottom: 0; left: 0; z-index: 100;"></div>
```

#### Globals

The following global variables are also exposed:

- `consentManager.version` - Version of the consent manager.
- `consentManager.openConsentManager()` - Opens the consent manager preferences dialog.
- `consentManager.doNotTrack()` - Utility function that returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).
- `consentManager.inEU()` - The [@segment/in-eu][inEU] `inEU()` function.

#### Data Attributes

The `shouldRequireConsent` option isn't supported and the `otherWriteKeys` option should be a comma separated list.

*Note: the data attributes [won't work in Internet Explorer][currentScript] (Edge works fine though).*

```html
<script
  src="https://unpkg.com/@segment/consent-manager@1.1.0/standalone/consent-manager.js"
  integrity="sha256-yRPOPV5tlN7TeNFvwD22tN4cZwEhz4rZtsp1dcfFt24="
  crossorigin="anonymous"
  defer
  data-container="#target-container"
  data-writeKey="<your-segment-write-key>"
  data-bannerContent="We use cookies (and other similar technologies) to collect data to improve your experience on our site."
  data-preferencesDialogTitle="Website Data Collection Preferences"
  data-preferencesDialogContent="We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site."
  data-cancelDialogTitle="Are you sure you want to cancel?"
  data-cancelDialogContent="Your preferences have not been saved. By continuing to use our website, you՚re agreeing to our Website Data Collection Policy."
></script>
```

#### Callback Function

All the options are supported. The callback function also receives these exports:

- `React` - Reference to the [Inferno][] library (the API is React compatible). Useful for if you need to use virtual DOM in your content.
- `version` - Version of the consent manager.
- `openConsentManager()` - Opens the consent manager preferences dialog.
- `doNotTrack()` - Utility function that returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).
- `inEU()` - The [@segment/in-eu][inEU] `inEU()` function.

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
        {href: '/docs/legal/website-data-collection-policy/', target: '_blank'},
        'Website Data Collection Policy'
      ),
      '.'
    )
    var preferencesDialogTitle = 'Website Data Collection Preferences'
    var preferencesDialogContent = 'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.'
    var cancelDialogTitle = 'Are you sure you want to cancel?'
    var cancelDialogContent = 'Your preferences have not been saved. By continuing to use our website, you՚re agreeing to our Website Data Collection Policy.'

    return {
      container: '#target-container',
      writeKey: '<your-segment-write-key>',
      shouldRequireConsent: inEU,
      bannerContent: bannerContent,
      preferencesDialogTitle: preferencesDialogTitle,
      preferencesDialogContent: preferencesDialogContent,
      cancelDialogTitle: cancelDialogTitle,
      cancelDialogContent: cancelDialogContent
    }
  }
</script>
<script
  src="https://unpkg.com/@segment/consent-manager@1.1.0/standalone/consent-manager.js"
  integrity="sha256-yRPOPV5tlN7TeNFvwD22tN4cZwEhz4rZtsp1dcfFt24="
  crossorigin="anonymous"
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

Other write keys that you want to load destination information for. This is useful for including your server-side destinations in the consent manager, so that you can easily apply the user's tracking preferences to your server-side analytics too. *No data will be sent to these write keys.*

##### shouldRequireConsent

Type: `function`<br>
Default: `() => true`

Callback function that determines if consent is required before tracking can begin. Return `true` to show the consent banner and wait for consent (if no consent has been given yet). Return `false` to not show the consent banner and start tracking immediately (unless the user has opted out). The function can return a `Promise` that resolves to a boolean.

##### implyConsentOnInteraction

Type: `boolean`<br>
Default: `true`

Whether or not consent should be implied if the user interacts with the website (clicks anywhere outside the consent manager banner or dialogs).

##### cookieDomain

Type: `string`<br>
Default: the [top most domain][top-domain] and all sub domains

The domain the `tracking-preferences` cookie should be scoped to.

##### bannerContent

Type: `PropTypes.node`

The consent of the consent banner.

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

#### Example

```javascript
import React from 'react'
import {ConsentManager, openConsentManager} from '@segment/consent-manager'
import inEU from '@segment/in-eu'

export default function() {
  const bannerContent = (
    <span>
      We use cookies (and other similar technologies) to collect data to improve
      your experience on our site. By using our website, you’re agreeing to the
      collection of data as described in our{' '}
      <a href="/docs/legal/website-data-collection-policy/" target="_blank">
        Website Data Collection Policy
      </a>.
    </span>
  )
  const preferencesDialogTitle = 'Website Data Collection Preferences'
  const preferencesDialogContent = 'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.'
  const cancelDialogTitle = 'Are you sure you want to cancel?'
  const cancelDialogContent = 'Your preferences have not been saved. By continuing to use our website, you՚re agreeing to our Website Data Collection Policy.'

  return (
    <div>
      <ConsentManager
        writeKey="<your-segment-write-key>"
        shouldRequireConsent={inEU}
        bannerContent={bannerContent}
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

Other write keys that you want to load destination information for. This is useful for including your server-side destinations in the consent manager, so that you can easily apply the user's tracking preferences to your server-side analytics too. *No data will be sent to these write keys.*

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

Callback function allows you to use a custom preferences format (e.g: categories) instead of the default destination based one. The function gets called during the consent saving process and gets passed `{destinations, preferences}`. The function should return `{destinationPreferences, customPreferences}` where `destinationPreferences` is your custom preferences mapped to the destinations format (`{destiantionId: true|false}`) and `customPreferences` is your custom preferences if you changed them in the callback (optional).

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

The current preferences in state. By default if should be in the format of `{destinationId: true|false}`, but if you're using [mapCustomPreferences][] the object map can be in any format you want. *Note: this isn't the saved preferences.*

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
import {ConsentManagerBuilder} from '@segment/consent-manager'

export default function() {
  return (
    <ConsentManagerBuilder writeKey="<your-segment-write-key>">
      {({destinations, preferences, setPreferences, saveConsent}) => (
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

### Utility functions

- `openConsentManager()` - Opens the [ConsentManager][] preferences dialog.
- `doNotTrack()` - Returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).


## License

consent-manager is released under the MIT license.

Copyright © 2018, Segment.io, Inc.


[analytics.js snippet]: https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet
[Inferno]: https://infernojs.org/
[currentScript]: https://caniuse.com/#feat=document-currentscript
[inEU]: https://github.com/segmentio/in-eu
[ConsentManager]: #consentmanager
[ConsentManagerBuilder]: #consentmanagerbuilder
[top-domain]: https://github.com/segmentio/top-domain
[mapCustomPreferences]: #mapcustompreferences
[shouldRequireConsent]: #shouldrequireconsent-1
[preferences]: #preferences
[setPreferences]: #setpreferences
[ConsentManager implementation]: src/consent-manager
