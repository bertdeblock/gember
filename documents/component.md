---
name: "component"
root: "."
output: "**/*"
---

# {{!inputs.typescript && !inputs.classBased ? "" : "!"}}{{inputs.name.path}}.gjs

```gjs
<template>{{"{{"}}yield{{"}}"}}</template>

```

# {{!inputs.typescript && inputs.classBased ? "" : "!"}}{{inputs.name.path}}.gjs

```gjs
import Component from "@glimmer/component";

export default class {{inputs.name.pascal}} extends Component {
  <template>{{"{{"}}yield{{"}}"}}</template>
}

```

# {{inputs.typescript && !inputs.classBased ? "" : "!"}}{{inputs.name.path}}.gts

```gts
import type { TOC } from '@ember/component/template-only';

export interface {{inputs.signature}} {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

const {{inputs.name.pascal}}: TOC<{{inputs.signature}}> = <template>{{"{{"}}yield{{"}}"}}</template>;

export default {{inputs.name.pascal}};

```

# {{inputs.typescript && inputs.classBased ? "" : "!"}}{{inputs.name.path}}.gts

```gts
import Component from "@glimmer/component";

export interface {{inputs.signature}} {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class {{inputs.name.pascal}} extends Component<{{inputs.signature}}> {
  <template>
    {{"{{"}}yield{{"}}"}}
  </template>
}

```
