# 🫚 gember

[![CI](https://github.com/bertdeblock/gember/workflows/CI/badge.svg)](https://github.com/bertdeblock/gember/actions?query=workflow%3ACI)
[![NPM Version](https://badge.fury.io/js/%40bertdeblock%2Fgember.svg)](https://badge.fury.io/js/%40bertdeblock%2Fgember)

Generate components, helpers, modifiers and services in v2 addons.

Uses [scaffdog](https://scaff.dog/) underneath.

## Installation

```shell
bun add -D @bertdeblock/gember
```

```shell
npm install -D @bertdeblock/gember
```

```shell
pnpm add -D @bertdeblock/gember
```

```shell
yarn add -D @bertdeblock/gember
```

## Usage

```shell
pnpm gember component foo
pnpm gember component foo --gts
pnpm gember component foo --path="src/-private"

pnpm gember helper foo
pnpm gember helper foo --ts
pnpm gember helper foo --path="src/-private"

pnpm gember modifier foo
pnpm gember modifier foo --ts
pnpm gember modifier foo --path="src/-private"

pnpm gember service foo
pnpm gember service foo --ts
pnpm gember service foo --path="src/-private"
```

## Configuration

gember supports the following config files:

- `gember.config.js`
- `gember.config.cjs`
- `gember.config.mjs`

A gember config file must export a gember config object, or a sync/async function that returns a gember config object.

### Configuration Options

#### `hooks.postGenerate`

A hook that will be executed post generating a document.

```js
// gember.config.js

import { execa } from "execa";

export default {
  hooks: {
    postGenerate: async ({ files }) => {
      await execa("npx", [
        "prettier",
        "--write",
        ...files.map((file) => file.path),
      ]);
    },
  },
};
```

## Caveats

- Only supports `.gjs` (default) and `.gts` files for components at the moment
