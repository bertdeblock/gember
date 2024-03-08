---
name: "service"
root: "."
output: "**/*"
---

# [[inputs.name + (inputs.ts ? ".ts" : ".js")]]

```ts
[[name := pascal(inputs.name)-]]
import Service from "@ember/service";

export default class [[name]]Service extends Service {}
[[if inputs.ts]]
declare module "@ember/service" {
  interface Registry {
    "[[inputs.name]]": [[name]]Service;
  }
}
[[end]]
```
