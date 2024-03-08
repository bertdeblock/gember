---
name: "helper"
root: "."
output: "**/*"
---

# [[inputs.name + (inputs.ts ? ".ts" : ".js")]]

```ts
export default function [[camel(inputs.name)]]Helper(positional /*, named*/) {
  return positional;
}

```
