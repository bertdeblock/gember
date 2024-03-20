import fsExtra from "fs-extra";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { afterEach, it } from "vitest";
import { generateComponent } from "../src/generators.ts";
import { copyBlueprint } from "./helpers.ts";

let cwd: string;

afterEach(() => fsExtra.remove(cwd));

it("generates a template-only `.gjs` component", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateComponent("foo", { cwd });

  const content = await readFile(join(cwd, "src/components/foo.gjs"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gjs` component", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateComponent("foo", { classBased: true, cwd });

  const content = await readFile(join(cwd, "src/components/foo.gjs"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gjs` component at a custom path", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateComponent("foo", { cwd, path: "src/-private" });

  const content = await readFile(join(cwd, "src/-private/foo.gjs"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` component", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateComponent("foo", { cwd, ts: true });

  const content = await readFile(join(cwd, "src/components/foo.gts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a class-based `.gts` component", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateComponent("foo", { classBased: true, cwd, ts: true });

  const content = await readFile(join(cwd, "src/components/foo.gts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});

it("generates a template-only `.gts` component at a custom path", async (ctx) => {
  cwd = await copyBlueprint("v2-addon");

  await generateComponent("foo", { cwd, path: "src/-private", ts: true });

  const content = await readFile(join(cwd, "src/-private/foo.gts"), "utf-8");

  ctx.expect(content).toMatchSnapshot();
});
