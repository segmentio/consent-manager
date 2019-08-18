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

## Usage

The Segment Consent Manager can be used in multiple ways, depending on how custom you want your visitor's experience to be.

To get started, make sure you're using the latest version of the [analytics.js snippet][] (4.1.0 or above) and remove the `analytics.load("YOUR_WRITE_KEY");` call (so the consent manager can manage the loading process). Then continue onto one of the implementation methods below.

### Standalone Script

The standalone script is a prebuilt bundle that uses the [ConsentManager][] React component with [Inferno][] (a lightweight React alternative). It's best for if you want to get up and running quickly or you don't have a preexisting React setup.

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

#### Data Attributes

The `shouldRequireConsent` option isn't supported and the `otherWriteKeys` option should be a comma separated list.

_Note: the data attributes [won't work in Internet Explorer][currentscript] (Edge works fine though)._

```html
<script
  src="https://unpkg.com/@segment/consent-manager@1.2.0/standalone/consent-manager.js"
  integrity="sha256-N/wC00Ta5lCOuOSL3dT3NF9tb9roS8uxTPGQ2Iqe70cqo="
  crossorigin="anonymous"
  defer
  data-container="#target-container"
  data-writeKey="<your-segment-write-key>"
  data-bannerContent="We use cookies (and other similar technologies) to collect data to improve your experience on our site."
  data-bannerSubContent="Privacy Policy"
  data-privacyPolicyContent="<Privacy Policy Content>"
></script>
```

#### Callback Function

All the options are supported. The callback function also receives these exports:

- `React` - Reference to the [Inferno][] library (the API is React compatible). Useful for if you need to use virtual DOM in your content.
- `version` - Version of the consent manager.
- `openConsentManager()` - Opens the consent manager preferences dialog.
- `doNotTrack()` - Utility function that returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).
- `inEU()` - The [@segment/in-eu][ineu] `inEU()` function.

```html
<script>
  window.consentManagerConfig = function(exports) {
    var React = exports.React;
    var inEU = exports.inEU;

    var bannerContent = React.createElement(
      "span",
      null,
      "We use cookies (and other similar technologies) to collect data to improve your experience on our site. By using our website, you՚re agreeing to the collection of data as described in our",
      " ",
      React.createElement(
        "a",
        {
          href: "/docs/legal/website-data-collection-policy/",
          target: "_blank"
        },
        "Website Data Collection Policy"
      ),
      "."
    );
    const privacyPolicyContent = <div>Privancy Plicy Content goes here.</div>;
    var bannerSubContent = "Privacy Policy";

    return {
      container: "#target-container",
      writeKey: "<your-segment-write-key>",
      shouldRequireConsent: inEU,
      bannerContent: bannerContent,
      bannerSubContent: bannerSubContent,
      privacyPolicyContent: privacyPolicyContent
    };
  };
</script>
<script
  src="https://unpkg.com/@segment/consent-manager@1.2.0/standalone/consent-manager.js"
  integrity="sha256-N/iVJLiB/wC00Ta5lCOuOSL3dT3NF9tb9roS8uxTPGQ2Iqe70cqo="
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

Other write keys that you want to load destination information for. This is useful for including your server-side destinations in the consent manager, so that you can easily apply the user's tracking preferences to your server-side analytics too. _No data will be sent to these write keys._

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

##### bannerSubContent

Type: `PropTypes.node`

Clicking on this content opens up Privacy Policy Dialog.

##### bannerTextColor

Type: `string`<br>
Default: `#fff`

The color of the consent banner text.

##### bannerBackgroundColor

Type: `string`<br>
Default: `#1f4160`

The color of the consent banner background.

##### bannerHorizontalPosition

Type: `string`<br>
Default: `right`

The horizontal position of the consent banner on the screen. Possible values are `left` or `right`

##### bannerVerticalPosition

Type: `string`<br>
Default: `bottom`

The vertical position of the consent banner on the screen. Possible values are `top` or `bottom`

##### privacyPolicyContent

Type: `PropTypes.node`

The Privacy Policy content to show in Privacy Policy Dialog.

#### Example

```javascript
import React from "react";
import { ConsentManager, openConsentManager } from "@segment/consent-manager";
import inEU from "@segment/in-eu";

export default function() {
  const bannerContent = (
    <span>
      We use cookies (and other similar technologies) to collect data to improve
      your experience on our site. By using our website, you’re agreeing to the
      collection of data as described in our{" "}
      <a href="/docs/legal/website-data-collection-policy/" target="_blank">
        Website Data Collection Policy
      </a>
      .
    </span>
  );
  const privacyPolicyContent = <div>Privancy Plicy Content goes here.</div>;
  const bannerSubContent = "Click here to check Privacy Policy.";

  return (
    <div>
      <ConsentManager
        writeKey="<your-segment-write-key>"
        shouldRequireConsent={inEU}
        bannerContent={bannerContent}
        bannerSubContent={bannerSubContent}
        privacyPolicyContent={privacyPolicyContent}
      />

      <button type="button" onClick={openConsentManager}>
        Website Data Collection Preferences
      </button>
    </div>
  );
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

The current preferences in state. By default if should be in the format of `{destinationId: true|false}`, but if you're using [mapCustomPreferences][] the object map can be in any format you want. _Note: this isn't the saved preferences._

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
import React from "react";
import { ConsentManagerBuilder } from "@segment/consent-manager";

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
  );
}
```

### Utility functions

- `openConsentManager()` - Opens the [ConsentManager][] preferences dialog.
- `doNotTrack()` - Returns the user's Do Not Track preference (normalises the cross browser API differences). Returns `true`, `false` or `null` (no preference specified).

## License

consent-manager is released under the MIT license.

Copyright © 2018, Segment.io, Inc.

[analytics.js snippet]: https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet
[inferno]: https://infernojs.org/
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
