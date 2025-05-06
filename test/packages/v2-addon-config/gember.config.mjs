import { writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { dirname, join } from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";

/** @type {import('../../../src/config.ts').Config} */
export default {
  generators: {
    component: {
      classBased: true,
    },
  },

  hooks: {
    postGenerate: async (info) => {
      const file = join(
        dirname(fileURLToPath(import.meta.url)),
        "post-generate-info.json",
      );

      for (const file of info.files) {
        // Support Windows:
        file.content = file.content.replaceAll(EOL, "\n");

        // Because the absolute path is different on each machine:
        file.dir = file.dir.replace(cwd(), "");
        file.path = file.path.replace(cwd(), "");
      }

      await writeFile(file, JSON.stringify(info, null, 2));
    },
  },

  typescript: true,
};
