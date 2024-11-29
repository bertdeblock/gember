import type { EmberPackageJson } from "./types.js";

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

function isAddon(packageJson: EmberPackageJson): boolean {
  if (Array.isArray(packageJson.keywords)) {
    return packageJson.keywords.includes("ember-addon");
  }

  return false;
}
