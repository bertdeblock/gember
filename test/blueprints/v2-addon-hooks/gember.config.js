import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export default {
  hooks: {
    postGenerate: async (info) => {
      const directory = dirname(fileURLToPath(import.meta.url));
      const file = join(directory, "post-generate-info.json");

      await writeFile(file, JSON.stringify(info, null, 2));
    },
  },
};
