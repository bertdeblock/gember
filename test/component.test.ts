import { afterEach, it } from "vitest";
import { Package } from "./helpers.ts";

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

  await pkg.gember("component", "foo", "--class");

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

  await pkg.gember("component", "foo", "--ts");

  const content = await pkg.readFile("src/components/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gts` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo", "--class", "--ts");

  const content = await pkg.readFile("src/components/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` component at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("component", "foo", "--path=src/-private", "--ts");

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
