import { Project } from "fixturify-project";
import { it } from "vitest";
import { getConfig } from "../src/config.js";

it("supports a `gember.config.js` file", async (ctx) => {
  const project = new Project({
    files: {
      "gember.config.js": "export default () => ({ ts: true });",
      "package.json": '{ "type": "module" }',
    },
  });

  await project.write();

  const config = await getConfig(project.baseDir);

  ctx.expect(config).to.contain({ ts: true });
});

it("supports a `gember.config.cjs` file", async (ctx) => {
  const project = new Project({
    files: {
      "gember.config.cjs": "module.exports = { ts: true };",
      "package.json": '{ "type": "module" }',
    },
  });

  await project.write();

  const config = await getConfig(project.baseDir);

  ctx.expect(config).to.contain({ ts: true });
});

it("supports a `gember.config.mjs` file", async (ctx) => {
  const project = new Project({
    files: {
      "gember.config.mjs": "export default async () => ({ ts: true });",
      "package.json": '{ "type": "module" }',
    },
  });

  await project.write();

  const config = await getConfig(project.baseDir);

  ctx.expect(config).to.contain({ ts: true });
});
