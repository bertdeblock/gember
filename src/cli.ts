import { defineCommand, runMain, type SubCommandsDef } from "citty";
import { generators } from "./generators.js";

const main = defineCommand({
  meta: {
    name: "gember",
    version: "TODO",
    description:
      "Generate components, helpers, modifiers and services in v1/v2 apps/addons.",
  },
  subCommands: generators.reduce((subCommands: SubCommandsDef, generator) => {
    subCommands[generator.name] = generator.commandDef;

    return subCommands;
  }, {}),
});

runMain(main);
