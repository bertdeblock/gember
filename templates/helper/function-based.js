import { helper } from "@ember/component/helper";

export default helper(function {{name.camel}}(positional, named) {
  return positional;
});
