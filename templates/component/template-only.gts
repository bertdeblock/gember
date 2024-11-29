import type { TOC } from '@ember/component/template-only';

export interface {{name.signature}} {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

const {{name.pascal}}: TOC<{{name.signature}}> = <template>\{{yield}}</template>;

export default {{name.pascal}};
