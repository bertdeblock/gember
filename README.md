# 🫚 gember

[![CI](https://github.com/bertdeblock/gember/workflows/CI/badge.svg)](https://github.com/bertdeblock/gember/actions?query=workflow%3ACI)
[![NPM Version](https://badge.fury.io/js/%40bertdeblock%2Fgember.svg)](https://badge.fury.io/js/%40bertdeblock%2Fgember)

Generate components, helpers, modifiers and services in v1/v2 apps/addons.

ℹ️ Only supports `.gjs` (default) and `.gts` files for components.

## Installation

<details open>
  <summary>npm</summary>

```shell
npm install -D @bertdeblock/gember
```

</details>

<details>
  <summary>deno</summary>

```shell
deno add -D @bertdeblock/gember
```

</details>

<details>
  <summary>bun</summary>

```shell
bun add -D @bertdeblock/gember
```

</details>

<details>
  <summary>pnpm</summary>

```shell
pnpm add -D @bertdeblock/gember
```

</details>

<details>
  <summary>yarn</summary>

```shell
yarn add -D @bertdeblock/gember
```

</details>

## Usage

### gember

```shell
Generate components, helpers, modifiers and services in v1/v2 apps/addons. (gember v1.4.0)

USAGE `gember component|component-test|helper|helper-test|modifier|modifier-test|service|service-test|acceptance-test`

COMMANDS

        `component`    Generate a new component
   `component-test`    Generate a new component-test
           `helper`    Generate a new helper
      `helper-test`    Generate a new helper-test
         `modifier`    Generate a new modifier
    `modifier-test`    Generate a new modifier-test
          `service`    Generate a new service
     `service-test`    Generate a new service-test
  `acceptance-test`    Generate a new acceptance-test

Use `gember <command> --help` for more information about a command.
```

### component

```shell
Generate a new component (component)

USAGE `component [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The component's name

OPTIONS

  `-class, -class-based, --classBased`    Generate a `class-based` component, instead of a `template-only` component
                              `--copy`    Copy the generated component to the clipboard, instead of writing it to disk
                               `--cwd`    The current working directory to run the component generator in
                       `-d, --destroy`    Destroy a component by name
                               `--log`    Log the generated component to the console, instead of writing it to disk
                            `--nested`    Generate a nested colocated component, e.g. `foo/bar/index.gts`
                              `--path`    Generate a component at a custom path, e.g. `--path=src/-private`
                              `--test`    Generate a corresponding component-test
             `-gts, -ts, --typescript`    Generate a `.gts` component, instead of a `.gjs` component

```

### component-test

```shell
Generate a new component-test (component-test)

USAGE `component-test [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The component-test's name

OPTIONS

                   `--copy`    Copy the generated component-test to the clipboard, instead of writing it to disk
                    `--cwd`    The current working directory to run the component-test generator in
            `-d, --destroy`    Destroy a component-test by name
                    `--log`    Log the generated component-test to the console, instead of writing it to disk
                   `--path`    Generate a component-test at a custom path, e.g. `--path=src/-private`
  `-gts, -ts, --typescript`    Generate a `.gts` component-test, instead of a `.gjs` component-test

```

### helper

```shell
Generate a new helper (helper)

USAGE `helper [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The helper's name

OPTIONS

  `-class, -class-based, --classBased`    Generate a `class-based` helper, instead of a `function-based` helper
                              `--copy`    Copy the generated helper to the clipboard, instead of writing it to disk
                               `--cwd`    The current working directory to run the helper generator in
                       `-d, --destroy`    Destroy a helper by name
                               `--log`    Log the generated helper to the console, instead of writing it to disk
                              `--path`    Generate a helper at a custom path, e.g. `--path=src/-private`
                              `--test`    Generate a corresponding helper-test
                   `-ts, --typescript`    Generate a `.ts` helper, instead of a `.js` helper

```

### helper-test

```shell
Generate a new helper-test (helper-test)

USAGE `helper-test [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The helper-test's name

OPTIONS

                   `--copy`    Copy the generated helper-test to the clipboard, instead of writing it to disk
                    `--cwd`    The current working directory to run the helper-test generator in
            `-d, --destroy`    Destroy a helper-test by name
                    `--log`    Log the generated helper-test to the console, instead of writing it to disk
                   `--path`    Generate a helper-test at a custom path, e.g. `--path=src/-private`
  `-gts, -ts, --typescript`    Generate a `.gts` helper-test, instead of a `.gjs` helper-test

```

### modifier

```shell
Generate a new modifier (modifier)

USAGE `modifier [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The modifier's name

OPTIONS

  `-class, -class-based, --classBased`    Generate a `class-based` modifier, instead of a `function-based` modifier
                              `--copy`    Copy the generated modifier to the clipboard, instead of writing it to disk
                               `--cwd`    The current working directory to run the modifier generator in
                       `-d, --destroy`    Destroy a modifier by name
                               `--log`    Log the generated modifier to the console, instead of writing it to disk
                              `--path`    Generate a modifier at a custom path, e.g. `--path=src/-private`
                              `--test`    Generate a corresponding modifier-test
                   `-ts, --typescript`    Generate a `.ts` modifier, instead of a `.js` modifier

```

### modifier-test

```shell
Generate a new modifier-test (modifier-test)

USAGE `modifier-test [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The modifier-test's name

OPTIONS

                   `--copy`    Copy the generated modifier-test to the clipboard, instead of writing it to disk
                    `--cwd`    The current working directory to run the modifier-test generator in
            `-d, --destroy`    Destroy a modifier-test by name
                    `--log`    Log the generated modifier-test to the console, instead of writing it to disk
                   `--path`    Generate a modifier-test at a custom path, e.g. `--path=src/-private`
  `-gts, -ts, --typescript`    Generate a `.gts` modifier-test, instead of a `.gjs` modifier-test

```

### service

```shell
Generate a new service (service)

USAGE `service [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The service's name

OPTIONS

             `--copy`    Copy the generated service to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the service generator in
      `-d, --destroy`    Destroy a service by name
              `--log`    Log the generated service to the console, instead of writing it to disk
             `--path`    Generate a service at a custom path, e.g. `--path=src/-private`
             `--test`    Generate a corresponding service-test
  `-ts, --typescript`    Generate a `.ts` service, instead of a `.js` service

```

### service-test

```shell
Generate a new service-test (service-test)

USAGE `service-test [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The service-test's name

OPTIONS

             `--copy`    Copy the generated service-test to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the service-test generator in
      `-d, --destroy`    Destroy a service-test by name
              `--log`    Log the generated service-test to the console, instead of writing it to disk
             `--path`    Generate a service-test at a custom path, e.g. `--path=src/-private`
  `-ts, --typescript`    Generate a `.ts` service-test, instead of a `.js` service-test

```

### acceptance-test

```shell
Generate a new acceptance-test (acceptance-test)

USAGE `acceptance-test [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The acceptance-test's name

OPTIONS

             `--copy`    Copy the generated acceptance-test to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the acceptance-test generator in
      `-d, --destroy`    Destroy a acceptance-test by name
              `--log`    Log the generated acceptance-test to the console, instead of writing it to disk
             `--path`    Generate a acceptance-test at a custom path, e.g. `--path=src/-private`
  `-ts, --typescript`    Generate a `.ts` acceptance-test, instead of a `.js` acceptance-test

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

### Configuration Signature

```ts
export type Config = {
  generators?: {
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
