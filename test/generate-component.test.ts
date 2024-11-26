import { afterEach, it } from "vitest";
import { generateComponent } from "../src/generators.ts";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a template-only `.gjs` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateComponent("foo", pkg.path);

  const content = await pkg.readFile("src/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gjs` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateComponent("foo", pkg.path, { classBased: true });

  const content = await pkg.readFile("src/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gjs` component at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateComponent("foo", pkg.path, { path: "src/-private" });

  const content = await pkg.readFile("src/-private/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateComponent("foo", pkg.path, { typescript: true });

  const content = await pkg.readFile("src/components/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gts` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateComponent("foo", pkg.path, {
    classBased: true,
    typescript: true,
  });

  const content = await pkg.readFile("src/components/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` component at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateComponent("foo", pkg.path, {
    path: "src/-private",
    typescript: true,
  });

  const content = await pkg.readFile("src/-private/foo.gts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested template-only `.gjs` component", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateComponent("foo/bar", pkg.path);

  const content = await pkg.readFile("src/components/foo/bar.gjs");

  ctx.expect(content).toMatchSnapshot();
});
