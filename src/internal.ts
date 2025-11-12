import { readJsonSync } from "fs-extra/esm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { PackageJson } from "./package-json.js";

export function getOwnPath(...paths: string[]): string {
  return join(dirname(fileURLToPath(import.meta.url)), "..", ...paths);
}

export function readOwnPackageJsonSync(): PackageJson {
  return readJsonSync(getOwnPath("package.json"));
}
