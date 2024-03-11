---
name: "helper"
root: "."
output: "**/*"
---

# [[inputs.name]].[[inputs.authoringFormat]]

```ts
export default function [[camel(inputs.name)]]Helper(positional /*, named*/) {
  return positional;
}

```
