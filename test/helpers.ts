import { execa } from "execa";
import { remove } from "fs-extra";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import recursiveCopy from "recursive-copy";
import { v4 as uuidv4 } from "uuid";

type PackageName =
  | "v1-app"
  | "v2-app"
  | "v1-addon"
  | "v2-addon"
  | "v2-addon-config";

export class Package {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  cleanUp(): Promise<void> {
    return remove(this.path);
  }

  readFile(path: string): Promise<string> {
    return readFile(join(this.path, path), "utf-8");
  }

  static async create(
    name: PackageName,
    path: string = uuidv4(),
  ): Promise<Package> {
    const pkg = new this(join("test/output", path));

    await pkg.cleanUp();
    await recursiveCopy(this.createPath(name), pkg.path);

    return pkg;
  }

  static createPath(name: PackageName): string {
    return join("test/packages", name);
  }
}

export async function gember(
  args: string[],
  { cwd }: { cwd: string },
): Promise<void> {
  await execa(
    join(dirname(fileURLToPath(import.meta.url)), "../bin/gember.js"),
    args,
    { cwd },
  );
}
