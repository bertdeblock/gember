import { camelCase, kebabCase, pascalCase } from "change-case";
import { ensureDir } from "fs-extra";
import { writeFile } from "node:fs/promises";
import { isAbsolute, join, parse, relative } from "node:path";
import { cwd as processCwd } from "node:process";
import { type GenerateInputs, loadScaffdog } from "scaffdog";
import { getConfig } from "./config.js";
import { getDocumentsPath } from "./helpers.js";
import { success } from "./logging.js";
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
  const scaffdog = await loadScaffdog(getDocumentsPath());
  const documents = await scaffdog.list();
  const document = documents.find((document) => document.name === documentName);

  if (document === undefined) {
    throw new Error(`[BUG] Document \`${documentName}\` not found.`);
  }

  const documentPath = getDocumentPath(documentName, cwd, path);
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

    success(
      `Generated ${documentName} \`${entityName}\` at \`${relative(cwd, file.path)}\`.`,
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

function getDocumentPath(
  documentName: DocumentName,
  cwd: string,
  path: string,
): string {
  if (path) {
    if (isAbsolute(path)) {
      return path;
    } else {
      return join(cwd, path);
    }
  }

  return join(cwd, "src", DOCUMENT_DIRECTORY[documentName]);
}
