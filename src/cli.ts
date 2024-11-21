import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { getConfig } from "./config.js";
import {
  generateComponent,
  generateHelper,
  generateModifier,
  generateService,
} from "./generators.js";
import { DocumentName } from "./types.js";

yargs(hideBin(process.argv))
  .command({
    command: "component [name]",
    describe: "Generate a new component",

    builder(yargs) {
      return yargs
        .positional("name", {
          demandOption: true,
          description: "The component's name",
          type: "string",
        })
        .option("class-based", {
          alias: ["class"],
          default: false,
          description: "Generate a class-based component",
          type: "boolean",
        })
        .option("path", {
          default: "",
          description: "Generate a component at a custom path",
          type: "string",
        })
        .option("typescript", {
          alias: ["ts"],
          default: false,
          description: "Generate a `.gts` component",
          type: "boolean",
        });
    },
    async handler(options) {
      generateComponent(
        options.name,
        await applyGemberConfig("component", {
          classBased: options.classBased,
          path: options.path,
          typescript: options.typescript,
        }),
      );
    },
  })
  .command({
    command: "helper [name]",
    describe: "Generate a new helper",

    builder(yargs) {
      return yargs
        .positional("name", {
          demandOption: true,
          description: "The helper's name",
          type: "string",
        })
        .option("class-based", {
          alias: ["class"],
          default: false,
          description: "Generate a class-based helper",
          type: "boolean",
        })
        .option("path", {
          default: "",
          description: "Generate a helper at a custom path",
          type: "string",
        })
        .option("typescript", {
          alias: ["ts"],
          default: false,
          description: "Generate a `.ts` helper",
          type: "boolean",
        });
    },
    async handler(options) {
      generateHelper(
        options.name,
        await applyGemberConfig("helper", {
          classBased: options.classBased,
          path: options.path,
          typescript: options.typescript,
        }),
      );
    },
  })
  .command({
    command: "modifier [name]",
    describe: "Generate a new modifier",

    builder(yargs) {
      return yargs
        .positional("name", {
          demandOption: true,
          description: "The modifier's name",
          type: "string",
        })
        .option("class-based", {
          alias: ["class"],
          default: false,
          description: "Generate a class-based modifier",
          type: "boolean",
        })
        .option("path", {
          default: "",
          description: "Generate a modifier at a custom path",
          type: "string",
        })
        .option("typescript", {
          alias: ["ts"],
          default: false,
          description: "Generate a `.ts` modifier",
          type: "boolean",
        });
    },
    async handler(options) {
      generateModifier(
        options.name,
        await applyGemberConfig("modifier", {
          classBased: options.classBased,
          path: options.path,
          typescript: options.typescript,
        }),
      );
    },
  })
  .command({
    command: "service [name]",
    describe: "Generate a new service",

    builder(yargs) {
      return yargs
        .positional("name", {
          demandOption: true,
          description: "The service's name",
          type: "string",
        })
        .option("path", {
          default: "",
          description: "Generate a service at a custom path",
          type: "string",
        })
        .option("typescript", {
          alias: ["ts"],
          default: false,
          description: "Generate a `.ts` service",
          type: "boolean",
        });
    },
    async handler(options) {
      generateService(
        options.name,
        await applyGemberConfig("service", {
          path: options.path,
          typescript: options.typescript,
        }),
      );
    },
  })
  .demandCommand()
  .strict()
  .parse();

async function applyGemberConfig(documentName: DocumentName, options: object) {
  const config = await getConfig();

  return Object.assign(
    { typescript: config.typescript },
    config.generators?.[documentName],
    options,
  );
}
