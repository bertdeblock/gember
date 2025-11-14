import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.gjs` component-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component-test", "foo");

  const content = await pkg.readFile(
    "tests/integration/components/foo-test.gjs",
  );

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gjs` component-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component-test", "foo", "--path=tests/foo");

  const content = await pkg.readFile("tests/foo/foo-test.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gts` component-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component-test", "foo", "--typescript");

  const content = await pkg.readFile(
    "tests/integration/components/foo-test.gts",
  );

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gts` component-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component-test", "foo", "--path=tests/foo", "--typescript");

  const content = await pkg.readFile("tests/foo/foo-test.gts");

  ctx.expect(content).toMatchSnapshot();
});
