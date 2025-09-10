import {
  defineCommand,
  runMain,
  type ArgsDef,
  type SubCommandsDef,
} from "citty";
import { readJsonSync } from "fs-extra/esm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line n/no-missing-import
import type { PackageJson } from "type-fest";
import { logGemberErrors } from "./errors.js";
import { generators } from "./generators.js";

const { description, name, version }: PackageJson = readJsonSync(
  join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"),
);

const main = defineCommand({
  meta: {
    description,
    name,
    version,
  },

  subCommands: generators.reduce((subCommands: SubCommandsDef, generator) => {
    subCommands[generator.name] = {
      args: generator.args.reduce((args: ArgsDef, arg) => {
        args[arg.name] = {
          alias: arg.alias,
          description: arg.description,
          required: arg.required,
          type: arg.type,
        };

        return args;
      }, {}),

      meta: {
        description: generator.description,
        name: generator.name,
      },

      run: (context): void => {
        logGemberErrors(async () => {
          await generator.run(context.args);
        });
      },
    };

    return subCommands;
  }, {}),
});

runMain(main);
