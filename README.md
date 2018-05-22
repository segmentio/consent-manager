# consent-manager [![build status](https://circleci.com/gh/segmentio/consent-manager.svg?style=svg&circle-token=d3a9e0da7a07fb443f1b4e558ad9c60a55dca223)](https://circleci.com/gh/segmentio/consent-manager)

> Drop-in consent management plugin for analytics.js

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

## Usage

The Segment Consent Manager can be used in multiple ways, depending on how custom you want your visitor's experience to be.

To get started, make sure you're using the latest version of the [analytics.js snippet][] and remove the `analytics.load("YOUR_WRITE_KEY");` call (so the consent manager can manage the loading process). Then continue onto one of the implementation methods below.

### Standalone Script

The standalone script is a prebuilt bundle that uses the [ConsentManager][] React component with [Inferno][] (a lightweight React alternative). It's best for if you want to get up and running quickly or you don't have a preexisting React setup.

Include the consent manager script tag after your analytic.js snippet and add your own custom copy. The standalone script can be configured in one of two ways, via data attributes for simple usage or via a global callback function for advanced usage.

#### Options

All of the [ConsentManager][] options are supported with the addition of these options:

##### container

Type: `string`

CSS selector to the element that the consent banner should be rendered into.

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
  src="https://unpkg.com/@segment/consent-manager@1.0.0/standalone/consent-manager.js"
  integrity="sha256-MHkVI5+ed0OHx8SePNujzj1EqA1OyLsVFXXCGj4SAJ8="
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
  src="https://unpkg.com/@segment/consent-manager@1.0.0/standalone/consent-manager.js"
  integrity="sha256-MHkVI5+ed0OHx8SePNujzj1EqA1OyLsVFXXCGj4SAJ8="
  crossorigin="anonymous"
  defer
></script>
```

### ConsentManager

The `ConsentManager` React component is a prebuilt consent manager UI (it's the one we use on https://segment.com) that uses the [ConsentManagerBuilder][] component under the hood. To use it, just mount the component where you want the consent banner to appear and pass in your custom copy.

#### Options

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

Build your own custom UI and consent logic using our React Provider and React render props

```javascript
import React from 'react'
import {ConsentManagerBuilder} from '@segment/consent-manager'

export default function() {
  return (
    <ConsentManagerBuilder writeKey="<your-segment-write-key>">
      {({
        destinations,
        newDestinations,
        preferences,
        setPreferences,
        saveConsent
      }) => {
        // Build your own UI using your favorite React components
        return (
          <form onSubmit={() => saveConsent()}>
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
          </form>
        )
      }}
    </ConsentManagerBuilder>
  )
}
```

### Utility functions

- `openConsentManager()` - Opens the [ConsentManager][] preferences dialog.
- `doNotTrack()` - Returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).


## License

---

consent-manager is released under the MIT license.

Copyright © 2018, Segment.io, Inc.


[analytics.js snippet]: https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet
[Inferno]: https://infernojs.org/
[currentScript]: https://caniuse.com/#feat=document-currentscript
[inEU]: https://github.com/segmentio/in-eu
[ConsentManager]: #consentmanager
[ConsentManagerBuilder]: #consentmanagerbuilder
[top-domain]: https://github.com/segmentio/top-domain
