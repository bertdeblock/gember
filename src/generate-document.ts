import chalk from "chalk";
import { ensureDir } from "fs-extra";
import { writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, parse, relative } from "node:path";
import { cwd as processCwd } from "node:process";
import { fileURLToPath } from "node:url";
import { type GenerateInputs, loadScaffdog } from "scaffdog";
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

  const documentPath = getDocumentPath(documentName, cwd, path);
  const files = await scaffdog.generate(document, documentPath, {
    inputs: { ...inputs, name: entityName },
  });

  for (const file of files) {
    if (file.skip) {
      continue;
    }

    await ensureDir(parse(file.path).dir);
    await writeFile(file.path, file.content);

    console.log(
      chalk.green(
        `🫚 Generated ${documentName} \`${entityName}\` at \`${relative(cwd, file.path)}\`.`,
      ),
    );
  }
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
