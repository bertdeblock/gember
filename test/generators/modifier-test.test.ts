import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

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

  await pkg.gember("modifier-test", "foo", "--typescript");

  const content = await pkg.readFile(
    "tests/integration/modifiers/foo-test.gts",
  );

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gts` modifier-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier-test", "foo", "--path=tests/foo", "--typescript");

  const content = await pkg.readFile("tests/foo/foo-test.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("destroys a modifier-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("modifier-test", "foo");

  ctx
    .expect(await pkg.pathExists("tests/integration/modifiers/foo-test.gjs"))
    .to.equal(true);

  await pkg.gember("modifier-test", "foo", "--destroy");

  ctx
    .expect(await pkg.pathExists("tests/integration/modifiers/foo-test.gjs"))
    .to.equal(false);
});
