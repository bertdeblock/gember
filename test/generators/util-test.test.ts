import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` util-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util-test", "foo");

  const content = await pkg.readFile("tests/unit/utils/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` util-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util-test", "foo", "--path=tests/foo");

  const content = await pkg.readFile("tests/foo/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` util-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util-test", "foo", "--typescript");

  const content = await pkg.readFile("tests/unit/utils/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` util-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util-test", "foo", "--path=tests/foo", "--typescript");

  const content = await pkg.readFile("tests/foo/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("destroys a util-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util-test", "foo");

  ctx
    .expect(await pkg.pathExists("tests/unit/utils/foo-test.js"))
    .to.equal(true);

  await pkg.gember("util-test", "foo", "--destroy");

  ctx
    .expect(await pkg.pathExists("tests/unit/utils/foo-test.js"))
    .to.equal(false);
});
