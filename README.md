# 🫚 gember

[![CI](https://github.com/bertdeblock/gember/workflows/CI/badge.svg)](https://github.com/bertdeblock/gember/actions?query=workflow%3ACI)
[![NPM Version](https://badge.fury.io/js/%40bertdeblock%2Fgember.svg)](https://badge.fury.io/js/%40bertdeblock%2Fgember)

Generate components, helpers, modifiers and services in v2 addons.

Uses [scaffdog](https://scaff.dog/) underneath.

## Notes

- Only supports `.gjs` (default) and `.gts` files for components

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
pnpm gember component foo
pnpm gember component foo --class
pnpm gember component foo --gts
pnpm gember component foo --path="src/-private"
```

</details>

<details>
  <summary>Generating helpers</summary>

```shell
pnpm gember helper foo
pnpm gember helper foo --class
pnpm gember helper foo --ts
pnpm gember helper foo --path="src/-private"
```

</details>

<details>
  <summary>Generating modifiers</summary>

```shell
pnpm gember modifier foo
pnpm gember modifier foo --class
pnpm gember modifier foo --ts
pnpm gember modifier foo --path="src/-private"
```

</details>

<details>
  <summary>Generating services</summary>

```shell
pnpm gember service foo
pnpm gember service foo --ts
pnpm gember service foo --path="src/-private"
```

</details>
