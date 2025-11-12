import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` service-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service-test", "foo");

  const content = await pkg.readFile("tests/unit/services/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` service-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service-test", "foo", "--path=tests/foo");

  const content = await pkg.readFile("tests/foo/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` service-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service-test", "foo", "--typescript");

  const content = await pkg.readFile("tests/unit/services/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` service-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service-test", "foo", "--path=tests/foo", "--typescript");

  const content = await pkg.readFile("tests/foo/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});
