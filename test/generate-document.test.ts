import { join } from "node:path";
import { it } from "vitest";
import { getGeneratePath } from "../src/generate.ts";
import { Package } from "./helpers.ts";

it("supports v1 apps", async (ctx) => {
  const name = "v1-app";
  const generatePath = await getGeneratePath(
    "component",
    Package.createPath(name),
  );

  ctx
    .expect(generatePath)
    .toEqual(join("test/packages", name, "app/components"));
});

it("supports v1 addons", async (ctx) => {
  const name = "v1-addon";
  const generatePath = await getGeneratePath(
    "component",
    Package.createPath(name),
  );

  ctx
    .expect(generatePath)
    .toEqual(join("test/packages", name, "addon/components"));
});

it("supports v2 addons", async (ctx) => {
  const name = "v2-addon";
  const generatePath = await getGeneratePath(
    "component",
    Package.createPath(name),
  );

  ctx
    .expect(generatePath)
    .toEqual(join("test/packages", name, "src/components"));
});
