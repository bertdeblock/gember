import { input, select } from "@inquirer/prompts";
import { cwd } from "node:process";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import {
  generateComponent,
  generateHelper,
  generateModifier,
  generateService,
} from "./generators.js";
import { type DocumentName } from "./types.js";
import { getConfig } from "./config.js";

const DOCUMENT_GENERATOR: Record<
  DocumentName,
  (name: string, options: object) => Promise<void>
> = {
  component: generateComponent,
  helper: generateHelper,
  modifier: generateModifier,
  service: generateService,
};

yargs(hideBin(process.argv))
  .command({
    command: "*",
    describe: "Generate interactively",

    async handler() {
      const documentName = await select({
        message: "Select a document to generate",
        choices: Object.keys(DOCUMENT_GENERATOR).map((documentName) => ({
          description: `Generate a new ${documentName}`,
          name: documentName,
          value: documentName,
        })),
      });

      const name = await input({
        message: "Enter a name",
        validate: (name) => (name.trim() ? true : "Please enter a name"),
      });

      const config = await getConfig(cwd());

      DOCUMENT_GENERATOR[documentName as DocumentName](name, {
        path: config.generator[documentName as DocumentName].path,
        ts: config.ts,
      });
    },
  })
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
        .option("ts", {
          default: false,
          description: "Generate a `.gts` component",
          type: "boolean",
        });
    },
    async handler(options) {
      const config = await getConfig(cwd());

      generateComponent(options.name, {
        classBased: options.classBased,
        path: options.path || config.generator.component.path,
        ts: options.ts || config.ts,
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
        .option("ts", {
          default: false,
          description: "Generate a `.ts` helper",
          type: "boolean",
        });
    },
    async handler(options) {
      const config = await getConfig(cwd());

      generateHelper(options.name, {
        classBased: options.classBased,
        path: options.path || config.generator.helper.path,
        ts: options.ts || config.ts,
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
        .option("ts", {
          default: false,
          description: "Generate a `.ts` modifier",
          type: "boolean",
        });
    },
    async handler(options) {
      const config = await getConfig(cwd());

      generateModifier(options.name, {
        classBased: options.classBased,
        path: options.path || config.generator.modifier.path,
        ts: options.ts || config.ts,
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
    async handler(options) {
      const config = await getConfig(cwd());

      generateService(options.name, {
        path: options.path || config.generator.service.path,
        ts: options.ts || config.ts,
      });
    },
  })
  .demandCommand()
  .strict()
  .parse();
