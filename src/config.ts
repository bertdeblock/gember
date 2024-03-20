import { deepmerge } from "deepmerge-ts";
import { findUp } from "find-up";
import { pathToFileURL } from "node:url";

type Config = {
  generator: {
    component: { path: string };
    helper: { path: string };
    modifier: { path: string };
    service: { path: string };
  };
  ts: boolean;
};

const DEFAULT_CONFIG: Config = {
  generator: {
    component: { path: "" },
    helper: { path: "" },
    modifier: { path: "" },
    service: { path: "" },
  },
  ts: false,
};

const CONFIG_FILES = [
  "gember.config.js",
  "gember.config.cjs",
  "gember.config.mjs",
];

export async function getConfig(cwd: string): Promise<Config> {
  const path = await findUp(CONFIG_FILES, { cwd });

  if (path === undefined) {
    return DEFAULT_CONFIG;
  }

  let config;

  try {
    config = (await import(pathToFileURL(path).toString())).default;
  } catch {
    throw new Error(`Could not import gember config file at "${path}".`);
  }

  if (config === undefined) {
    throw new Error(
      `gember config file at "${path}" must have a "default" export.`,
    );
  }

  return deepmerge(
    DEFAULT_CONFIG,
    typeof config === "function" ? await config() : config,
  );
}
