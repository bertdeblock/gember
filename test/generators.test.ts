// @ts-expect-error: TODO: Types for `combinations` package:
import combinations from "combinations";
import { afterEach, describe, it } from "vitest";
import { generators } from "../src/generators/generators.ts";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

const IGNORED_ARG_NAMES = ["copy", "destroy"];
const IGNORED_ARG_TYPES = ["positional", "string"];

for (const packageType of ["v1-addon", "v1-app", "v2-addon", "v2-app"]) {
  describe(`package-type: ${packageType}`, () => {
    for (const generator of generators) {
      describe(`generator: ${generator.name}`, () => {
        const argCombinations = combinations(
          generator.args
            .filter((arg) => {
              return (
                IGNORED_ARG_NAMES.includes(arg.name) === false &&
                IGNORED_ARG_TYPES.includes(arg.type) === false
              );
            })
            .map((arg) => `--${arg.name}`),
        );

        for (const args of argCombinations) {
          it(`args: ${args.join(" ")}`, async (ctx) => {
            pkg = await Package.create(packageType);

            const { output } = await pkg.gember(generator.name, "foo", ...args);

            ctx.expect(output).toMatchSnapshot();
          });
        }
      });
    }
  });
}
