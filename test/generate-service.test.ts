import { afterEach, it } from "vitest";
import { generateService } from "../src/generators.ts";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` service", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateService("foo", pkg.path);

  const content = await pkg.readFile("src/services/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` service", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateService("foo", pkg.path, { typescript: true });

  const content = await pkg.readFile("src/services/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` service at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateService("foo", pkg.path, { path: "src/-private" });

  const content = await pkg.readFile("src/-private/foo.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` service at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateService("foo", pkg.path, {
    path: "src/-private",
    typescript: true,
  });

  const content = await pkg.readFile("src/-private/foo.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.js` service", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateService("foo/bar", pkg.path);

  const content = await pkg.readFile("src/services/foo/bar.js");

  ctx.expect(content).toMatchSnapshot();
});
