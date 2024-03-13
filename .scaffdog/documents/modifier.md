---
name: "modifier"
root: "."
output: "**/*"
---

# [[inputs.name]].[[inputs.authoringFormat]]

```ts
[[name := camel(inputs.name)-]]

import { modifier } from "ember-modifier";

export default modifier(function [[name]](element /*, positional, named*/) {});

```
