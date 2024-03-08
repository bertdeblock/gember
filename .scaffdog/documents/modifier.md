---
name: "modifier"
root: "."
output: "**/*"
---

# [[inputs.name + (inputs.ts ? ".ts" : ".js")]]

```ts
import { modifier } from "ember-modifier";

export default modifier(function foo(element /*, positional, named*/) {});

```
