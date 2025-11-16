import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` controller", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller", "foo");

  const content = await pkg.readFile("src/controllers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` controller", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller", "foo", "--typescript");

  const content = await pkg.readFile("src/controllers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` controller at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` controller at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller", "foo", "--path=src/-private", "--typescript");

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.js` controller", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller", "foo/bar");

  const content = await pkg.readFile("src/controllers/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.ts` controller", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller", "foo/bar", "--typescript");

  const content = await pkg.readFile("src/controllers/foo/bar.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a corresponding controller-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller", "foo", "--test");

  ctx.expect(await pkg.pathExists("src/controllers/foo.js")).to.equal(true);
  ctx
    .expect(await pkg.pathExists("tests/unit/controllers/foo-test.js"))
    .to.equal(true);
});

it("destroys a controller", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller", "foo");

  ctx.expect(await pkg.pathExists("src/controllers/foo.js")).to.equal(true);

  await pkg.gember("controller", "foo", "--destroy");

  ctx.expect(await pkg.pathExists("src/controllers/foo.js")).to.equal(false);
});
