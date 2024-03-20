---
name: "modifier"
root: "."
output: "**/*"
---

# {{inputs.ts ? "!" : (inputs.classBased ? "!" : "")}}{{inputs.name.kebab}}.js

```js
import { modifier } from "ember-modifier";

export default modifier(function {{inputs.name.camel}}(element, positional, named) {});

```

# {{inputs.ts ? "!" : (inputs.classBased ? "" : "!")}}{{inputs.name.kebab}}.js

```js
import Modifier from "ember-modifier";

export default class {{inputs.name.pascal}} extends Modifier {
  modify(element, positional, named) {}
}

```

# {{inputs.ts ? (inputs.classBased ? "!" : "") : "!"}}{{inputs.name.kebab}}.ts

```ts
import { modifier } from "ember-modifier";

export interface {{inputs.signature}} {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: null;
}

export default modifier<{{inputs.signature}}>(function {{inputs.name.camel}}(element, positional, named) {});

```

# {{inputs.ts ? (inputs.classBased ? "" : "!") : "!"}}{{inputs.name.kebab}}.ts

```ts
import Modifier from "ember-modifier";

type Named = {};
type Positional = [];
type Element = null;

export interface {{inputs.signature}} {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Element: Element;
}

export default class {{inputs.name.pascal}} extends Modifier<{{inputs.signature}}> {
  modify(element: Element, positional: Positional, named: Named) {}
}

```
