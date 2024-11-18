import { findUp } from "find-up";
import { pathToFileURL } from "node:url";
import { DocumentName, type File } from "./types.js";

export type Config = {
  hooks?: {
    postGenerate?: (info: {
      documentName: DocumentName;
      entityName: string;
      files: File[];
    }) => Promise<void> | void;
  };
};

const CONFIG_FILES = [
  "gember.config.js",
  "gember.config.cjs",
  "gember.config.mjs",
];

const DEFAULT_CONFIG: Config = {};

export async function getConfig(cwd: string): Promise<Config> {
  const path = await findUp(CONFIG_FILES, { cwd });

  if (path === undefined) {
    return DEFAULT_CONFIG;
  }

  let config;

  try {
    config = (await import(pathToFileURL(path).toString())).default;
  } catch (cause) {
    throw new Error(`Could not import gember config file at "${path}".`, {
      cause,
    });
  }

  if (config === undefined) {
    throw new Error(
      `gember config file at "${path}" must have a "default" export.`,
    );
  }

  return typeof config === "function" ? await config() : config;
}
