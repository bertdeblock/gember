import { camelCase, kebabCase, pascalCase } from "change-case";
import { consola } from "consola";
import { ensureDir, readJson } from "fs-extra/esm";
import { writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, parse, relative } from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";
import { type GenerateInputs, loadScaffdog } from "scaffdog";
import { resolveConfig } from "./config.js";
import { GemberError } from "./errors.js";
import { isV1Addon, isV2Addon, pathCase } from "./helpers.js";
import type { GeneratorName } from "./types.js";

export async function generate(
  generatorName: GeneratorName,
  entityName: string,
  packagePath: string,
  {
    inputs,
    nested = false,
    path,
  }: {
    inputs?: GenerateInputs;
    nested?: boolean;
    path?: string;
  },
): Promise<void> {
  const scaffdog = await loadScaffdog(
    join(dirname(fileURLToPath(import.meta.url)), "../templates"),
  );

  const templates = await scaffdog.list();
  const template = templates.find((t) => t.name === generatorName);

  if (template === undefined) {
    throw new GemberError(`[BUG] Template \`${generatorName}\` not found.`);
  }

  const generatePath = await resolveGeneratePath(
    generatorName,
    packagePath,
    path,
  );

  const files = await scaffdog.generate(template, generatePath, {
    inputs: {
      ...inputs,
      name: {
        camel: camelCase(entityName),
        kebab: kebabCase(entityName),
        pascal: pascalCase(entityName),
        path: pathCase(entityName) + (nested ? "/index" : ""),
        raw: entityName,
        registryPath: pathCase(entityName),
      },
      signature: pascalCase(entityName) + "Signature",
    },
  });

  const filesToGenerate = files.filter((file) => file.skip === false);

  for (const file of filesToGenerate) {
    await ensureDir(parse(file.path).dir);
    await writeFile(file.path, file.content);

    consola.success(
      `🫚 Generated ${generatorName} \`${entityName}\` at \`${relative(cwd(), file.path)}\`.`,
    );
  }

  const config = await resolveConfig(packagePath);

  await config.hooks?.postGenerate?.({
    get documentName() {
      consola.warn(
        "🫚 `documentName` is deprecated. Please use `generatorName` instead.",
      );

      return generatorName;
    },

    entityName,
    files: filesToGenerate.map((file) => ({
      content: file.content,
      name: file.name,
      path: file.path,
    })),
    generatorName,
  });
}

const TARGET_DIR: Record<GeneratorName, string> = {
  component: "components",
  helper: "helpers",
  modifier: "modifiers",
  service: "services",
};

const SRC_DIR: Record<string, string> = {
  APP: "app",
  V1_ADDON: "addon",
  V2_ADDON: "src",
};

export async function resolveGeneratePath(
  generatorName: GeneratorName,
  packagePath: string,
  path?: string,
): Promise<string> {
  if (path) {
    if (isAbsolute(path)) {
      return path;
    } else {
      return join(packagePath, path);
    }
  }

  const packageJson = await readJson(join(packagePath, "package.json"));
  const srcDir = isV2Addon(packageJson)
    ? SRC_DIR.V2_ADDON
    : isV1Addon(packageJson)
      ? SRC_DIR.V1_ADDON
      : SRC_DIR.APP;

  return join(packagePath, srcDir, TARGET_DIR[generatorName]);
}
