---
name: "component"
root: "."
output: "**/*"
---

# [[inputs.authoringFormat == "gjs" ? (inputs.classBased ? "!" : "") : "!"]][[inputs.name]].gjs

```gjs
<template>{{yield}}</template>

```

# [[inputs.authoringFormat == "gjs" ? (inputs.classBased ? "" : "!") : "!"]][[inputs.name]].gjs

```gjs
[[name := pascal(inputs.name)-]]

import Component from "@glimmer/component";

export default class [[name]] extends Component {
  <template>{{yield}}</template>
}

```

# [[inputs.authoringFormat == "gts" ? (inputs.classBased ? "!" : "") : "!"]][[inputs.name]].gts

```gts
[[name := pascal(inputs.name)-]]
[[signature := (name + "Signature")-]]

import type { TOC } from '@ember/component/template-only';

export interface [[signature]] {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

const [[name]]: TOC<[[signature]]> = <template>{{yield}}</template>;

export default [[name]];

```

# [[inputs.authoringFormat == "gts" ? (inputs.classBased ? "" : "!") : "!"]][[inputs.name]].gts

```gts
[[name := pascal(inputs.name)-]]
[[signature := (name + "Signature")-]]

import Component from "@glimmer/component";

export interface [[signature]] {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class [[name]] extends Component<[[signature]]> {
  <template>
    {{yield}}
  </template>
}

```
