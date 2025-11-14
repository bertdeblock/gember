import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("supports v1 apps", async (ctx) => {
  pkg = await Package.create("v1-app");

  await pkg.gember("component", "foo");

  const content = await pkg.readFile("app/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("supports v2 apps", async (ctx) => {
  pkg = await Package.create("v2-app");

  await pkg.gember("component", "foo");

  const content = await pkg.readFile("app/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("supports v1 addons", async (ctx) => {
  pkg = await Package.create("v1-addon");

  await pkg.gember("component", "foo");

  const content = await pkg.readFile("addon/components/foo.gjs");

  ctx.expect(content).toMatchSnapshot();
});

it("supports v2 addons", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.remove("tests/helpers.ts");
  await pkg.gember("component", "foo");
  await pkg.gember("component-test", "foo");

  ctx.expect(await pkg.readFile("src/components/foo.gjs")).toMatchSnapshot();
  ctx
    .expect(await pkg.readFile("tests/integration/components/foo-test.gjs"))
    .toMatchSnapshot();
});
