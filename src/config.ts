import { findUp } from "find-up";
import { pathToFileURL } from "node:url";
import { GemberError } from "./errors.js";
import type { GeneratorFile } from "./types.js";

export type Config = {
  generators?: {
    component?: {
      // Generate a `class-based` component, instead of a `template-only` component:
      classBased?: boolean;
      // Copy the generated component to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated component to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a nested colocated component, e.g. `foo/bar/index.gts`:
      nested?: boolean;
      // Generate a component at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.gts` component, instead of a `.gjs` component:
      typescript?: boolean;
    };
    "component-test"?: {
      // Copy the generated component-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated component-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a component-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.gts` component-test, instead of a `.gjs` component-test:
      typescript?: boolean;
    };
    helper?: {
      // Generate a `class-based` helper, instead of a `function-based` helper:
      classBased?: boolean;
      // Copy the generated helper to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated helper to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a helper at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` helper, instead of a `.js` helper:
      typescript?: boolean;
    };
    "helper-test"?: {
      // Copy the generated helper-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated helper-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a helper-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.gts` helper-test, instead of a `.gjs` helper-test:
      typescript?: boolean;
    };
    modifier?: {
      // Generate a `class-based` modifier, instead of a `function-based` modifier:
      classBased?: boolean;
      // Copy the generated modifier to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated modifier to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a modifier at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` modifier, instead of a `.js` modifier:
      typescript?: boolean;
    };
    "modifier-test"?: {
      // Copy the generated modifier-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated modifier-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a modifier-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.gts` modifier-test, instead of a `.gjs` modifier-test:
      typescript?: boolean;
    };
    service?: {
      // Copy the generated service to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated service to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a service at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` service, instead of a `.js` service:
      typescript?: boolean;
    };
    "service-test"?: {
      // Copy the generated service-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated service-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a service-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` service-test, instead of a `.js` service-test:
      typescript?: boolean;
    };
    "acceptance-test"?: {
      // Copy the generated acceptance-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // Log the generated acceptance-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a acceptance-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Generate a `.ts` acceptance-test, instead of a `.js` acceptance-test:
      typescript?: boolean;
    };
  };

  hooks?: {
    // A hook that will be executed post running a generator:
    postGenerate?: (info: {
      entityName: string;
      files: GeneratorFile[];
      generatorName: string;
    }) => Promise<void> | void;
  };

  // Use TypeScript by default for all generators:
  typescript?: boolean;
};

export type ConfigFactory = Config | (() => Config) | (() => Promise<Config>);

const CONFIG_FILES: string[] = [
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
