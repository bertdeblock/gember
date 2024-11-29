import { afterEach, it } from "vitest";
import { generateComponent } from "../src/generators.ts";
import { Package } from "./helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("supports v1 apps", async (ctx) => {
  pkg = await Package.create("v1-app");

  await generateComponent("foo", pkg.path);

  const content = await pkg.readFile("app/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("supports v2 apps", async (ctx) => {
  pkg = await Package.create("v2-app");

  await generateComponent("foo", pkg.path);

  const content = await pkg.readFile("app/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("supports v1 addons", async (ctx) => {
  pkg = await Package.create("v1-addon");

  await generateComponent("foo", pkg.path);

  const content = await pkg.readFile("addon/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("supports v2 addons", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await generateComponent("foo", pkg.path);

  const content = await pkg.readFile("src/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});
