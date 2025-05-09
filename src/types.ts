// eslint-disable-next-line n/no-missing-import
import type { PackageJson } from "type-fest";

export type EmberPackageJson = PackageJson & {
  ember?: {
    edition?: string;
  };
  "ember-addon"?: {
    version?: number;
  };
};

export type GeneratorFile = {
  base: string;
  content: string;
  dir: string;
  ext: string;
  name: string;
  path: string;
  root: string;
};
