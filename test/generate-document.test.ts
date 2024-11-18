import { it } from "vitest";
import { getDocumentPath } from "../src/generate-document.ts";
import { blueprintPath } from "./helpers.ts";

it("supports v1 apps", async (ctx) => {
  const cwd = blueprintPath("v1-app");
  const documentPath = await getDocumentPath("component", cwd);

  ctx.expect(documentPath).toEqual("test/blueprints/v1-app/app/components");
});

it("supports v1 addons", async (ctx) => {
  const cwd = blueprintPath("v1-addon");
  const documentPath = await getDocumentPath("component", cwd);

  ctx.expect(documentPath).toEqual("test/blueprints/v1-addon/addon/components");
});

it("supports v2 addons", async (ctx) => {
  const cwd = blueprintPath("v2-addon");
  const documentPath = await getDocumentPath("component", cwd);

  ctx.expect(documentPath).toEqual("test/blueprints/v2-addon/src/components");
});
