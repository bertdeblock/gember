import fsExtra from "fs-extra";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { afterEach, it } from "vitest";
import { generateComponent } from "../src/generators.ts";
import { copyBlueprint } from "./helpers.ts";

let cwd: string;

afterEach(() => fsExtra.remove(cwd));

it("generates a `.gjs` component", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");
  console.log(cwd);

  await generateComponent("foo", cwd);

  const content = await readFile(join(cwd, "src/components/foo.gjs"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a `.gts` component", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateComponent("foo", cwd, { gts: true });

  const content = await readFile(join(cwd, "src/components/foo.gts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});
