import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` route", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route", "foo");

  const content = await pkg.readFile("src/routes/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` route", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route", "foo", "--typescript");

  const content = await pkg.readFile("src/routes/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` route at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` route at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route", "foo", "--path=src/-private", "--typescript");

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.js` route", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route", "foo/bar");

  const content = await pkg.readFile("src/routes/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.ts` route", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route", "foo/bar", "--typescript");

  const content = await pkg.readFile("src/routes/foo/bar.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a corresponding route-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route", "foo", "--test");

  ctx.expect(await pkg.pathExists("src/routes/foo.js")).to.equal(true);
  ctx
    .expect(await pkg.pathExists("tests/unit/routes/foo-test.js"))
    .to.equal(true);
});

it("destroys a route", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("route", "foo");

  ctx.expect(await pkg.pathExists("src/routes/foo.js")).to.equal(true);

  await pkg.gember("route", "foo", "--destroy");

  ctx.expect(await pkg.pathExists("src/routes/foo.js")).to.equal(false);
});
