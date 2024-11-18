import { join } from "node:path";
import { it } from "vitest";
import { getDocumentPath } from "../src/generate-document.ts";
import { blueprintPath } from "./helpers.ts";

it("supports v1 apps", async (ctx) => {
  const name = "v1-app";
  const cwd = blueprintPath(name);
  const documentPath = await getDocumentPath("component", cwd);

  ctx
    .expect(documentPath)
    .toEqual(join("test/blueprints", name, "app/components"));
});

it("supports v1 addons", async (ctx) => {
  const name = "v1-addon";
  const cwd = blueprintPath(name);
  const documentPath = await getDocumentPath("component", cwd);

  ctx
    .expect(documentPath)
    .toEqual(join("test/blueprints", name, "addon/components"));
});

it("supports v2 addons", async (ctx) => {
  const name = "v2-addon";
  const cwd = blueprintPath(name);
  const documentPath = await getDocumentPath("component", cwd);

  ctx
    .expect(documentPath)
    .toEqual(join("test/blueprints", name, "src/components"));
});
