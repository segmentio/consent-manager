# Changelog

## 5.8.1 (May 30, 2023)

- [333](https://github.com/segmentio/consent-manager/pull/333) Allows setting the initial value of preferences to `N/A`.

## 5.8.0 (Mar 22, 2023)

- [297](https://github.com/segmentio/consent-manager/pull/297) Add devmode to disable analytics.load
- [301](https://github.com/segmentio/consent-manager/pull/301) Update libraries dependencies
- [310](https://github.com/segmentio/consent-manager/pull/310) Fixed Fullstory destination name

## 5.7.0 (Dec 13, 2022)

- [288](https://github.com/segmentio/consent-manager/pull/288) Fix reload clicking inside banner
- [283](https://github.com/segmentio/consent-manager/pull/283) Add shouldReload on ConsentManagerBuilder like optional attribute
- [281](https://github.com/segmentio/consent-manager/pull/281) Replace lodash-es by lodash to fix error with nextJs
- [277](https://github.com/segmentio/consent-manager/pull/277) docs: fix link to nextjs example in table of contents
- [274](https://github.com/segmentio/consent-manager/pull/274) Allow passing additional cookie attributes
- [272](https://github.com/segmentio/consent-manager/pull/272) Add src folder to files array on package.json
- [271](https://github.com/segmentio/consent-manager/pull/271) Change enum closeBehavior to type
- [269](https://github.com/segmentio/consent-manager/pull/269) Add nanoid like sufix to preferenceDialogForm
- [268](https://github.com/segmentio/consent-manager/pull/268) Update type for bannerSubContent and subContent
- [261](https://github.com/segmentio/consent-manager/pull/261) Fix acceptAll method on container
- [258](https://github.com/segmentio/consent-manager/pull/258) Add param coockeName to method on loadPreference on Preference interface
- [248](https://github.com/segmentio/consent-manager/pull/248) Remove validation to show deny button on modal

## 5.6.0 (July 8, 2022)

- [237](https://github.com/segmentio/consent-manager/pull/237) Change emotion/core to emotion/react, and fix issue on dialog
- [234](https://github.com/segmentio/consent-manager/pull/234) Update imports libraries of lodash to lodash-es
- [232](https://github.com/segmentio/consent-manager/pull/232) Update library on eventsource
- [228](https://github.com/segmentio/consent-manager/pull/228) Change tracking preference to save automatically the cookies

## 5.5.0 (May 25, 2022)

- [#216](https://github.com/segmentio/consent-manager/pull/216) Update emotion library
- [#220](https://github.com/segmentio/consent-manager/pull/220) Update isomorphic-fetch library to fix vulnerabilities
- [#222](https://github.com/segmentio/consent-manager/pull/222) Upgrade to react 18 library
- [#223](https://github.com/segmentio/consent-manager/pull/223) Replace container div with Fragment
- [#227](https://github.com/segmentio/consent-manager/pull/227) support FullStory (actions) as integration
- [#228](https://github.com/segmentio/consent-manager/pull/228) Fix Tracking Preferences cookie is saved automatically

## 5.4.0 (Nov 30, 2021)

- [#184](https://github.com/segmentio/consent-manager/pull/184) Fix the behavior of `initialPreferences`
- [#192](https://github.com/segmentio/consent-manager/pull/192) Fix linting, dependency upgrade
- [#188](https://github.com/segmentio/consent-manager/pull/188) Allow TS to generate code for enum
- [#180](https://github.com/segmentio/consent-manager/pull/180) Add id to preference dialog form
- [#179](https://github.com/segmentio/consent-manager/pull/179) Typescript improvement
- [#176](https://github.com/segmentio/consent-manager/pull/176) Allow customizing the texts of the preferences dialog
- [#173](https://github.com/segmentio/consent-manager/pull/173) Fix implyConsentOnInteraction behavior
- [#170](https://github.com/segmentio/consent-manager/pull/170) Dependency upgrades

## 5.3.0 (Sept 13, 2021)

- [#145](https://github.com/segmentio/consent-manager/pull/145) Introduce cookieName attribute to allow a custom cookie name
- [#126](https://github.com/segmentio/consent-manager/pull/126) Fixing types directory
- [#164](https://github.com/segmentio/consent-manager/pull/164) Fix On Standalone script closeBehavior: accept does not work
- [#164](https://github.com/segmentio/consent-manager/pull/164) A possibility to add default buttons to accept/deny cookies via bannerActionsBlock
- [#164](https://github.com/segmentio/consent-manager/pull/164) A possibility to add custom buttons block via bannerActionsBlock
- [#164](https://github.com/segmentio/consent-manager/pull/164) Hide Clone button via bannerHideCloseButton
- [#164](https://github.com/segmentio/consent-manager/pull/164) Fix the dialog on iPhone
- [#164](https://github.com/segmentio/consent-manager/pull/164) Add option to show banner as modal
- [#164](https://github.com/segmentio/consent-manager/pull/164) Use only loadsh-es and remove lodash package and include only used functions instead of the whole package (reduce the final bundle size)
- [#164](https://github.com/segmentio/consent-manager/pull/164) Update webpack CLI

## 5.2.0(May 11, 2021)

- [#152](https://github.com/segmentio/consent-manager/pull/152) Add configurable expirey date for the preferences cookie
- Chore: Dependency upgrades

## 5.1.0(Nov 17, 2020)

- [#123](https://github.com/segmentio/consent-manager/pull/123) Fixed an issue where the react state wasn't being updated after the user updates the preferences via the `.savePreferences` API. This change also slightly changes how the Cancel confirmation modal is displayed.

## 5.0.2(Nov 9, 2020)

- [#111](https://github.com/segmentio/consent-manager/pull/111) Added missing TypeScript declarations in packaged output

### Added

- [#110](https://github.com/segmentio/consent-manager/pull/110) Added `cdnHost` property to allow using non-default CDN host

## 5.0.1(July 13, 2020)

### Added

- [#110](https://github.com/segmentio/consent-manager/pull/110) Added `cdnHost` property to allow using non-default CDN host

## 4.1.0(Dec 11, 2019)

### Added

- [#60](https://github.com/segmentio/consent-manager/pull/60) Add new `customCategories` option

## 4.0.1(Oct 10, 2019)

### Fixed

- Fix commonJS bundle

## 4.0.0(Oct 10, 2019)

### Breaking

- [#51](https://github.com/segmentio/consent-manager/pull/51) Deprecate data attributes and dataset

### Added

- [#48](https://github.com/segmentio/consent-manager/pull/48) Add new `closeBehavior` option
- [#49](https://github.com/segmentio/consent-manager/pull/49) Initial Preferences override
- [#52](https://github.com/segmentio/consent-manager/pull/52) Expose preferences manager

## 3.0.0(Oct 8, 2019)

### Breaking

- [#47](https://github.com/segmentio/consent-manager/pull/47) No longer imply consent on interaction

## 2.0.0

### Added

- [#46](https://github.com/segmentio/consent-manager/pull/46) ⚡️ Modernize
- [#47](https://github.com/segmentio/consent-manager/pull/47) 🙅🏻‍♀️No longer imply consent on interaction

## 1.3.1(Sep 24, 2019)

### Fixed

- [86387e6](https://github.com/segmentio/consent-manager/commit/86387e63f259fff9f34ee511b2fa6218341dfa17) Fix integrity hash
