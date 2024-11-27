import type { Config } from "scaffdog";

/**
 * Given an array of strings, this function will return a tuple of two arrays:
 * - The first array will contain all the strings that do not begin with a '!'.
 * - The second array will contain all the strings that do begin with a '!',
 *   with the '!' removed.
 */
function parseOptions(options: string[]): [string[], string[]] {
  const positive: string[] = [];
  const negative: string[] = [];

  for (let i = 0; i < options.length; i++) {
    if (options[i].startsWith("!")) {
      negative.push(options[i].slice(1));
    } else {
      positive.push(options[i]);
    }
  }

  return [positive, negative];
}

const config: Config = {
  files: ["*.md"],
  helpers: [
    (registry): void => {
      /**
       * This helper looks at `context.inputs` and `options` and returns either
       * '' or '!' based on the values of the options in `context.inputs`.  If
       * an option starts with a '!', it is considered a negative option and
       * will be checked for falsy values. Otherwise, the option will be
       * checked for truthy values.
       *
       * For example, if `context.inputs` is `{ foo: true, bar: false }`, then:
       * - `{{hasOpts "foo"}}` will return '' because `foo` is truthy
       * - `{{hasOpts "!foo"}}` will return '!' because `foo` is truthy
       * - `{{hasOpts "bar"}}` will return '!' because `bar` is falsy
       * - `{{hasOpts "!bar"}}` will return '' because `bar` is falsy
       * - `{{hasOpts "foo" "!bar"}}` will return '' because `foo` is truthy
       *      and `bar` is falsy
       * - `{{hasOpts "foo" "bar"}}` will return '!' because `foo` is truthy
       *      and `bar` is falsy
       * - `{{hasOpts "!foo" "!bar"}}` will return '!' because `foo` is truthy
       *      and `bar` is falsy
       */
      registry.set("hasOpts", (context, ...options) => {
        const [positive, negative] = parseOptions(options);
        const inputs = context.variables.get("inputs");

        const allPositive = positive.every((opt) => inputs?.[opt]);
        const noNegative = negative.every((opt) => !inputs?.[opt]);

        return allPositive && noNegative ? "" : "!";
      });
    },
  ],
};
export default config;
