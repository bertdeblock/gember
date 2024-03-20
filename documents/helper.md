---
name: "helper"
root: "."
output: "**/*"
---

# [[inputs.ts ? "!" : (inputs.classBased ? "!" : "")]][[inputs.name]].js

```js
[[name := camel(inputs.name)-]]

import { helper } from "@ember/component/helper";

export default helper(function [[name]](positional, named) {
  return positional;
});

```

# [[inputs.ts ? "!" : (inputs.classBased ? "" : "!")]][[inputs.name]].js

```js
[[name := pascal(inputs.name)-]]

import Helper from "@ember/component/helper";

export default class [[name]] extends Helper {
  compute(positional, named) {
    return positional;
  }
}

```

# [[inputs.ts ? (inputs.classBased ? "!" : "") : "!"]][[inputs.name]].ts

```ts
[[name := camel(inputs.name)-]]
[[signature := (pascal(inputs.name) + "Signature")-]]

import { helper } from "@ember/component/helper";

type Named = {};
type Positional = [];
type Return = Positional;

export interface [[signature]] {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Return: Return;
}

export default helper<[[signature]]>(function [[name]](positional, named) {
  return positional;
});

```

# [[inputs.ts ? (inputs.classBased ? "" : "!") : "!"]][[inputs.name]].ts

```ts
[[name := pascal(inputs.name)-]]
[[signature := (pascal(inputs.name) + "Signature")-]]

import Helper from "@ember/component/helper";

type Named = {};
type Positional = [];
type Return = Positional;

export interface [[signature]] {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Return: Return;
}

export default class [[name]] extends Helper<[[signature]]> {
  compute(positional: Positional, named: Named): Return {
    return positional;
  }
}

```
