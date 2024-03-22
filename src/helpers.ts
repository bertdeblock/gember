import { type EmberPackageJson } from "./types.js";

export function isAddon(packageJson: EmberPackageJson): boolean {
  if (Array.isArray(packageJson.keywords)) {
    return packageJson.keywords.includes("ember-addon");
  }

  return false;
}

export function isV2Addon(packageJson: EmberPackageJson): boolean {
  return packageJson["ember-addon"]?.version === 2;
}
