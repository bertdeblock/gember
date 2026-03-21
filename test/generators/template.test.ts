import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a template-only `.gjs` template", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("template", "foo");

  const content = await pkg.readFile("src/templates/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gjs` template", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("template", "foo", "--classBased");

  const content = await pkg.readFile("src/templates/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gjs` template at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("template", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` template", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("template", "foo", "--typescript");

  const content = await pkg.readFile("src/templates/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gts` template", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("template", "foo", "--classBased", "--typescript");

  const content = await pkg.readFile("src/templates/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` template at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("template", "foo", "--path=src/-private", "--typescript");

  const content = await pkg.readFile("src/-private/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested template-only `.gjs` template", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("template", "foo/bar");

  const content = await pkg.readFile("src/templates/foo/bar.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("destroys a template", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("template", "foo");

  ctx.expect(await pkg.pathExists("src/templates/foo.gjs")).to.equal(true);

  await pkg.gember("template", "foo", "--destroy");

  ctx.expect(await pkg.pathExists("src/templates/foo.gjs")).to.equal(false);
});
