import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` route-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route-test", "foo");

  const content = await pkg.readFile("tests/unit/routes/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` route-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route-test", "foo", "--path=tests/foo");

  const content = await pkg.readFile("tests/foo/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` route-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route-test", "foo", "--typescript");

  const content = await pkg.readFile("tests/unit/routes/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` route-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route-test", "foo", "--path=tests/foo", "--typescript");

  const content = await pkg.readFile("tests/foo/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("destroys a route-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route-test", "foo");

  ctx
    .expect(await pkg.pathExists("tests/unit/routes/foo-test.js"))
    .to.equal(true);

  await pkg.gember("route-test", "foo", "--destroy");

  ctx
    .expect(await pkg.pathExists("tests/unit/routes/foo-test.js"))
    .to.equal(false);
});
