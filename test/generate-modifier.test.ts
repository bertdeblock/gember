import { afterEach, it } from "vitest";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a function-based `.js` modifier", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier", "foo");

  const content = await pkg.readFile("src/modifiers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.js` modifier", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier", "foo", "--class");

  const content = await pkg.readFile("src/modifiers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.js` modifier at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` modifier", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier", "foo", "--ts");

  const content = await pkg.readFile("src/modifiers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.ts` modifier", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier", "foo", "--class", "--ts");

  const content = await pkg.readFile("src/modifiers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` modifier at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier", "foo", "--path=src/-private", "--ts");

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested function-based `.js` modifier", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier", "foo/bar");

  const content = await pkg.readFile("src/modifiers/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});
