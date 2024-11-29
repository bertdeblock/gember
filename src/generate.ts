import { camelCase, pascalCase } from "change-case";
import { consola } from "consola";
import { ensureDir, readJson } from "fs-extra/esm";
import Handlebars from "handlebars";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, parse, relative } from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";
import { resolveConfig } from "./config.js";
import { isV1Addon, isV2Addon } from "./helpers.js";
import type {
  EmberPackageJson,
  GeneratorFile,
  GeneratorName,
} from "./types.js";

export async function generate({
  customTargetPath,
  entityName,
  generatorName,
  packagePath,
  targetDir,
  templateFilename,
}: {
  customTargetPath?: string;
  entityName: string;
  generatorName: GeneratorName;
  packagePath: string;
  targetDir: string;
  templateFilename: string;
}): Promise<void> {
  const templatePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "../templates",
    generatorName,
    templateFilename,
  );

  const templateContent = await readFile(templatePath, "utf-8");
  const template = Handlebars.compile(templateContent);

  const packageJson = await readJson(join(packagePath, "package.json"));
  const filePath = await generateFilePath(
    packageJson,
    packagePath,
    targetDir,
    entityName + parse(templateFilename).ext,
    customTargetPath,
  );

  const fileParsed = parse(filePath);
  const file: GeneratorFile = {
    base: fileParsed.base,
    content: template({
      name: {
        camel: camelCase(entityName),
        pascal: pascalCase(entityName),
        path: entityName,
        signature: pascalCase(entityName) + "Signature",
      },
      package: packageJson,
    }),
    dir: fileParsed.dir,
    ext: fileParsed.ext,
    name: fileParsed.name,
    path: filePath,
    root: fileParsed.root,
  };

  await ensureDir(file.dir);
  await writeFile(file.path, file.content);

  consola.success(
    `🫚 Generated ${generatorName} \`${entityName}\` at \`${relative(cwd(), file.path)}\`.`,
  );

  const config = await resolveConfig(packagePath);
  const postGenerate = config.hooks?.postGenerate;

  if (postGenerate) {
    consola.success("🫚 `hooks.postGenerate`: Running...");

    await postGenerate({
      entityName,
      files: [file],
      generatorName,
    });

    consola.success("🫚 `hooks.postGenerate`: Done!");
  }
}

const SRC_DIR: Record<string, string> = {
  APP: "app",
  V1_ADDON: "addon",
  V2_ADDON: "src",
};

export async function generateFilePath(
  packageJson: EmberPackageJson,
  packagePath: string,
  targetDir: string,
  fileBase: string,
  customTargetPath?: string,
): Promise<string> {
  if (customTargetPath) {
    if (isAbsolute(customTargetPath)) {
      return join(customTargetPath, fileBase);
    } else {
      return join(packagePath, customTargetPath, fileBase);
    }
  }

  const srcDir = isV2Addon(packageJson)
    ? SRC_DIR.V2_ADDON
    : isV1Addon(packageJson)
      ? SRC_DIR.V1_ADDON
      : SRC_DIR.APP;

  return join(packagePath, srcDir, targetDir, fileBase);
}
