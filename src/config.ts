import { findUp } from "find-up";
import { pathToFileURL } from "node:url";
import { GemberError } from "./errors.js";
import type { GeneratorFile } from "./generators/generator.js";
import { logger } from "./logger.js";

export type Config = {
  generators?: {
    "acceptance-test"?: {
      // Copy the generated acceptance-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the acceptance-test generator in:
      cwd?: string;
      // Destroy a acceptance-test by name:
      destroy?: boolean;
      // Log the generated acceptance-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a acceptance-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom acceptance-test template content:
      templateContent?: string;
      // Custom acceptance-test template path:
      templatePath?: string;
      // Generate a `.ts` acceptance-test, instead of a `.js` acceptance-test:
      typescript?: boolean;
    };
    component?: {
      // Generate a `class-based` component, instead of a `template-only` component:
      classBased?: boolean;
      // Copy the generated component to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the component generator in:
      cwd?: string;
      // Destroy a component by name:
      destroy?: boolean;
      // Log the generated component to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a nested colocated component, e.g. `foo/bar/index.gts`:
      nested?: boolean;
      // Generate a component at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom component template content:
      templateContent?: string;
      // Custom component template path:
      templatePath?: string;
      // Generate a corresponding component-test:
      test?: boolean;
      // Generate a `.gts` component, instead of a `.gjs` component:
      typescript?: boolean;
    };
    "component-test"?: {
      // Copy the generated component-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the component-test generator in:
      cwd?: string;
      // Destroy a component-test by name:
      destroy?: boolean;
      // Log the generated component-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a component-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom component-test template content:
      templateContent?: string;
      // Custom component-test template path:
      templatePath?: string;
      // Generate a `.gts` component-test, instead of a `.gjs` component-test:
      typescript?: boolean;
    };
    controller?: {
      // Copy the generated controller to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the controller generator in:
      cwd?: string;
      // Destroy a controller by name:
      destroy?: boolean;
      // Log the generated controller to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a controller at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom controller template content:
      templateContent?: string;
      // Custom controller template path:
      templatePath?: string;
      // Generate a corresponding controller-test:
      test?: boolean;
      // Generate a `.ts` controller, instead of a `.js` controller:
      typescript?: boolean;
    };
    "controller-test"?: {
      // Copy the generated controller-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the controller-test generator in:
      cwd?: string;
      // Destroy a controller-test by name:
      destroy?: boolean;
      // Log the generated controller-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a controller-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom controller-test template content:
      templateContent?: string;
      // Custom controller-test template path:
      templatePath?: string;
      // Generate a `.ts` controller-test, instead of a `.js` controller-test:
      typescript?: boolean;
    };
    helper?: {
      // Generate a `class-based` helper, instead of a `function-based` helper:
      classBased?: boolean;
      // Copy the generated helper to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the helper generator in:
      cwd?: string;
      // Destroy a helper by name:
      destroy?: boolean;
      // Log the generated helper to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a helper at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom helper template content:
      templateContent?: string;
      // Custom helper template path:
      templatePath?: string;
      // Generate a corresponding helper-test:
      test?: boolean;
      // Generate a `.ts` helper, instead of a `.js` helper:
      typescript?: boolean;
    };
    "helper-test"?: {
      // Copy the generated helper-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the helper-test generator in:
      cwd?: string;
      // Destroy a helper-test by name:
      destroy?: boolean;
      // Log the generated helper-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a helper-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom helper-test template content:
      templateContent?: string;
      // Custom helper-test template path:
      templatePath?: string;
      // Generate a `.gts` helper-test, instead of a `.gjs` helper-test:
      typescript?: boolean;
    };
    modifier?: {
      // Generate a `class-based` modifier, instead of a `function-based` modifier:
      classBased?: boolean;
      // Copy the generated modifier to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the modifier generator in:
      cwd?: string;
      // Destroy a modifier by name:
      destroy?: boolean;
      // Log the generated modifier to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a modifier at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom modifier template content:
      templateContent?: string;
      // Custom modifier template path:
      templatePath?: string;
      // Generate a corresponding modifier-test:
      test?: boolean;
      // Generate a `.ts` modifier, instead of a `.js` modifier:
      typescript?: boolean;
    };
    "modifier-test"?: {
      // Copy the generated modifier-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the modifier-test generator in:
      cwd?: string;
      // Destroy a modifier-test by name:
      destroy?: boolean;
      // Log the generated modifier-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a modifier-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom modifier-test template content:
      templateContent?: string;
      // Custom modifier-test template path:
      templatePath?: string;
      // Generate a `.gts` modifier-test, instead of a `.gjs` modifier-test:
      typescript?: boolean;
    };
    route?: {
      // Copy the generated route to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the route generator in:
      cwd?: string;
      // Destroy a route by name:
      destroy?: boolean;
      // Log the generated route to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a route at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom route template content:
      templateContent?: string;
      // Custom route template path:
      templatePath?: string;
      // Generate a corresponding route-test:
      test?: boolean;
      // Generate a `.ts` route, instead of a `.js` route:
      typescript?: boolean;
    };
    "route-test"?: {
      // Copy the generated route-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the route-test generator in:
      cwd?: string;
      // Destroy a route-test by name:
      destroy?: boolean;
      // Log the generated route-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a route-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom route-test template content:
      templateContent?: string;
      // Custom route-test template path:
      templatePath?: string;
      // Generate a `.ts` route-test, instead of a `.js` route-test:
      typescript?: boolean;
    };
    service?: {
      // Copy the generated service to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the service generator in:
      cwd?: string;
      // Destroy a service by name:
      destroy?: boolean;
      // Log the generated service to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a service at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom service template content:
      templateContent?: string;
      // Custom service template path:
      templatePath?: string;
      // Generate a corresponding service-test:
      test?: boolean;
      // Generate a `.ts` service, instead of a `.js` service:
      typescript?: boolean;
    };
    "service-test"?: {
      // Copy the generated service-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the service-test generator in:
      cwd?: string;
      // Destroy a service-test by name:
      destroy?: boolean;
      // Log the generated service-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a service-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom service-test template content:
      templateContent?: string;
      // Custom service-test template path:
      templatePath?: string;
      // Generate a `.ts` service-test, instead of a `.js` service-test:
      typescript?: boolean;
    };
    util?: {
      // Copy the generated util to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the util generator in:
      cwd?: string;
      // Destroy a util by name:
      destroy?: boolean;
      // Log the generated util to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a util at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom util template content:
      templateContent?: string;
      // Custom util template path:
      templatePath?: string;
      // Generate a corresponding util-test:
      test?: boolean;
      // Generate a `.ts` util, instead of a `.js` util:
      typescript?: boolean;
    };
    "util-test"?: {
      // Copy the generated util-test to the clipboard, instead of writing it to disk:
      copy?: boolean;
      // The current working directory to run the util-test generator in:
      cwd?: string;
      // Destroy a util-test by name:
      destroy?: boolean;
      // Log the generated util-test to the console, instead of writing it to disk:
      log?: boolean;
      // Generate a util-test at a custom path, e.g. `--path=src/-private`:
      path?: string;
      // Custom util-test template content:
      templateContent?: string;
      // Custom util-test template path:
      templatePath?: string;
      // Generate a `.ts` util-test, instead of a `.js` util-test:
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

  logger.debug(`Resolved config at \`${cwd}\`:`);
  logger.debug(resolvedConfig);

  RESOLVED_CONFIGS.set(cwd, resolvedConfig);

  return resolvedConfig;
}

type ConfigFactory = Config | (() => Config) | (() => Promise<Config>);

export function defineConfig(config: ConfigFactory): ConfigFactory {
  return config;
}
