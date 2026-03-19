import type { TOC } from '@ember/component/template-only';

export interface {{name.signature}} {
  Args: {
    model: unknown;
    controller: unknown;
  };
  Blocks: {
    default: [];
  };
  Element: null;
}

const {{name.pascal}}: TOC<{{name.signature}}> = <template>\{{yield}}</template>;

export default {{name.pascal}};
