import { renderUsage } from "citty";
// eslint-disable-next-line n/no-missing-import
import { main } from "../dist/cli.js";

await generateUsage(main);

async function generateUsage(commandDef) {
  console.log(`### ${commandDef.meta.name}`);
  console.log(`
\`\`\`shell
${await renderUsage(commandDef)}
\`\`\``);

  if (commandDef.subCommands) {
    for (const subCommand in commandDef.subCommands) {
      await generateUsage(commandDef.subCommands[subCommand], commandDef);
    }
  }
}
