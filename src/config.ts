import { findUp } from "find-up";
import { pathToFileURL } from "node:url";
import { GemberError } from "./errors.js";
import type { GeneratorFile, GeneratorName } from "./types.js";

export type Config = {
  generators?: {
    component?: {
      classBased?: boolean;
      path?: string;
      typescript?: boolean;
    };
    helper?: {
      classBased?: boolean;
      path?: string;
      typescript?: boolean;
    };
    modifier?: {
      classBased?: boolean;
      path?: string;
      typescript?: boolean;
    };
    service?: {
      path?: string;
      typescript?: boolean;
    };
  };

  hooks?: {
    postGenerate?: (info: {
      /**
       * @deprecated Please use `generatorName` instead.
       */
      documentName: GeneratorName;
      entityName: string;
      files: GeneratorFile[];
      generatorName: GeneratorName;
    }) => Promise<void> | void;
  };

  typescript?: boolean;
};

const CONFIG_FILES = [
  "gember.config.js",
  "gember.config.cjs",
  "gember.config.mjs",
];

const RESOLVED_CONFIGS: Map<string, Config> = new Map();

export async function resolveConfig(cwd: string): Promise<Config> {
  let resolvedConfig = RESOLVED_CONFIGS.get(cwd);

  if (resolvedConfig) {
    return resolvedConfig;
  }

  const path = await findUp(CONFIG_FILES, { cwd });

  if (path) {
    let config;

    try {
      config = (await import(pathToFileURL(path).toString())).default;
    } catch (cause) {
      throw new GemberError(
        `Could not import gember config file at \`${path}\`.`,
        {
          cause,
        },
      );
    }

    if (config === undefined) {
      throw new GemberError(
        `gember config file at \`${path}\` must have a \`default\` export.`,
      );
    }

    resolvedConfig = (
      typeof config === "function" ? await config() : config
    ) as Config;
  } else {
    resolvedConfig = {};
  }

  RESOLVED_CONFIGS.set(cwd, resolvedConfig);

  return resolvedConfig;
}
