import { cwd } from "node:process";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { logGemberErrors } from "./errors.js";
import {
  generateComponent,
  generateHelper,
  generateModifier,
  generateService,
} from "./generators.js";

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
          description: "Generate a class-based component",
          type: "boolean",
        })
        .option("path", {
          description: "Generate a component at a custom path",
          type: "string",
        })
        .option("typescript", {
          alias: ["ts"],
          description: "Generate a `.gts` component",
          type: "boolean",
        });
    },
    handler(options) {
      logGemberErrors(() =>
        generateComponent(options.name, cwd(), {
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
          description: "Generate a class-based helper",
          type: "boolean",
        })
        .option("path", {
          description: "Generate a helper at a custom path",
          type: "string",
        })
        .option("typescript", {
          alias: ["ts"],
          description: "Generate a `.ts` helper",
          type: "boolean",
        });
    },
    handler(options) {
      logGemberErrors(() =>
        generateHelper(options.name, cwd(), {
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
          description: "Generate a class-based modifier",
          type: "boolean",
        })
        .option("path", {
          description: "Generate a modifier at a custom path",
          type: "string",
        })
        .option("typescript", {
          alias: ["ts"],
          description: "Generate a `.ts` modifier",
          type: "boolean",
        });
    },
    handler(options) {
      logGemberErrors(() =>
        generateModifier(options.name, cwd(), {
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
          description: "Generate a service at a custom path",
          type: "string",
        })
        .option("typescript", {
          alias: ["ts"],
          description: "Generate a `.ts` service",
          type: "boolean",
        });
    },
    handler(options) {
      logGemberErrors(() =>
        generateService(options.name, cwd(), {
          path: options.path,
          typescript: options.typescript,
        }),
      );
    },
  })
  .demandCommand()
  .epilogue("🫚 More info at https://github.com/bertdeblock/gember#usage")
  .strict()
  .parse();
