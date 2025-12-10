import Modifier from 'ember-modifier';

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

{{#if args.namedExport}}export{{else}}export default{{/if}} class {{name.camel}} extends Modifier<{{name.signature}}> {
  modify(element: Element, positional: Positional, named: Named) {}
}
