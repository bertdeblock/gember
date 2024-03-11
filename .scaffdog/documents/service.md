---
name: "service"
root: "."
output: "**/*"
---

# [[inputs.name]].[[inputs.authoringFormat]]

```ts
[[name := pascal(inputs.name)-]]
import Service from "@ember/service";

export default class [[name]]Service extends Service {}
[[if inputs.authoringFormat == "ts"]]
declare module "@ember/service" {
  interface Registry {
    "[[inputs.name]]": [[name]]Service;
  }
}
[[end]]
```
