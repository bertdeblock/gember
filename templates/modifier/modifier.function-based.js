import { modifier } from 'ember-modifier';

{{#if args.namedExport}}export const {{name.camel}} ={{else}}export default{{/if}} modifier(function {{name.camel}}(element, positional, named) {});
