import Component from "@glimmer/component";

export interface {{name.signature}} {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class {{name.pascal}} extends Component<{{name.signature}}> {
  <template>
    \{{yield}}
  </template>
}
