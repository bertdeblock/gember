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
import { GemberError, logGemberErrors } from "./errors.js";
import { generators } from "./generators.js";
import { logger } from "./logger.js";

const { description, name, version }: PackageJson = readJsonSync(
  join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"),
);

const main = defineCommand({
  meta: {
    description,
    name,
    version,
  },

  run: (context): void => {
    if (context.rawArgs.length > 0) {
      return;
    }

    logGemberErrors(async () => {
      // @ts-expect-error: The `multiselect` return type is incorrect:
      const selectedGeneratorNames: string[] | undefined = await logger.prompt(
        "Which generators would you like to run?",
        {
          options: generators.map((generator) => ({
            hint: generator.description,
            label: generator.name,
            value: generator.name,
          })),
          type: "multiselect",
        },
      );

      if (selectedGeneratorNames === undefined) {
        // The user probably cancelled the interactive flow:
        return;
      }

      let entityName: string | undefined;

      for (const selectedGeneratorName of selectedGeneratorNames.sort()) {
        const selectedGenerator = generators.find(
          (generator) => generator.name === selectedGeneratorName,
        );

        if (selectedGenerator === undefined) {
          throw new GemberError(
            `[BUG] Could not find generator \`${selectedGeneratorName}\`.`,
          );
        }

        entityName = await logger.prompt(
          `Please provide a name for generator \`${selectedGenerator.name}\`:`,
          {
            initial: entityName,
            type: "text",
          },
        );

        if (entityName === undefined) {
          throw new GemberError(
            `A name must be provided for generator \`${selectedGenerator.name}\`.`,
          );
        }

        await selectedGenerator.run({ name: entityName });
      }
    });
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
