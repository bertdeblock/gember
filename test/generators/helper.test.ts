import { afterEach, describe, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a function-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo");

  const content = await pkg.readFile("src/helpers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--classBased");

  const content = await pkg.readFile("src/helpers/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.js` helper at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--typescript");

  const content = await pkg.readFile("src/helpers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.ts` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--classBased", "--typescript");

  const content = await pkg.readFile("src/helpers/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` helper at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--path=src/-private", "--typescript");

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested function-based `.js` helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo/bar");

  const content = await pkg.readFile("src/helpers/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a corresponding helper-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo", "--test");

  ctx.expect(await pkg.pathExists("src/helpers/foo.js")).to.equal(true);
  ctx
    .expect(await pkg.pathExists("tests/integration/helpers/foo-test.gjs"))
    .to.equal(true);
});

it("destroys a helper", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("helper", "foo");

  ctx.expect(await pkg.pathExists("src/helpers/foo.js")).to.equal(true);

  await pkg.gember("helper", "foo", "--destroy");

  ctx.expect(await pkg.pathExists("src/helpers/foo.js")).to.equal(false);
});

describe("generates a named export", () => {
  for (const args of [
    [],
    ["--classBased"],
    ["--classBased", "--typescript"],
    ["--typescript"],
  ]) {
    it(args.length ? args.join(" ") : "no extra args", async (ctx) => {
      pkg = await Package.create("v2-addon");

      await pkg.gember("helper", "foo", "--namedExport", ...args);

      const content = await pkg.readFile(addExtension("src/helpers/foo", args));

      ctx.expect(content).toMatchSnapshot();
    });
  }
});

function addExtension(path: string, args: string[]): string {
  return path + (args.includes("--typescript") ? ".ts" : ".js");
}
