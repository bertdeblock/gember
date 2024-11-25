import chalk from "chalk";
import { camelCase, kebabCase, pascalCase } from "change-case";
import { ensureDir, readJson } from "fs-extra/esm";
import { writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, parse, relative } from "node:path";
import { cwd as processCwd } from "node:process";
import { fileURLToPath } from "node:url";
import { type GenerateInputs, loadScaffdog } from "scaffdog";
import { getConfig } from "./config.js";
import { isAddon, isV2Addon } from "./helpers.js";
import { type DocumentName } from "./types.js";

export async function generateDocument(
  documentName: DocumentName,
  entityName: string,
  {
    cwd = processCwd(),
    inputs = {},
    path = "",
  }: {
    cwd?: string;
    inputs?: GenerateInputs;
    path?: string;
  } = {},
) {
  const directory = dirname(fileURLToPath(import.meta.url));
  const scaffdog = await loadScaffdog(join(directory, "../documents"));
  const documents = await scaffdog.list();
  const document = documents.find((document) => document.name === documentName);

  if (document === undefined) {
    throw new Error(`[BUG] Document \`${documentName}\` not found.`);
  }

  const documentPath = await getDocumentPath(documentName, cwd, path);
  const files = await scaffdog.generate(document, documentPath, {
    inputs: {
      ...inputs,
      name: {
        camel: camelCase(entityName),
        kebab: kebabCase(entityName),
        pascal: pascalCase(entityName),
        path: entityName
          .split("/")
          .map((part) => kebabCase(part))
          .join("/"),
        raw: entityName,
      },
      signature: pascalCase(entityName) + "Signature",
    },
  });

  const filesToGenerate = files.filter((file) => file.skip === false);

  for (const file of filesToGenerate) {
    await ensureDir(parse(file.path).dir);
    await writeFile(file.path, file.content);

    console.log(
      chalk.green(
        `🫚 Generated ${documentName} \`${entityName}\` at \`${relative(cwd, file.path)}\`.`,
      ),
    );
  }

  const config = await getConfig(cwd);

  await config.hooks?.postGenerate?.({
    documentName,
    entityName,
    files: filesToGenerate.map((file) => ({
      content: file.content,
      name: file.name,
      path: file.path,
    })),
  });
}

const DOCUMENT_DIRECTORY: Record<DocumentName, string> = {
  component: "components",
  helper: "helpers",
  modifier: "modifiers",
  service: "services",
};

const SRC_DIRECTORY: Record<string, string> = {
  APP: "app",
  V1_ADDON: "addon",
  V2_ADDON: "src",
};

export async function getDocumentPath(
  documentName: DocumentName,
  cwd: string,
  path?: string,
): Promise<string> {
  if (path) {
    if (isAbsolute(path)) {
      return path;
    } else {
      return join(cwd, path);
    }
  }

  const packageJson = await readJson(join(cwd, "package.json"));
  const srcDirectory = isAddon(packageJson)
    ? isV2Addon(packageJson)
      ? SRC_DIRECTORY.V2_ADDON
      : SRC_DIRECTORY.V1_ADDON
    : SRC_DIRECTORY.APP;

  return join(cwd, srcDirectory, DOCUMENT_DIRECTORY[documentName]);
}
