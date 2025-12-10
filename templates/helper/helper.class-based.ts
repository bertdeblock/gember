import Helper from '@ember/component/helper';

type Named = {};
type Positional = [];
type Return = Positional;

export interface {{name.signature}} {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Return: Return;
}

{{#if args.namedExport}}export{{else}}export default{{/if}} class {{name.camel}} extends Helper<{{name.signature}}> {
  compute(positional: Positional, named: Named): Return {
    return positional;
  }
}
