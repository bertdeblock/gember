import { modifier } from 'ember-modifier';

export interface {{name.signature}} {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: null;
}

{{#if args.namedExport}}export const {{name.camel}} ={{else}}export default{{/if}} modifier<{{name.signature}}>(function {{name.camel}}(element, positional, named) {});
