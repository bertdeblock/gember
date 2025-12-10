import Component from '@glimmer/component';

export interface {{name.signature}} {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

{{#if args.namedExport}}export{{else}}export default{{/if}} class {{name.pascal}} extends Component<{{name.signature}}> {
  <template>
    \{{yield}}
  </template>
}
