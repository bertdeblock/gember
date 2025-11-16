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

export default class {{name.camel}} extends Helper<{{name.signature}}> {
  compute(positional: Positional, named: Named): Return {
    return positional;
  }
}
