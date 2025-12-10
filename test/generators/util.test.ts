import { afterEach, describe, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` util", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util", "foo");

  const content = await pkg.readFile("src/utils/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` util", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util", "foo", "--typescript");

  const content = await pkg.readFile("src/utils/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` util at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` util at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util", "foo", "--path=src/-private", "--typescript");

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.js` util", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util", "foo/bar");

  const content = await pkg.readFile("src/utils/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.ts` util", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util", "foo/bar", "--typescript");

  const content = await pkg.readFile("src/utils/foo/bar.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a corresponding util-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util", "foo", "--test");

  ctx.expect(await pkg.pathExists("src/utils/foo.js")).to.equal(true);
  ctx
    .expect(await pkg.pathExists("tests/unit/utils/foo-test.js"))
    .to.equal(true);
});

it("destroys a util", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("util", "foo");

  ctx.expect(await pkg.pathExists("src/utils/foo.js")).to.equal(true);

  await pkg.gember("util", "foo", "--destroy");

  ctx.expect(await pkg.pathExists("src/utils/foo.js")).to.equal(false);
});

describe("generates a named export", () => {
  for (const args of [[], ["--typescript"]]) {
    it(args.length ? args.join(" ") : "no extra args", async (ctx) => {
      pkg = await Package.create("v2-addon");

      await pkg.gember("util", "foo", "--namedExport", ...args);

      const content = await pkg.readFile(addExtension("src/utils/foo", args));

      ctx.expect(content).toMatchSnapshot();
    });
  }
});

function addExtension(path: string, args: string[]): string {
  return path + (args.includes("--typescript") ? ".ts" : ".js");
}
