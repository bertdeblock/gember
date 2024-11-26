import { writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('../../../src/config.ts').Config} */
export default {
  hooks: {
    postGenerate: async (info) => {
      const file = join(
        dirname(fileURLToPath(import.meta.url)),
        "post-generate-info.json",
      );

      for (const file of info.files) {
        // Support Windows:
        file.content = file.content.replace(EOL, "\n");

        // Because the absolute path is different on each machine:
        file.path = relative("test/output", file.path).split(sep).join("/");
      }

      await writeFile(file, JSON.stringify(info, null, 2));
    },
  },
};
