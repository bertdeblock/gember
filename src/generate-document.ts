import chalk from "chalk";
import { execa } from "execa";
import { ensureDir } from "fs-extra";
import { writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import { type GenerateInputs, loadScaffdog } from "scaffdog";
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
  cwd: string,
  { inputs = {}, path = "" }: { inputs?: GenerateInputs; path?: string } = {},
) {
  const directory = dirname(fileURLToPath(import.meta.url));
  const scaffdog = await loadScaffdog(join(directory, "..", ".scaffdog"));
  const documents = await scaffdog.list();
  const document = documents.find((document) => document.name === documentName);

  if (document) {
    const documentPath = path
      ? isAbsolute(path)
        ? path
        : join(cwd, path)
      : join(cwd, "src", DOCUMENT_NAME_DIRECTORY[documentName]);

    const files = await scaffdog.generate(document, documentPath, {
      inputs: { ...inputs, name: entityName },
    });

    for (const file of files) {
      if (file.skip) {
        continue;
      }

      await ensureDir(parse(file.path).dir);
      await writeFile(file.path, file.content);

      try {
        await execa("npx", ["prettier", "--write", file.path]);
      } catch {
        // 🤫
      }

      console.log(chalk.green(`Generated "${file.path}"`));
    }
  } else {
    throw new Error(`Document "${documentName}" not found.`);
  }
}
