import fsExtra from "fs-extra";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { afterEach, it } from "vitest";
import { generateModifier } from "../src/generators.ts";
import { copyBlueprint } from "./helpers.ts";

let cwd: string;

afterEach(() => fsExtra.remove(cwd));

it("generates a function-based `.js` modifier", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateModifier("foo", { cwd });

  const content = await readFile(join(cwd, "src/modifiers/foo.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.js` modifier", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateModifier("foo", { classBased: true, cwd });

  const content = await readFile(join(cwd, "src/modifiers/foo.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.js` modifier at a custom path", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateModifier("foo", { cwd, path: "src/-private" });

  const content = await readFile(join(cwd, "src/-private/foo.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` modifier", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateModifier("foo", { cwd, typescript: true });

  const content = await readFile(join(cwd, "src/modifiers/foo.ts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.ts` modifier", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateModifier("foo", { classBased: true, cwd, typescript: true });

  const content = await readFile(join(cwd, "src/modifiers/foo.ts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a function-based `.ts` modifier at a custom path", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateModifier("foo", { cwd, path: "src/-private", typescript: true });

  const content = await readFile(join(cwd, "src/-private/foo.ts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});
