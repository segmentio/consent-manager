# consent-manager [![build status](https://circleci.com/gh/segmentio/consent-manager.svg?style=svg&circle-token=d3a9e0da7a07fb443f1b4e558ad9c60a55dca223)](https://circleci.com/gh/segmentio/consent-manager)

> Drop-in consent management plugin for analytics.js

## Segment Consent Manager

The Segment Consent Manager is an analytics.js add-on with support to consent management.

At its core, the Consent Manager empowers your visitors to control and customize their tracking preferences on a website.
They can opt out entirely of being tracked, or selectively opt out of tools in which they don’t want their information stored.

### Features

- Give users the ability to opt-in or opt-out to tracking.
- Fine grained control of tools or categories used for tracking.
- 30s setup with a drop in script tag.
- Or fully customizable UI/UX through React components.
- EU traffic detection through [`@segment/in-eu`][inEU].
- Ability for visitors to reconsent and change preferences.

## Usage

The Segment Consent Manager can be used in multiple ways, depending on how custom you want your visitor's experience to be.

To get started, make sure you're using the latest version of the [analytics.js snippet][] and remove the `analytics.load("YOUR_WRITE_KEY");` call (so the consent manager can manage the loading process). Then continue onto one of the implementation methods below.

### Standalone Script

The standalone script is a prebuilt bundle that uses the `ConsentManager` React component with [Inferno][] (a lightweight React alternative). It's best for if you want to get up and running quickly or you don't have a preexisting React setup.

Include the consent manager script tag after your analytic.js snippet and add your own custom copy. The standalone script can be configured in one of two ways, via data attributes for simple usage or via a global callback function for advanced usage.

The following globals are also exposed:

- `consentManager.version` - Version of the consent manager.
- `consentManager.openConsentManager()` - Opens the consent manager preferences dialog.
- `consentManager.doNotTrack()` - Utility function that returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).
- `consentManager.inEU()` - The [`@segment/in-eu`][inEU] `inEU()` function.

#### Data Attributes

All the options are supported as data attributes except for the `shouldRequireConsent` option. And the `otherWriteKeys` option should be a comma separated list.

Note: the data attributes [won't work in Internet Explorer][currentScript] (Edge works fine though).

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

All the options are supported by the callback function.

```html
<script>
window.consentManagerConfig = function(exports) {
  var React = exports.React

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
  var preferencesDialogContent =
    'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.'
  var cancelDialogTitle = 'Are you sure you want to cancel?'
  var cancelDialogContent =
    'Your preferences have not been saved. By continuing to use our website, you՚re agreeing to our Website Data Collection Policy.'

  return {
    container: '#target-container',
    writeKey: '<your-segment-write-key>',
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

### React Component

Import our `ConsentManager` component and mount it anywhere on your page.

```javascript
import { ConsentManager, openConsentManager } from '@segment/consent-manager'
import inEU from '@segment/in-eu' // For conditional consenting for EU visitors

<ConsentManager
  writeKey="<your-segment-write-key>"
  bannerContent={bannerContent}
  dialogTitle={dialogTitle}
  dialogContent={dialogContent}
  {/* Your own consent preferences */}
  shouldRequireConsent={inEU}
  {/* Custom logic for implying consent */}
  implyConsentOnInteraction={false}
/>

<button type="button" onClick={openConsentManager}>
  Data Collection and Cookie Preferences
</button>
```

### Bring your own UI

Build your own custom UI and consent logic using our React Provider and React render props

```javascript
import { ConsentManagerBuilder, openConsentManager } from '@segment/consent-manager'

<ConsentManagerBuilder writeKey="<your-segment-write-key>">
  {({ destinations, newDestinations, preferences, setPreferences, saveConsent }) => {
    // Build your own UI using your favorite React components
    return (
      <form onSubmit={() => saveConsent())}>

        <h2>Tracking tools</h2>
        <ul>
          {destinations.map(destination => (
            <li key={destination.id}>
              <Checkbox
                label={destination.name}
                checked={Boolean(preferences[destination.id])}
                onChange={() =>
                  setPreferences({
                    [destination.id]: !preferences[destination.id]
                  })
                }
              />
            </li>
          ))}
        </ul>

        <button type="submit">Save</button>
        <button onClick={() => saveConsent(true)}>Allow all</button>
        <button onClick={() => saveConsent(false)}>Deny all</button>
      </form>
    )
  }
</ConsentManagerBuilder>
```

<!-- TODO
  For a full working example see: ...
-->

```javascript
// TODO: document render props
```

```javascript
ConsentManagerBuilder.propTypes = {
  /*
    Render prop you can use to customize your design
  */
  children: PropTypes.func.isRequired,
  /*
    Your Segment write key
  */
  writeKey: PropTypes.string.isRequired,
  /*
    Advanced: Any additional Segment write keys you would like to include
    e.g. a ruby or java backend write key you would like to include in the list of destinations
  */
  otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
  /*
    A function that defining whether or not the consent manager should require consent.
    Useful for custom consent tracking logic. e.g. Only track visitors in Europe
  */
  shouldRequireConsent: PropTypes.func,
  /*
    Initial category preferences.
    e.g.
    const initialPreferences = {
      marketingAndAnalytics: true,
      advertising: false, // Advertising will come unchecked by default
      functional: true
    }
  */
  initialPreferences: PropTypes.object,
  /*
    Custom mapping function for transforming Default Segment Categories into your
    own categories
  */
  mapCustomPreferences: PropTypes.func,
  /*
    Custom domain for the consent preferences cookie.
    defaults to `undefined`
  */
  cookieDomain: PropTypes.string
}
```

### Utility functions

- `openConsentManager()` - Opens the `ConsentManager` preferences dialog.
- `doNotTrack()` - Returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).


## License

---

consent-manager is released under the MIT license.

Copyright © 2018, Segment.io, Inc.


[analytics.js snippet]: https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet
[Inferno]: https://infernojs.org/
[currentScript]: https://caniuse.com/#feat=document-currentscript
[inEU]: https://github.com/segmentio/in-eu
