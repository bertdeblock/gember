// eslint-disable-next-line n/no-missing-import
import type { PackageJson } from "type-fest";

export type GeneratorName = "component" | "helper" | "modifier" | "service";

export type EmberPackageJson = PackageJson & {
  ember?: {
    edition?: string;
  };
  "ember-addon"?: {
    version?: number;
  };
};

export type File = {
  content: string;
  name: string;
  path: string;
};
