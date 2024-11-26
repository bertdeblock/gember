import { Project } from "fixturify-project";
import { it } from "vitest";
import { resolveConfig } from "../src/config.js";
import { generateComponent } from "../src/generators.ts";
import { gember, Package } from "./helpers.js";

it("supports a `gember.config.js` file", async (ctx) => {
  const project = new Project({
    files: {
      "gember.config.js": "export default () => ({ hooks: {} });",
      "package.json": '{ "type": "module" }',
    },
  });

  await project.write();

  const config = await resolveConfig(project.baseDir);

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

  const config = await resolveConfig(project.baseDir);

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

  const config = await resolveConfig(project.baseDir);

  ctx.expect(config).to.deep.equal({ hooks: {} });
});

it("runs the `postGenerate` hook", async (ctx) => {
  const pkg = await Package.create("v2-addon-config", "post-generate-info");

  await generateComponent("foo", pkg.path);

  const content = await pkg.readFile("post-generate-info.json");

  ctx.expect(content).toMatchSnapshot();

  await pkg.cleanUp();
});

it("applies specific generator options", async (ctx) => {
  const pkg = await Package.create("v2-addon-config");

  await gember(["component", "foo"], { cwd: pkg.path });

  const content = await pkg.readFile("src/components/foo.gts");

  ctx.expect(content).toMatchSnapshot();

  await pkg.cleanUp();
});
