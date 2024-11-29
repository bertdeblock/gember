# 🫚 gember

[![CI](https://github.com/bertdeblock/gember/workflows/CI/badge.svg)](https://github.com/bertdeblock/gember/actions?query=workflow%3ACI)
[![NPM Version](https://badge.fury.io/js/%40bertdeblock%2Fgember.svg)](https://badge.fury.io/js/%40bertdeblock%2Fgember)

Generate components, helpers, modifiers and services in v1/v2 apps/addons.

> NOTE: Only supports `.gjs` (default) and `.gts` files for components.

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

<details open>
  <summary>Generating components</summary>

```shell
pnpm gember component --help # for all available options

# examples:
pnpm gember component foo
pnpm gember component foo --class-based # or `--class`
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

```js
// gember.config.js

export default {};

// or:
export default () => ({});

// or:
export default async () => ({});
```

### Configuration Signature

```ts
export type Config = {
  generators?: {
    component?: {
      classBased?: boolean;
      path?: string;
      typescript?: boolean;
    };
    helper?: {
      classBased?: boolean;
      path?: string;
      typescript?: boolean;
    };
    modifier?: {
      classBased?: boolean;
      path?: string;
      typescript?: boolean;
    };
    service?: {
      path?: string;
      typescript?: boolean;
    };
  };

  hooks?: {
    // A hook that will be executed post running a generator:
    postGenerate?: (info: {
      entityName: string;
      files: GeneratorFile[];
      generatorName: GeneratorName;
    }) => Promise<void> | void;
  };

  // Use TypeScript by default for all generators:
  typescript?: boolean;
};
```
