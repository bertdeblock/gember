# Changelog

## Release (2025-12-25)

* @bertdeblock/gember 1.6.1 (patch)

#### :memo: Documentation
* `@bertdeblock/gember`
  * [#91](https://github.com/bertdeblock/gember/pull/91) Update docs ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#89](https://github.com/bertdeblock/gember/pull/89) Generate a sh*tload of tests ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-12-10)

* @bertdeblock/gember 1.6.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#87](https://github.com/bertdeblock/gember/pull/87) Support generating named exports instead of default exports for component, helper, modifier and util generators ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-11-16)

* @bertdeblock/gember 1.5.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#86](https://github.com/bertdeblock/gember/pull/86) Add controller(-test), route(-test) and util(-test) generators ([@bertdeblock](https://github.com/bertdeblock))
  * [#83](https://github.com/bertdeblock/gember/pull/83) Support generating a corresponding test file via a `--test` option ([@bertdeblock](https://github.com/bertdeblock))
  * [#81](https://github.com/bertdeblock/gember/pull/81) Support destroying files via a `--destroy` option ([@bertdeblock](https://github.com/bertdeblock))

#### :memo: Documentation
* `@bertdeblock/gember`
  * [#84](https://github.com/bertdeblock/gember/pull/84) Generate usage ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#85](https://github.com/bertdeblock/gember/pull/85) Minor internal improvements ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-11-10)

* @bertdeblock/gember 1.4.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#80](https://github.com/bertdeblock/gember/pull/80) Support running generators interactively ([@bertdeblock](https://github.com/bertdeblock))
  * [#76](https://github.com/bertdeblock/gember/pull/76) Ask the user to confirm before overwriting an existing file ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#69](https://github.com/bertdeblock/gember/pull/69) Run smoke test in CI ([@bertdeblock](https://github.com/bertdeblock))
  * [#79](https://github.com/bertdeblock/gember/pull/79) Fix generating files during development ([@bertdeblock](https://github.com/bertdeblock))
  * [#70](https://github.com/bertdeblock/gember/pull/70) Update most dependencies ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-11-08)

* @bertdeblock/gember 1.3.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#75](https://github.com/bertdeblock/gember/pull/75) Add a `defineConfig` function ([@bertdeblock](https://github.com/bertdeblock))

#### :memo: Documentation
* `@bertdeblock/gember`
  * [#73](https://github.com/bertdeblock/gember/pull/73) Fix generators type ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-10-20)

* @bertdeblock/gember 1.2.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#72](https://github.com/bertdeblock/gember/pull/72) Do not log dates (better copy-paste UX) ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#67](https://github.com/bertdeblock/gember/pull/67) Avoid duplicate templates ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-09-11)

* @bertdeblock/gember 1.1.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#66](https://github.com/bertdeblock/gember/pull/66) Support copying generated files to the clipboard ([@bertdeblock](https://github.com/bertdeblock))
  * [#65](https://github.com/bertdeblock/gember/pull/65) Add an `acceptance-test` generator ([@bertdeblock](https://github.com/bertdeblock))
  * [#64](https://github.com/bertdeblock/gember/pull/64) Test against Node v24 ([@bertdeblock](https://github.com/bertdeblock))

#### :bug: Bug Fix
* `@bertdeblock/gember`
  * [#62](https://github.com/bertdeblock/gember/pull/62) Fix test helpers import path ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-09-10)

* @bertdeblock/gember 1.0.0 (major)

#### :boom: Breaking Change
* `@bertdeblock/gember`
  * [#60](https://github.com/bertdeblock/gember/pull/60) Remove deprecated `documentName` property ([@bertdeblock](https://github.com/bertdeblock))
  * [#57](https://github.com/bertdeblock/gember/pull/57) Update generated helper, modifier and service names ([@bertdeblock](https://github.com/bertdeblock))
  * [#55](https://github.com/bertdeblock/gember/pull/55) Remove `helper` wrapper from `helper` generator ([@bertdeblock](https://github.com/bertdeblock))

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#61](https://github.com/bertdeblock/gember/pull/61) Add `component-test`, `helper-test`, `modifier-test` and `service-test` generators ([@bertdeblock](https://github.com/bertdeblock))
  * [#58](https://github.com/bertdeblock/gember/pull/58) Only generate quotes for the service registry when needed ([@bertdeblock](https://github.com/bertdeblock))
  * [#57](https://github.com/bertdeblock/gember/pull/57) Update generated helper, modifier and service names ([@bertdeblock](https://github.com/bertdeblock))
  * [#55](https://github.com/bertdeblock/gember/pull/55) Remove `helper` wrapper from `helper` generator ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#59](https://github.com/bertdeblock/gember/pull/59) Update all dependencies ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-02-14)

@bertdeblock/gember 0.7.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#53](https://github.com/bertdeblock/gember/pull/53) Remove use of scaffdog ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#54](https://github.com/bertdeblock/gember/pull/54) Remove custom `pathCase` helper ([@bertdeblock](https://github.com/bertdeblock))
  * [#53](https://github.com/bertdeblock/gember/pull/53) Remove use of scaffdog ([@bertdeblock](https://github.com/bertdeblock))
  * [#52](https://github.com/bertdeblock/gember/pull/52) Remove use of the words document, documents, ... ([@bertdeblock](https://github.com/bertdeblock))
  * [#49](https://github.com/bertdeblock/gember/pull/49) Add test for v2 apps ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2025-01-10)

@bertdeblock/gember 0.6.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#48](https://github.com/bertdeblock/gember/pull/48) Support generating nested colocated components ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#43](https://github.com/bertdeblock/gember/pull/43) Remove nested ternary operators in generator documents ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2024-11-26)

@bertdeblock/gember 0.5.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#38](https://github.com/bertdeblock/gember/pull/38) Support all CLI options in the gember config file ([@bertdeblock](https://github.com/bertdeblock))
  * [#26](https://github.com/bertdeblock/gember/pull/26) Support v1 apps and addons ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#41](https://github.com/bertdeblock/gember/pull/41) Fix Release Plan ([@bertdeblock](https://github.com/bertdeblock))
  * [#35](https://github.com/bertdeblock/gember/pull/35) Update ESLint setup ([@bertdeblock](https://github.com/bertdeblock))
  * [#34](https://github.com/bertdeblock/gember/pull/34) Update dependencies ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2024-04-17)

@bertdeblock/gember 0.4.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#14](https://github.com/bertdeblock/gember/pull/14) Support a `postGenerate` hook via a `gember.config.js` file ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2024-04-17)

@bertdeblock/gember 0.3.1 (patch)

#### :bug: Bug Fix
* `@bertdeblock/gember`
  * [#29](https://github.com/bertdeblock/gember/pull/29) Fix generating nested documents ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2024-03-20)

@bertdeblock/gember 0.3.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#24](https://github.com/bertdeblock/gember/pull/24) Improve modifier documents ([@bertdeblock](https://github.com/bertdeblock))
  * [#23](https://github.com/bertdeblock/gember/pull/23) Improve helper documents ([@bertdeblock](https://github.com/bertdeblock))
  * [#22](https://github.com/bertdeblock/gember/pull/22) Improve consistency among CLI options ([@bertdeblock](https://github.com/bertdeblock))
  * [#20](https://github.com/bertdeblock/gember/pull/20) Support class-based modifiers ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#25](https://github.com/bertdeblock/gember/pull/25) Internal improvements ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2024-03-18)

@bertdeblock/gember 0.2.0 (major)

#### :boom: Breaking Change
* `@bertdeblock/gember`
  * [#15](https://github.com/bertdeblock/gember/pull/15) Support template-only components ([@bertdeblock](https://github.com/bertdeblock))
  * [#12](https://github.com/bertdeblock/gember/pull/12) Don't run Prettier post generation ([@bertdeblock](https://github.com/bertdeblock))

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#18](https://github.com/bertdeblock/gember/pull/18) Support class-based helpers ([@bertdeblock](https://github.com/bertdeblock))
  * [#15](https://github.com/bertdeblock/gember/pull/15) Support template-only components ([@bertdeblock](https://github.com/bertdeblock))

#### :bug: Bug Fix
* `@bertdeblock/gember`
  * [#19](https://github.com/bertdeblock/gember/pull/19) Fix modifier and service names ([@bertdeblock](https://github.com/bertdeblock))

#### :house: Internal
* `@bertdeblock/gember`
  * [#10](https://github.com/bertdeblock/gember/pull/10) Various internal improvements ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2024-03-08)

@bertdeblock/gember 0.1.1 (patch)

#### :bug: Bug Fix
* `@bertdeblock/gember`
  * [#5](https://github.com/bertdeblock/gember/pull/5) Make sure the `.scaffdog` directory is published ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))

## Release (2024-03-08)

@bertdeblock/gember 0.1.0 (minor)

#### :rocket: Enhancement
* `@bertdeblock/gember`
  * [#4](https://github.com/bertdeblock/gember/pull/4) Support a `--path` option for all generators ([@bertdeblock](https://github.com/bertdeblock))

#### Committers: 1
- Bert De Block ([@bertdeblock](https://github.com/bertdeblock))
