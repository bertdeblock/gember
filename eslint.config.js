import eslint from "@eslint/js";
import eslintPluginNode from "eslint-plugin-n";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(
  eslint.configs.recommended,
  typescriptEslint.configs.recommended,
  eslintPluginNode.configs["flat/recommended-module"],
  { ignores: ["coverage", "dist", "test/output"] },
);
