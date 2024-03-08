"use strict";

module.exports = {
  env: { node: true },
  extends: [
    "eslint:recommended",
    "plugin:n/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest" },
  plugins: ["@typescript-eslint"],
  root: true,
};
