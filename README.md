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

USAGE `gember acceptance-test|component|component-test|controller|controller-test|helper|helper-test|modifier|modifier-test|route|route-test|service|service-test|util|util-test`

COMMANDS

  `acceptance-test`    Generate a new acceptance-test
        `component`    Generate a new component
   `component-test`    Generate a new component-test
       `controller`    Generate a new controller
  `controller-test`    Generate a new controller-test
           `helper`    Generate a new helper
      `helper-test`    Generate a new helper-test
         `modifier`    Generate a new modifier
    `modifier-test`    Generate a new modifier-test
            `route`    Generate a new route
       `route-test`    Generate a new route-test
          `service`    Generate a new service
     `service-test`    Generate a new service-test
             `util`    Generate a new util
        `util-test`    Generate a new util-test

Use `gember <command> --help` for more information about a command.
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

### controller

```shell
Generate a new controller (controller)

USAGE `controller [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The controller's name

OPTIONS

             `--copy`    Copy the generated controller to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the controller generator in
      `-d, --destroy`    Destroy a controller by name
              `--log`    Log the generated controller to the console, instead of writing it to disk
             `--path`    Generate a controller at a custom path, e.g. `--path=src/-private`
             `--test`    Generate a corresponding controller-test
  `-ts, --typescript`    Generate a `.ts` controller, instead of a `.js` controller

```

### controller-test

```shell
Generate a new controller-test (controller-test)

USAGE `controller-test [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The controller-test's name

OPTIONS

             `--copy`    Copy the generated controller-test to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the controller-test generator in
      `-d, --destroy`    Destroy a controller-test by name
              `--log`    Log the generated controller-test to the console, instead of writing it to disk
             `--path`    Generate a controller-test at a custom path, e.g. `--path=src/-private`
  `-ts, --typescript`    Generate a `.ts` controller-test, instead of a `.js` controller-test

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

### route

```shell
Generate a new route (route)

USAGE `route [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The route's name

OPTIONS

             `--copy`    Copy the generated route to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the route generator in
      `-d, --destroy`    Destroy a route by name
              `--log`    Log the generated route to the console, instead of writing it to disk
             `--path`    Generate a route at a custom path, e.g. `--path=src/-private`
             `--test`    Generate a corresponding route-test
  `-ts, --typescript`    Generate a `.ts` route, instead of a `.js` route

```

### route-test

```shell
Generate a new route-test (route-test)

USAGE `route-test [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The route-test's name

OPTIONS

             `--copy`    Copy the generated route-test to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the route-test generator in
      `-d, --destroy`    Destroy a route-test by name
              `--log`    Log the generated route-test to the console, instead of writing it to disk
             `--path`    Generate a route-test at a custom path, e.g. `--path=src/-private`
  `-ts, --typescript`    Generate a `.ts` route-test, instead of a `.js` route-test

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

### util

```shell
Generate a new util (util)

USAGE `util [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The util's name

OPTIONS

             `--copy`    Copy the generated util to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the util generator in
      `-d, --destroy`    Destroy a util by name
              `--log`    Log the generated util to the console, instead of writing it to disk
             `--path`    Generate a util at a custom path, e.g. `--path=src/-private`
             `--test`    Generate a corresponding util-test
  `-ts, --typescript`    Generate a `.ts` util, instead of a `.js` util

```

### util-test

```shell
Generate a new util-test (util-test)

USAGE `util-test [OPTIONS] <NAME>`

ARGUMENTS

  `NAME`    The util-test's name

OPTIONS

             `--copy`    Copy the generated util-test to the clipboard, instead of writing it to disk
              `--cwd`    The current working directory to run the util-test generator in
      `-d, --destroy`    Destroy a util-test by name
              `--log`    Log the generated util-test to the console, instead of writing it to disk
             `--path`    Generate a util-test at a custom path, e.g. `--path=src/-private`
  `-ts, --typescript`    Generate a `.ts` util-test, instead of a `.js` util-test

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
      // Custom acceptance-test template content:
      templateContent?: string;
      // Custom acceptance-test template path:
      templatePath?: string;
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
      // Custom component template content:
      templateContent?: string;
      // Custom component template path:
      templatePath?: string;
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
      // Custom component-test template content:
      templateContent?: string;
      // Custom component-test template path:
      templatePath?: string;
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
      // Custom controller template content:
      templateContent?: string;
      // Custom controller template path:
      templatePath?: string;
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
      // Custom controller-test template content:
      templateContent?: string;
      // Custom controller-test template path:
      templatePath?: string;
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
      // Custom helper template content:
      templateContent?: string;
      // Custom helper template path:
      templatePath?: string;
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
      // Custom helper-test template content:
      templateContent?: string;
      // Custom helper-test template path:
      templatePath?: string;
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
      // Custom modifier template content:
      templateContent?: string;
      // Custom modifier template path:
      templatePath?: string;
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
      // Custom modifier-test template content:
      templateContent?: string;
      // Custom modifier-test template path:
      templatePath?: string;
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
      // Custom route template content:
      templateContent?: string;
      // Custom route template path:
      templatePath?: string;
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
      // Custom route-test template content:
      templateContent?: string;
      // Custom route-test template path:
      templatePath?: string;
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
      // Custom service template content:
      templateContent?: string;
      // Custom service template path:
      templatePath?: string;
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
      // Custom service-test template content:
      templateContent?: string;
      // Custom service-test template path:
      templatePath?: string;
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
      // Custom util template content:
      templateContent?: string;
      // Custom util template path:
      templatePath?: string;
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
      // Custom util-test template content:
      templateContent?: string;
      // Custom util-test template path:
      templatePath?: string;
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
