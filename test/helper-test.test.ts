import { afterEach, it } from "vitest";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.gjs` helper-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper-test", "foo");

  const content = await pkg.readFile("tests/integration/helpers/foo-test.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gjs` helper-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper-test", "foo", "--path=tests/foo");

  const content = await pkg.readFile("tests/foo/foo-test.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gts` helper-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper-test", "foo", "--ts");

  const content = await pkg.readFile("tests/integration/helpers/foo-test.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gts` helper-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper-test", "foo", "--path=tests/foo", "--ts");

  const content = await pkg.readFile("tests/foo/foo-test.gts");

  ctx.expect(content).toMatchSnapshot();
});
