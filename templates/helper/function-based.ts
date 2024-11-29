import { helper } from "@ember/component/helper";

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

export default helper<{{name.signature}}>(function {{name.camel}}(positional, named) {
  return positional;
});
