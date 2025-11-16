import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginNode from "eslint-plugin-n";
import typescriptEslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    "bin",
    "coverage",
    "dist",
    "templates",
    "test/output",
    "test/packages/**/*.cjs",
  ]),

  eslint.configs.recommended,
  typescriptEslint.configs.recommended,
  eslintPluginNode.configs["flat/recommended-module"],

  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
);
