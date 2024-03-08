import fsExtra from "fs-extra";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { afterEach, it } from "vitest";
import { generateModifier } from "../src/generators.ts";
import { copyBlueprint } from "./helpers.ts";

let cwd: string;

afterEach(() => fsExtra.remove(cwd));

it("generates a `.js` modifier", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");
  console.log(cwd);

  await generateModifier("foo", cwd);

  const content = await readFile(join(cwd, "src/modifiers/foo.js"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.ts` modifier", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateModifier("foo", cwd, { ts: true });

  const content = await readFile(join(cwd, "src/modifiers/foo.ts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});