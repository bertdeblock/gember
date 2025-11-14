import { afterEach, it } from "vitest";
import { Package } from "../helpers.ts";

let pkg: Package;

afterEach(() => pkg.cleanUp());

it("generates a `.js` acceptance-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("acceptance-test", "foo");

  const content = await pkg.readFile("tests/acceptance/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` acceptance-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("acceptance-test", "foo", "--path=tests/foo");

  const content = await pkg.readFile("tests/foo/foo-test.js");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` acceptance-test", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember("acceptance-test", "foo", "--typescript");

  const content = await pkg.readFile("tests/acceptance/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` acceptance-test at a custom path", async (ctx) => {
  pkg = await Package.create("v2-addon");

  await pkg.gember(
    "acceptance-test",
    "foo",
    "--path=tests/foo",
    "--typescript",
  );

  const content = await pkg.readFile("tests/foo/foo-test.ts");

  ctx.expect(content).toMatchSnapshot();
});
