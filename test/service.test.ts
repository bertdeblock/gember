import { afterEach, it } from "vitest";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` service", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service", "foo");

  const content = await pkg.readFile("src/services/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` service", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service", "foo", "--ts");

  const content = await pkg.readFile("src/services/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` service at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service", "foo", "--path=src/-private");

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` service at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service", "foo", "--path=src/-private", "--ts");

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.js` service", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service", "foo/bar");

  const content = await pkg.readFile("src/services/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.ts` service", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("service", "foo/bar", "--ts");

  const content = await pkg.readFile("src/services/foo/bar.ts");

  ctx.expect(content).toMatchSnapshot();
});
