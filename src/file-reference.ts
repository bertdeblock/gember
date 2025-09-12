import { pathExists } from "fs-extra/esm";
import { join, parse, type ParsedPath } from "node:path";

export class FileReference {
  ext: string;
  name: string;
  rootDir: string;
  subDir: string;

  constructor({
    ext,
    name,
    rootDir,
    subDir,
  }: {
    ext: string;
    name: string;
    rootDir: string;
    subDir: string;
  }) {
    this.ext = ext;
    this.name = name;
    this.rootDir = rootDir;
    this.subDir = subDir;
  }

  exists(): Promise<boolean> {
    return pathExists(this.path());
  }

  parse(): ParsedPath {
    return parse(this.path());
  }

  path(): string {
    return join(this.rootDir, this.subDir, this.name + this.ext);
  }
}
