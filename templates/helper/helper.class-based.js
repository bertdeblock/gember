import Helper from '@ember/component/helper';

{{#if args.namedExport}}export{{else}}export default{{/if}} class {{name.camel}} extends Helper {
  compute(positional, named) {
    return positional;
  }
}
