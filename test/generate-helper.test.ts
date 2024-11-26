import { afterEach, it } from "vitest";
import { generateHelper } from "../src/generators.ts";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a function-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateHelper("foo", pkg.path);

  const content = await pkg.readFile("src/helpers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateHelper("foo", pkg.path, { classBased: true });

  const content = await pkg.readFile("src/helpers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.js` helper at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateHelper("foo", pkg.path, { path: "src/-private" });

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateHelper("foo", pkg.path, { typescript: true });

  const content = await pkg.readFile("src/helpers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.ts` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateHelper("foo", pkg.path, { classBased: true, typescript: true });

  const content = await pkg.readFile("src/helpers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` helper at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateHelper("foo", pkg.path, {
    path: "src/-private",
    typescript: true,
  });

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested function-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateHelper("foo/bar", pkg.path);

  const content = await pkg.readFile("src/helpers/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});
