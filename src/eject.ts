import { copy } from "fs-extra";
import { isAbsolute, join, parse, relative } from "node:path";
import { cwd as processCwd } from "node:process";
import { getDocumentsPath } from "./helpers.js";
import { success } from "./logging.js";

export async function eject({
  cwd = processCwd(),
  path = "",
}: { cwd?: string; path?: string } = {}) {
  const destination = getDestinationPath(cwd, path);

  await copy(getDocumentsPath(), destination, {
    filter: (src) => parse(src).base !== "config.ts",
  });

  success(`Ejected all documents at \`${relative(cwd, destination)}\`.`);
}

function getDestinationPath(cwd: string, path: string): string {
  if (path) {
    if (isAbsolute(path)) {
      return path;
    } else {
      return join(cwd, path);
    }
  }

  return join(cwd, ".gember");
}
