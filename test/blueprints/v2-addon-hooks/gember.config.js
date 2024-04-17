import { writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export default {
  hooks: {
    postGenerate: async (info) => {
      const directory = dirname(fileURLToPath(import.meta.url));
      const file = join(directory, "post-generate-info.json");

      for (const file of info.files) {
        // Because the absolute path is different on each machine:
        file.path = relative("test/output", file.path);
      }

      await writeFile(file, JSON.stringify(info, null, 2));
    },
  },
};
