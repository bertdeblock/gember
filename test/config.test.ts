import { Project } from "fixturify-project";
import { remove } from "fs-extra";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { it } from "vitest";
import { getConfig } from "../src/config.js";
import { generateComponent } from "../src/generators.ts";
import { copyBlueprint } from "./helpers.js";

it("supports a `gember.config.js` file", async (ctx) => {
  const project = new Project({
    files: {
      "gember.config.js": "export default () => ({ hooks: {} });",
      "package.json": '{ "type": "module" }',
    },
  });

  await project.write();

  const config = await getConfig(project.baseDir);

  ctx.expect(config).to.deep.equal({ hooks: {} });
});

it("supports a `gember.config.cjs` file", async (ctx) => {
  const project = new Project({
    files: {
      "gember.config.cjs": "module.exports = { hooks: {} };",
      "package.json": '{ "type": "module" }',
    },
  });

  await project.write();

  const config = await getConfig(project.baseDir);

  ctx.expect(config).to.deep.equal({ hooks: {} });
});

it("supports a `gember.config.mjs` file", async (ctx) => {
  const project = new Project({
    files: {
      "gember.config.mjs": "export default async () => ({ hooks: {} });",
      "package.json": '{ "type": "module" }',
    },
  });

  await project.write();

  const config = await getConfig(project.baseDir);

  ctx.expect(config).to.deep.equal({ hooks: {} });
});

it("runs the `postGenerate` hook", async (ctx) => {
  const cwd = await copyBlueprint("v2-addon-hooks", "post-generate-info");

  await generateComponent("foo", { cwd });

  const content = await readFile(join(cwd, "post-generate-info.json"), "utf-8");

  ctx.expect(content).toMatchSnapshot();

  await remove(cwd);
});
