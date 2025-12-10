{{#if args.namedExport}}export{{else}}export default{{/if}} function {{name.camel}}(positional, named) {
  return positional;
}
