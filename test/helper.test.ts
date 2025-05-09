import { afterEach, it } from "vitest";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a function-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo");

  const content = await pkg.readFile("src/helpers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--class");

  const content = await pkg.readFile("src/helpers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.js` helper at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--ts");

  const content = await pkg.readFile("src/helpers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.ts` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--class", "--ts");

  const content = await pkg.readFile("src/helpers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` helper at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--path=src/-private", "--ts");

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested function-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo/bar");

  const content = await pkg.readFile("src/helpers/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});
