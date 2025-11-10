# 🫚 gember

[![CI](https://github.com/bertdeblock/gember/workflows/CI/badge.svg)](https://github.com/bertdeblock/gember/actions?query=workflow%3ACI)
[![NPM Version](https://badge.fury.io/js/%40bertdeblock%2Fgember.svg)](https://badge.fury.io/js/%40bertdeblock%2Fgember)

Generate components, helpers, modifiers and services in v1/v2 apps/addons.

> ℹ️ Only supports `.gjs` (default) and `.gts` files for components.

## Installation

<details open>
  <summary>npm</summary>

```shell
npm install -D @bertdeblock/gember
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

> 💡 Run `pnpm gember` to run generators interactively.

> 💡 Run `pnpm gember --help` for all available generators.

> 💡 Run `pnpm gember <generator-name> --help` for all available generator options.

<details open>
  <summary>Generating components</summary>

```shell
pnpm gember component --help # for all available options

# examples:
pnpm gember component foo
pnpm gember component foo --class-based # or `--class`
pnpm gember component foo --nested
pnpm gember component foo --path="src/-private"
pnpm gember component foo --typescript # or `--ts`
```

</details>

<details>
  <summary>Generating helpers</summary>

```shell
pnpm gember helper --help # for all available options

# examples:
pnpm gember helper foo
pnpm gember helper foo --class-based # or `--class`
pnpm gember helper foo --path="src/-private"
pnpm gember helper foo --typescript # or `--ts`
```

</details>

<details>
  <summary>Generating modifiers</summary>

```shell
pnpm gember modifier --help # for all available options

# examples:
pnpm gember modifier foo
pnpm gember modifier foo --class-based # or `--class`
pnpm gember modifier foo --path="src/-private"
pnpm gember modifier foo --typescript # or `--ts`
```

</details>

<details>
  <summary>Generating services</summary>

```shell
pnpm gember service --help # for all available options

# examples:
pnpm gember service foo
pnpm gember service foo --path="src/-private"
pnpm gember service foo --typescript # or `--ts`
```

</details>

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

// A function that returns an object:
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
      // Log the generated component to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a nested colocated component, e.g. `foo/bar/index.gts`:
      nested?: boolean;
      // Generate a component at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.gts` component, instead of a `.gjs` component:
      typescript?: boolean;
    };
    "component-test"?: {
      // Copy the generated component-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the component-test generator in:
      cwd?: string;
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
      // Log the generated helper to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a helper at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` helper, instead of a `.js` helper:
      typescript?: boolean;
    };
    "helper-test"?: {
      // Copy the generated helper-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the helper-test generator in:
      cwd?: string;
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
      // Log the generated modifier to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a modifier at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` modifier, instead of a `.js` modifier:
      typescript?: boolean;
    };
    "modifier-test"?: {
      // Copy the generated modifier-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the modifier-test generator in:
      cwd?: string;
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
      // Log the generated service to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a service at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` service, instead of a `.js` service:
      typescript?: boolean;
    };
    "service-test"?: {
      // Copy the generated service-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the service-test generator in:
      cwd?: string;
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
