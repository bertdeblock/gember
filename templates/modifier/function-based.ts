import { modifier } from "ember-modifier";

export interface {{name.signature}} {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: null;
}

export default modifier<{{name.signature}}>(function {{name.camel}}(element, positional, named) {});
