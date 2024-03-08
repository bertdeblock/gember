import { cwd } from "node:process";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
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
        .option("gts", {
          default: false,
          description: "Generate a `.gts` component",
          type: "boolean",
        })
        .option("path", {
          default: "",
          description: "Generate a component at a custom path",
          type: "string",
        });
    },
    handler(options) {
      generateComponent(options.name, cwd(), {
        gts: options.gts,
        path: options.path,
      });
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
        .option("path", {
          default: "",
          description: "Generate a helper at a custom path",
          type: "string",
        })
        .option("ts", {
          default: false,
          description: "Generate a `.ts` helper",
          type: "boolean",
        });
    },
    handler(options) {
      generateHelper(options.name, cwd(), {
        path: options.path,
        ts: options.ts,
      });
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
        .option("path", {
          default: "",
          description: "Generate a modifier at a custom path",
          type: "string",
        })
        .option("ts", {
          default: false,
          description: "Generate a `.ts` modifier",
          type: "boolean",
        });
    },
    handler(options) {
      generateModifier(options.name, cwd(), {
        path: options.path,
        ts: options.ts,
      });
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
        .option("ts", {
          default: false,
          description: "Generate a `.ts` service",
          type: "boolean",
        });
    },
    handler(options) {
      generateService(options.name, cwd(), {
        path: options.path,
        ts: options.ts,
      });
    },
  })
  .demandCommand()
  .strict()
  .parse();
