import {
  defineCommand,
  runMain,
  type ArgsDef,
  // type CommandDef,
  type SubCommandsDef,
} from "citty";
import { GemberError, logGemberErrors } from "./errors.js";
import {
  generators,
  getGenerator,
  getTestGenerator,
} from "./generators/generators.js";
import { readOwnPackageJsonSync } from "./internal.js";
import { logger } from "./logger.js";

const { description, version } = readOwnPackageJsonSync();

// const COMMANDS: Record<string, CommandDef> = {
//   generator: {
//     meta: {
//       description: "Run a generator",
//     },

//     subCommands: generatorCommands(),
//   },
// };

export const main = defineCommand({
  meta: {
    description,
    name: "gember",
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
        const selectedGenerator = getGenerator(selectedGeneratorName);

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

  subCommands: {
    ...generatorCommands(),
    // g: COMMANDS.generator,
    // generator: COMMANDS.generator,
  },
});

function generatorCommands(deprecated?: boolean): SubCommandsDef {
  return generators.reduce((subCommands: SubCommandsDef, generator) => {
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
        description:
          generator.description +
          (deprecated
            ? ` [DEPRECATED: Run \`gember generator ${generator.name}\` or \`gember g ${generator.name}\`]`
            : ""),
        name: generator.name,
      },

      run: (context): void => {
        if (deprecated) {
          logger.warn({
            message: `Running \`gember ${generator.name}\` is deprecated. Please run \`gember generator ${generator.name}\` or \`gember g ${generator.name}\` instead.`,
            tag: "DEPRECATION",
          });
        }

        logGemberErrors(async () => {
          await generator.run(context.args);

          if (context.args.test) {
            if (generator.isTestGenerator) {
              logger.warn(
                `You passed the \`--test\` option, but the \`${generator.name}\` generator is already a test generator.`,
              );
            } else if (generator.args.find((arg) => arg.name === "test")) {
              await getTestGenerator(generator.name).run(context.args);
            } else {
              logger.warn(
                `You passed the \`--test\` option, but the \`${generator.name}\` generator does not have a corresponding test generator.`,
              );
            }
          }
        });
      },
    };

    return subCommands;
  }, {});
}

export async function run(): Promise<void> {
  await runMain(main);
}
