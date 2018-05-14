# consent-manager [![build status](https://circleci.com/gh/segmentio/consent-manager.svg?style=svg&circle-token=d3a9e0da7a07fb443f1b4e558ad9c60a55dca223)](https://circleci.com/gh/segmentio/consent-manager)

> Drop-in consent management plugin for analytics.js

## Segment Consent Manager

The Segment Consent Manager is an analytics.js add-on with support to consent management.

At its core, the Consent Manager empowers your visitors to control and customize their tracking preferences on a website.
They can opt out entirely of being tracked, or selectively opt out of tools in which they don’t want their information stored.

### Features

* Give users the ability to opt-in or opt-out to tracking
* Fine grained control of tools or categories used for tracking
* 30s setup with a drop in script tag
* or fully customizable UI/UX through React components
* EU traffic detection through `@segment/in-eu`
* Ability for visitors to reconsent and change preferences

## Usage

The Segment Consent Manager can be used in multiple ways, depending on how custom you want your visitor's experience to be

### Standalone Script

Include the consent-manager script tag next to your analytic.js loading script and add your own custom copy.

```html
<button type="button" onclick="event.stopPropagation(); window.consentManager.openConsentManager()">
  Data Collection and Cookie Preferences
</button>

<script
  src="../consent-manager.js" <!-- TODO: CDN -->
  async
  data-container="#target-container"
  data-writeKey="<your-segment-write-key>"
  data-bannerContent="We collect data and use cookies to improve your experience on our site."
  data-dialogTitle="ACME Data Collection and Cookie Preferences"
  data-dialogContent="ACME collects data and uses cookies or other similar technologies to improve your browsing experience, analyze our site traffic, send tailored messages, and increase the overall performance of our site."
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

## License

---

consent-manager is released under the MIT license.

Copyright © 2018, Segment.io, Inc.
