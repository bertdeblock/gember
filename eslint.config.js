import eslint from "@eslint/js";
import eslintPluginNode from "eslint-plugin-n";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(
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
      "test/packages",
    ],
  },
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
);
