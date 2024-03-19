---
name: "helper"
root: "."
output: "**/*"
---

# [[inputs.classBased ? "!" : ""]][[inputs.name]].[[inputs.ts ? "ts" : "js"]]

```ts
[[name := camel(inputs.name)-]]

export default function [[name]](positional /*, named*/) {
  return positional;
}

```

# [[inputs.classBased ? "" : "!"]][[inputs.name]].[[inputs.ts ? "ts" : "js"]]

```ts
[[name := pascal(inputs.name)-]]

import Helper from "@ember/component/helper";

export default class [[name]] extends Helper {
  compute(positional /*, named*/) {
    return positional;
  }
}

```
