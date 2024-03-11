import chalk from "chalk";
import { ensureDir } from "fs-extra";
import { writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, parse, relative } from "node:path";
import { cwd as processCwd } from "node:process";
import { fileURLToPath } from "node:url";
import { type GenerateInputs, loadScaffdog } from "scaffdog";
import { getConfig } from "./config.js";
import { type DocumentName } from "./types.js";

const DOCUMENT_NAME_DIRECTORY: Record<DocumentName, string> = {
  component: "components",
  helper: "helpers",
  modifier: "modifiers",
  service: "services",
};

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
  const scaffdog = await loadScaffdog(join(directory, "../.scaffdog"));
  const documents = await scaffdog.list();
  const document = documents.find((document) => document.name === documentName);

  if (document === undefined) {
    throw new Error(`[BUG] Document "${documentName}" not found.`);
  }

  const documentPath = path
    ? isAbsolute(path)
      ? path
      : join(cwd, path)
    : join(cwd, "src", DOCUMENT_NAME_DIRECTORY[documentName]);

  const files = await scaffdog.generate(document, documentPath, {
    inputs: { ...inputs, name: entityName },
  });

  const filesToGenerate = files.filter((file) => file.skip === false);

  for (const file of filesToGenerate) {
    await ensureDir(parse(file.path).dir);
    await writeFile(file.path, file.content);

    console.log(chalk.green(`🫚 Generated "${relative(cwd, file.path)}".`));
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
