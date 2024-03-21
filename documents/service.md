---
name: "service"
root: "."
output: "**/*"
---

# {{inputs.name.kebab}}.{{inputs.typescript ? "ts" : "js"}}

```ts
import Service from "@ember/service";

export default class {{inputs.name.pascal}} extends Service {}
{{if inputs.typescript}}
declare module "@ember/service" {
  interface Registry {
    "{{inputs.name.kebab}}": {{inputs.name.pascal}};
  }
}
{{end}}
```
