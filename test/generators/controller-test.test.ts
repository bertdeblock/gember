import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` controller-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller-test", "foo");

  const content = await pkg.readFile("tests/unit/controllers/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` controller-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller-test", "foo", "--path=tests/foo");

  const content = await pkg.readFile("tests/foo/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` controller-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller-test", "foo", "--typescript");

  const content = await pkg.readFile("tests/unit/controllers/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` controller-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember(
    "controller-test",
    "foo",
    "--path=tests/foo",
    "--typescript",
  );

  const content = await pkg.readFile("tests/foo/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("destroys a controller-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("controller-test", "foo");

  ctx
    .expect(await pkg.pathExists("tests/unit/controllers/foo-test.js"))
    .to.equal(true);

  await pkg.gember("controller-test", "foo", "--destroy");

  ctx
    .expect(await pkg.pathExists("tests/unit/controllers/foo-test.js"))
    .to.equal(false);
});
