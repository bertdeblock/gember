---
name: "component"
root: "."
output: "**/*"
---

# [[inputs.name + (inputs.gts ? ".gts" : ".gjs")]]

```gts
[[name := pascal(inputs.name)-]]
import Component from "@glimmer/component";
[[if inputs.gts]]
export interface [[name]]Signature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class [[name]]Component extends Component<[[name]]Signature> {
[[-else]]
export default class [[name]]Component extends Component {
[[-end]]
  <template>
    {{yield}}
  </template>
}

```
