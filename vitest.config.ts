import { defineConfig } from "vitest/config";

export default defineConfig({
  server: {
    watch: {
      ignored: ["**/test/output/**"],
    },
  },
  test: {
    coverage: {
      exclude: ["**/dev/**", "**/templates/**"],
    },
    forceRerunTriggers: ["**/dist/**", "**/templates/**"],
  },
});
