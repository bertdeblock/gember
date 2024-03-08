import fsExtra from "fs-extra";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { afterEach, it } from "vitest";
import { generateHelper } from "../src/generators.ts";
import { copyBlueprint } from "./helpers.ts";

let cwd: string;

afterEach(() => fsExtra.remove(cwd));

it("generates a `.js` helper", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateHelper("foo", cwd);

  const content = await readFile(join(cwd, "src/helpers/foo.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` helper", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateHelper("foo", cwd, { ts: true });

  const content = await readFile(join(cwd, "src/helpers/foo.ts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` helper at a custom path", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateHelper("foo", cwd, { path: "src/-private" });

  const content = await readFile(join(cwd, "src/-private/foo.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` helper at a custom path", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateHelper("foo", cwd, {
    path: "src/-private",
    ts: true,
  });

  const content = await readFile(join(cwd, "src/-private/foo.ts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});
