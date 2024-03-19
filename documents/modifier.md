---
name: "modifier"
root: "."
output: "**/*"
---

# [[inputs.authoringFormat == "js" ? (inputs.classBased ? "!" : "") : "!"]][[inputs.name]].js

```js
[[name := camel(inputs.name)-]]

import { modifier } from "ember-modifier";

export default modifier(function [[name]](element, positional, named) {});

```

# [[inputs.authoringFormat == "js" ? (inputs.classBased ? "" : "!") : "!"]][[inputs.name]].js

```js
[[name := pascal(inputs.name)-]]

import Modifier from "ember-modifier";

export default class [[name]] extends Modifier {
  modify(element, positional, named) {}
}

```

# [[inputs.authoringFormat == "ts" ? (inputs.classBased ? "!" : "") : "!"]][[inputs.name]].ts

```ts
[[name := camel(inputs.name)-]]
[[signature := (pascal(inputs.name) + "Signature")-]]

import { modifier, type NamedArgs, type PositionalArgs } from "ember-modifier";

export interface [[signature]] {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: null;
}

export default modifier<[[signature]]>(function [[name]](element, positional, named) {});

```

# [[inputs.authoringFormat == "ts" ? (inputs.classBased ? "" : "!") : "!"]][[inputs.name]].ts

```ts
[[name := pascal(inputs.name)-]]
[[signature := (pascal(inputs.name) + "Signature")-]]

import Modifier, { type NamedArgs, type PositionalArgs } from "ember-modifier";

export interface [[signature]] {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: null;
}

export default class [[name]] extends Modifier<[[signature]]> {
  modify(
    element: [[signature]]["Element"],
    positional: PositionalArgs<[[signature]]>,
    named: NamedArgs<[[signature]]>,
  ) {}
}

```
