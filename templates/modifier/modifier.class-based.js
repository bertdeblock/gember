import Modifier from 'ember-modifier';

{{#if args.namedExport}}export{{else}}export default{{/if}} class {{name.camel}} extends Modifier {
  modify(element, positional, named) {}
}
