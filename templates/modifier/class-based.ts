import Modifier from "ember-modifier";

type Named = {};
type Positional = [];
type Element = null;

export interface {{name.signature}} {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Element: Element;
}

export default class {{name.pascal}} extends Modifier<{{name.signature}}> {
  modify(element: Element, positional: Positional, named: Named) {}
}
