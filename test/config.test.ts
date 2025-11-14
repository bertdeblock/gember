import { afterEach, it } from "vitest";
import { resolveConfig } from "../src/config.js";
import { Package } from "./helpers.js";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("supports a `gember.config.js` file", async (ctx) => {
  pkg = await Package.create("v2-addon-config-js");

  const config = await resolveConfig(pkg.path);

  ctx.expect(config).to.deep.equal({ hooks: {} });
});

it("supports a `gember.config.cjs` file", async (ctx) => {
  pkg = await Package.create("v2-addon-config-cjs");

  const config = await resolveConfig(pkg.path);

  ctx.expect(config).to.deep.equal({ hooks: {} });
});

it("supports a `gember.config.mjs` file", async (ctx) => {
  pkg = await Package.create("v2-addon-config-mjs");

  const config = await resolveConfig(pkg.path);

  ctx.expect(config).to.deep.equal({ hooks: {} });
});

it("runs the `postGenerate` hook", async (ctx) => {
  pkg = await Package.create("v2-addon-config", "post-generate-info");

  await pkg.gember("component", "foo");

  const content = await pkg.readFile("post-generate-info.json");

  ctx.expect(content).toMatchSnapshot();

  await pkg.cleanUp();
});

it("applies specific generator options", async (ctx) => {
  pkg = await Package.create("v2-addon-config");

  await pkg.gember("component", "foo");

  const content = await pkg.readFile("src/components/foo.gts");

  ctx.expect(content).toMatchSnapshot();

  await pkg.cleanUp();
});
