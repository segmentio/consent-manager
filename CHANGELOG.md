# Changelog

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
