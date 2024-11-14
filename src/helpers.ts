import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export function getDocumentsPath(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "../documents");
}
