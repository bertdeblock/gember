# 🫚 gember

[![CI](https://github.com/bertdeblock/gember/workflows/CI/badge.svg)](https://github.com/bertdeblock/gember/actions?query=workflow%3ACI)
[![NPM Version](https://badge.fury.io/js/%40bertdeblock%2Fgember.svg)](https://badge.fury.io/js/%40bertdeblock%2Fgember)

Generators for Ember apps and addons.

## Installation

```shell
pnpm add -D @bertdeblock/gember
```

## Usage

List all generators:

```shell
pnpm gember --help
```

List all options for a specific generator:

```shell
pnpm gember component --help
```

## Configuration

gember supports the following config files:

- `gember.config.js`
- `gember.config.cjs`
- `gember.config.mjs`

A gember config file must export a gember config object, or a sync/async function that returns a gember config object:

```ts
// gember.config.js

import { defineConfig } from "@bertdeblock/gember";

// An object:
export default defineConfig({});

// A sync function that returns an object:
export default defineConfig(() => ({}));

// An async function that returns an object:
export default defineConfig(async () => ({}));
```

<details>
  <summary>Configuration Signature</summary>

```ts
export type Config = {
  generators?: {
    "acceptance-test"?: {
      // Copy the generated acceptance-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the acceptance-test generator in:
      cwd?: string;
      // Destroy a acceptance-test by name:
      destroy?: boolean;
      // Log the generated acceptance-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a acceptance-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` acceptance-test, instead of a `.js` acceptance-test:
      typescript?: boolean;
    };
    component?: {
      // Generate a `class-based` component, instead of a `template-only` component:
      classBased?: boolean;
      // Copy the generated component to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the component generator in:
      cwd?: string;
      // Destroy a component by name:
      destroy?: boolean;
      // Log the generated component to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a nested colocated component, e.g. `foo/bar/index.gts`:
      nested?: boolean;
      // Generate a component at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a corresponding component-test:
      test?: boolean;
      // Generate a `.gts` component, instead of a `.gjs` component:
      typescript?: boolean;
    };
    "component-test"?: {
      // Copy the generated component-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the component-test generator in:
      cwd?: string;
      // Destroy a component-test by name:
      destroy?: boolean;
      // Log the generated component-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a component-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.gts` component-test, instead of a `.gjs` component-test:
      typescript?: boolean;
    };
    controller?: {
      // Copy the generated controller to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the controller generator in:
      cwd?: string;
      // Destroy a controller by name:
      destroy?: boolean;
      // Log the generated controller to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a controller at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a corresponding controller-test:
      test?: boolean;
      // Generate a `.ts` controller, instead of a `.js` controller:
      typescript?: boolean;
    };
    "controller-test"?: {
      // Copy the generated controller-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the controller-test generator in:
      cwd?: string;
      // Destroy a controller-test by name:
      destroy?: boolean;
      // Log the generated controller-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a controller-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` controller-test, instead of a `.js` controller-test:
      typescript?: boolean;
    };
    helper?: {
      // Generate a `class-based` helper, instead of a `function-based` helper:
      classBased?: boolean;
      // Copy the generated helper to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the helper generator in:
      cwd?: string;
      // Destroy a helper by name:
      destroy?: boolean;
      // Log the generated helper to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a helper at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a corresponding helper-test:
      test?: boolean;
      // Generate a `.ts` helper, instead of a `.js` helper:
      typescript?: boolean;
    };
    "helper-test"?: {
      // Copy the generated helper-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the helper-test generator in:
      cwd?: string;
      // Destroy a helper-test by name:
      destroy?: boolean;
      // Log the generated helper-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a helper-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.gts` helper-test, instead of a `.gjs` helper-test:
      typescript?: boolean;
    };
    modifier?: {
      // Generate a `class-based` modifier, instead of a `function-based` modifier:
      classBased?: boolean;
      // Copy the generated modifier to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the modifier generator in:
      cwd?: string;
      // Destroy a modifier by name:
      destroy?: boolean;
      // Log the generated modifier to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a modifier at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a corresponding modifier-test:
      test?: boolean;
      // Generate a `.ts` modifier, instead of a `.js` modifier:
      typescript?: boolean;
    };
    "modifier-test"?: {
      // Copy the generated modifier-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the modifier-test generator in:
      cwd?: string;
      // Destroy a modifier-test by name:
      destroy?: boolean;
      // Log the generated modifier-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a modifier-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.gts` modifier-test, instead of a `.gjs` modifier-test:
      typescript?: boolean;
    };
    route?: {
      // Copy the generated route to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the route generator in:
      cwd?: string;
      // Destroy a route by name:
      destroy?: boolean;
      // Log the generated route to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a route at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a corresponding route-test:
      test?: boolean;
      // Generate a `.ts` route, instead of a `.js` route:
      typescript?: boolean;
    };
    "route-test"?: {
      // Copy the generated route-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the route-test generator in:
      cwd?: string;
      // Destroy a route-test by name:
      destroy?: boolean;
      // Log the generated route-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a route-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` route-test, instead of a `.js` route-test:
      typescript?: boolean;
    };
    service?: {
      // Copy the generated service to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the service generator in:
      cwd?: string;
      // Destroy a service by name:
      destroy?: boolean;
      // Log the generated service to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a service at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a corresponding service-test:
      test?: boolean;
      // Generate a `.ts` service, instead of a `.js` service:
      typescript?: boolean;
    };
    "service-test"?: {
      // Copy the generated service-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the service-test generator in:
      cwd?: string;
      // Destroy a service-test by name:
      destroy?: boolean;
      // Log the generated service-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a service-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` service-test, instead of a `.js` service-test:
      typescript?: boolean;
    };
    util?: {
      // Copy the generated util to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the util generator in:
      cwd?: string;
      // Destroy a util by name:
      destroy?: boolean;
      // Log the generated util to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a util at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a corresponding util-test:
      test?: boolean;
      // Generate a `.ts` util, instead of a `.js` util:
      typescript?: boolean;
    };
    "util-test"?: {
      // Copy the generated util-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the util-test generator in:
      cwd?: string;
      // Destroy a util-test by name:
      destroy?: boolean;
      // Log the generated util-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a util-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` util-test, instead of a `.js` util-test:
      typescript?: boolean;
    };
  };

  hooks?: {
    // A hook that will be executed post running a generator:
    postGenerate?: (info: {
      entityName: string;
      files: GeneratorFile[];
      generatorName: string;
    }) => Promise<void> | void;
  };

  // Use TypeScript by default for all generators:
  typescript?: boolean;
};
```

</details>
