import { pathExists, readJson } from "fs-extra/esm";
import { join } from "node:path";
import type { PackageJson } from "type-fest";

export function isV1Addon(packageJson: EmberPackageJson): boolean {
  if (isAddon(packageJson)) {
    const { version } = packageJson["ember-addon"] ?? {};

    return version === 1 || version === undefined;
  }

  return false;
}

export function isV2Addon(packageJson: EmberPackageJson): boolean {
  if (isAddon(packageJson)) {
    const { version } = packageJson["ember-addon"] ?? {};

    return version === 2;
  }

  return false;
}

export async function readPackageJson<ReturnType = PackageJson>(
  packagePath: string,
): Promise<ReturnType> {
  const packageJsonPath = join(packagePath, "package.json");

  if (await pathExists(packageJsonPath)) {
    return readJson(packageJsonPath);
  } else {
    return {
      name: "not-a-package",
    } as ReturnType;
  }
}

export type EmberPackageJson = PackageJson & {
  "ember-addon"?: {
    version?: 1 | 2;
  };
};

export type { PackageJson };

function isAddon(packageJson: EmberPackageJson): boolean {
  if (Array.isArray(packageJson.keywords)) {
    return packageJson.keywords.includes("ember-addon");
  }

  return false;
}
