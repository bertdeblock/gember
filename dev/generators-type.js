// eslint-disable-next-line n/no-missing-import
import { generators } from "../dist/generators/generators.js";

let generatorsType = "";

for (const generator of generators) {
  generatorsType += `${generator.name.includes("-") ? `"${generator.name}"` : generator.name}?: {\n`;

  for (const arg of generator.args) {
    if (arg.type === "positional") {
      continue;
    }

    generatorsType += `  // ${arg.description}:\n`;
    generatorsType += `  ${arg.name}?: ${arg.type};\n`;
  }

  generatorsType += `};\n`;
}

console.log(generatorsType);
