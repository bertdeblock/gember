import { afterEach, it } from "vitest";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.gjs` modifier-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier-test", "foo");

  const content = await pkg.readFile(
    "tests/integration/modifiers/foo-test.gjs",
  );

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gjs` modifier-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier-test", "foo", "--path=tests/foo");

  const content = await pkg.readFile("tests/foo/foo-test.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gts` modifier-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier-test", "foo", "--ts");

  const content = await pkg.readFile(
    "tests/integration/modifiers/foo-test.gts",
  );

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gts` modifier-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier-test", "foo", "--path=tests/foo", "--ts");

  const content = await pkg.readFile("tests/foo/foo-test.gts");

  ctx.expect(content).toMatchSnapshot();
});
