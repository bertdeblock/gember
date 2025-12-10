import { afterEach, describe, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a template-only `.gjs` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo");

  const content = await pkg.readFile("src/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gjs` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo", "--classBased");

  const content = await pkg.readFile("src/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gjs` component at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo", "--typescript");

  const content = await pkg.readFile("src/components/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gts` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo", "--classBased", "--typescript");

  const content = await pkg.readFile("src/components/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` component at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo", "--path=src/-private", "--typescript");

  const content = await pkg.readFile("src/-private/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested template-only `.gjs` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo/bar");

  const content = await pkg.readFile("src/components/foo/bar.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested colocated template-only `.gjs` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo/bar", "--nested");

  const content = await pkg.readFile("src/components/foo/bar/index.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a corresponding component-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo", "--test");

  ctx.expect(await pkg.pathExists("src/components/foo.gjs")).to.equal(true);
  ctx
    .expect(await pkg.pathExists("tests/integration/components/foo-test.gjs"))
    .to.equal(true);
});

it("destroys a component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo");

  ctx.expect(await pkg.pathExists("src/components/foo.gjs")).to.equal(true);

  await pkg.gember("component", "foo", "--destroy");

  ctx.expect(await pkg.pathExists("src/components/foo.gjs")).to.equal(false);
});

describe("generates a named export", () => {
  for (const args of [
    ["--classBased"],
    ["--classBased", "--typescript"],
    ["--typescript"],
  ]) {
    it(args.length ? args.join(" ") : "no extra args", async (ctx) => {
      pkg = await Package.create("v2-addon");

      await pkg.gember("component", "foo", "--namedExport", ...args);

      const content = await pkg.readFile(
        addExtension("src/components/foo", args),
      );

      ctx.expect(content).toMatchSnapshot();
    });
  }
});

function addExtension(path: string, args: string[]): string {
  return path + (args.includes("--typescript") ? ".gts" : ".gjs");
}
