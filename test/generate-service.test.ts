import { remove } from "fs-extra";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { afterEach, it } from "vitest";
import { generateService } from "../src/generators.ts";
import { copyBlueprint } from "./helpers.ts";

let cwd: string;

afterEach(() => remove(cwd));

it("generates a `.js` service", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateService("foo", { cwd });

  const content = await readFile(join(cwd, "src/services/foo.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` service", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateService("foo", { cwd, typescript: true });

  const content = await readFile(join(cwd, "src/services/foo.ts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.js` service at a custom path", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateService("foo", { cwd, path: "src/-private" });

  const content = await readFile(join(cwd, "src/-private/foo.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` service at a custom path", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateService("foo", { cwd, path: "src/-private", typescript: true });

  const content = await readFile(join(cwd, "src/-private/foo.ts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a nested `.js` service", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateService("foo/bar", { cwd });

  const content = await readFile(join(cwd, "src/services/foo/bar.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});
