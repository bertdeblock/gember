import type { TOC } from '@ember/component/template-only';

export interface {{name.signature}} {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

{{#if args.namedExport}}export {{/if}}const {{name.pascal}}: TOC<{{name.signature}}> = <template>\{{yield}}</template>;
{{#unless args.namedExport}}

export default {{name.pascal}};
{{/unless}}
