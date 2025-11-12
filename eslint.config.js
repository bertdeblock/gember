import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginNode from "eslint-plugin-n";
import typescriptEslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  typescriptEslint.configs.recommended,
  eslintPluginNode.configs["flat/recommended-module"],
  {
    ignores: [
      "bin",
      "coverage",
      "dist",
      "templates",
      "test/output",
      "test/packages/**/*.cjs",
    ],
  },
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
);
