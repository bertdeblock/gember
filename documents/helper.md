---
name: "helper"
root: "."
output: "**/*"
---

# {{!inputs.typescript && !inputs.classBased ? "" : "!"}}{{inputs.name.path}}.js

```js
import { helper } from "@ember/component/helper";

export default helper(function {{inputs.name.camel}}(positional, named) {
  return positional;
});

```

# {{!inputs.typescript && inputs.classBased ? "" : "!"}}{{inputs.name.path}}.js

```js
import Helper from "@ember/component/helper";

export default class {{inputs.name.pascal}} extends Helper {
  compute(positional, named) {
    return positional;
  }
}

```

# {{inputs.typescript && !inputs.classBased ? "" : "!"}}{{inputs.name.path}}.ts

```ts
import { helper } from "@ember/component/helper";

type Named = {};
type Positional = [];
type Return = Positional;

export interface {{inputs.signature}} {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Return: Return;
}

export default helper<{{inputs.signature}}>(function {{inputs.name.camel}}(positional, named) {
  return positional;
});

```

# {{inputs.typescript && inputs.classBased ? "" : "!"}}{{inputs.name.path}}.ts

```ts
import Helper from "@ember/component/helper";

type Named = {};
type Positional = [];
type Return = Positional;

export interface {{inputs.signature}} {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Return: Return;
}

export default class {{inputs.name.pascal}} extends Helper<{{inputs.signature}}> {
  compute(positional: Positional, named: Named): Return {
    return positional;
  }
}

```
