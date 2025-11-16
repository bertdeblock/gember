import { Clipboard } from "@napi-rs/clipboard";
import { camelCase, pascalCase, pathCase } from "change-case";
import { outputFile, pathExists, remove } from "fs-extra/esm";
import Handlebars from "handlebars";
import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { cwd as processCwd, env } from "node:process";
import { FileRef } from "./file-ref.js";
import { resolveConfig, type Config } from "../config.js";
import { getOwnPath } from "../internal.js";
import { logger } from "../logger.js";
import {
  isV1Addon,
  isV2Addon,
  readPackageJson,
  type EmberPackageJson,
} from "../package-json.js";

export type Generator = {
  args: GeneratorArg[];
  description: string;
  isTestGenerator: boolean;
  name: string;
  run: (args: Args) => Promise<void>;
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

type GeneratorOptions = {
  args: GeneratorArgFactory[];
  description?: string;
  isTestGenerator?: boolean;
  modifyTargetFile?: ModifyTargetFile;
  modifyTemplateFile?: ModifyTemplateFile;
  name: string;
};

type GeneratorArgFactory = (generatorName: string) => GeneratorArg;

type GeneratorArg = {
  alias?: string[];
  description: string;
  modifyTargetFile?: ModifyTargetFile;
  modifyTemplateFile?: ModifyTemplateFile;
  name: string;
  required?: boolean;
  type: "boolean" | "positional" | "string";
};

type ModifyTargetFile = (
  targetFile: FileRef,
  args: Args,
) => Promise<void> | void;

type ModifyTemplateFile = (
  templateFile: FileRef,
  args: Args,
) => Promise<void> | void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Args = Record<string, any>;

export function defineGenerator({
  args,
  description,
  isTestGenerator,
  modifyTargetFile,
  modifyTemplateFile,
  name: generatorName,
}: GeneratorOptions): Generator {
  const generatorArgs = [
    copy(),
    cwd(),
    destroy(),
    log(),
    name(),
    path(),
    ...args,
  ]
    .map((argFactory) => argFactory(generatorName))
    .sort((a, b) => a.name.localeCompare(b.name));

  async function run(args: Args): Promise<void> {
    const packagePath = args.cwd ?? processCwd();
    const packageJson = await readPackageJson<EmberPackageJson>(packagePath);
    const config = await resolveConfig(packagePath);
    const resolvedArgs = resolveArgs(
      config,
      generatorName,
      generatorArgs,
      args,
    );

    const entityName: string = resolvedArgs.name;
    const entityPath: string | undefined = resolvedArgs.path;

    const targetFile = new FileRef({
      ext: ".ts",
      name: entityName,
      rootDir: packagePath,
      subDir: entityPath ?? env.GEMBER_PATH ?? "",
    });

    const templateFile = new FileRef({
      ext: ".ts",
      name: generatorName,
      rootDir: getOwnPath("templates"),
      subDir: generatorName,
    });

    await modifyTargetFile?.(targetFile, resolvedArgs);
    await modifyTemplateFile?.(templateFile, resolvedArgs);

    if (targetFile.subDir === "") {
      targetFile.subDir = join(getSrcDir(packageJson), generatorName + "s");
    }

    for (const arg of generatorArgs) {
      await arg.modifyTargetFile?.(targetFile, resolvedArgs);
      await arg.modifyTemplateFile?.(templateFile, resolvedArgs);
    }

    if (args.destroy) {
      if (await targetFile.exists()) {
        await remove(targetFile.path());

        logger.success(
          `Destroyed ${generatorName} \`${entityName}\` at \`${relative(packagePath, targetFile.path())}\`.`,
        );
      } else {
        logger.warn(
          `${generatorName} \`${entityName}\` at \`${relative(packagePath, targetFile.path())}\` does not exist.`,
        );
      }

      return;
    }

    const templateContent = await readFile(templateFile.path(), "utf-8");
    const template = Handlebars.compile(templateContent);

    const entityNameCases = {
      camel: camelCase(entityName),
      pascal: pascalCase(entityName),
      path: pathCase(entityName),
    };

    const templateCompiled = template({
      name: {
        ...entityNameCases,
        camelCurlyBrackets: `{{${entityNameCases.camel}}}`,
        pathMaybeQuotes: /(-|\/)/.test(entityNameCases.path)
          ? `"${entityNameCases.path}"`
          : entityNameCases.path,
        signature: entityNameCases.pascal + "Signature",
      },
      package: packageJson,
      testHelpersImportPath:
        (await pathExists(join(packagePath, "tests", "helpers.js"))) ||
        (await pathExists(join(packagePath, "tests", "helpers.ts")))
          ? `${packageJson.name}/tests/helpers`
          : "ember-qunit",
    });

    if (resolvedArgs.copy) {
      const clipboard = new Clipboard();

      clipboard.setText(templateCompiled);

      logger.success(
        `Generated and copied ${generatorName} \`${entityName}\` to the clipboard.`,
      );
    } else if (resolvedArgs.log) {
      const border = "─".repeat(
        Math.max(...templateCompiled.split("\n").map((line) => line.length)),
      );

      logger.log(border);
      logger.log(targetFile.path());
      logger.log(border);
      logger.log("");
      logger.log(templateCompiled);
      logger.log(border);
    } else {
      if (await targetFile.exists()) {
        const response = await logger.prompt(
          `${generatorName} \`${entityName}\` at \`${relative(packagePath, targetFile.path())}\` already exists. Do you want to overwrite this file?`,
          { type: "confirm" },
        );

        logger.log("");

        if (response === false) {
          return;
        }
      }

      await outputFile(targetFile.path(), templateCompiled);

      logger.success(
        `Generated ${generatorName} \`${entityName}\` at \`${relative(packagePath, targetFile.path())}\`.`,
      );

      if (config.hooks?.postGenerate) {
        logger.start("`hooks.postGenerate`: Running...");

        const targetFileParsed = targetFile.parse();

        await config.hooks.postGenerate({
          entityName,
          files: [
            {
              base: targetFileParsed.base,
              content: templateCompiled,
              dir: targetFileParsed.dir,
              ext: targetFileParsed.ext,
              name: targetFileParsed.name,
              path: targetFile.path(),
              root: targetFileParsed.root,
            },
          ],
          generatorName,
        });

        logger.success("`hooks.postGenerate`: Done!");
      }
    }
  }

  return {
    args: generatorArgs,
    description: description ?? `Generate a new ${generatorName}`,
    isTestGenerator: isTestGenerator ?? false,
    name: generatorName,
    run,
  };
}

export function defineTestGenerator(
  options: GeneratorOptions & { testsDir: string; testsSubDir?: string },
): Generator {
  return defineGenerator({
    ...options,
    isTestGenerator: true,
    modifyTargetFile: (targetFile, args) => {
      if (args.path === undefined && env.GEMBER_PATH === undefined) {
        targetFile.subDir = join(
          "tests",
          options.testsDir,
          options.testsSubDir ?? options.name + "s",
        );
      }

      targetFile.name = testGeneratorName(targetFile.name);
    },
    name: testGeneratorName(options.name),
  });
}

export function testGeneratorName(generatorName: string): string {
  return generatorName + "-test";
}

export function classBased({
  functionBasedName = "function-based",
}: { functionBasedName?: string } = {}): GeneratorArgFactory {
  return (generatorName) => ({
    alias: ["class", "class-based"],
    description: `Generate a \`class-based\` ${generatorName}, instead of a \`${functionBasedName}\` ${generatorName}`,
    modifyTemplateFile: (templateFile, args): void => {
      templateFile.name = [
        templateFile.name,
        args.classBased ? "class-based" : functionBasedName,
      ].join(".");
    },
    name: "classBased",
    type: "boolean",
  });
}

export function copy(): GeneratorArgFactory {
  return (generatorName) => ({
    description: `Copy the generated ${generatorName} to the clipboard, instead of writing it to disk`,
    name: "copy",
    type: "boolean",
  });
}

export function cwd(): GeneratorArgFactory {
  return (generatorName) => ({
    description: `The current working directory to run the ${generatorName} generator in`,
    name: "cwd",
    type: "string",
  });
}

export function destroy(): GeneratorArgFactory {
  return (generatorName) => ({
    alias: ["d"],
    description: `Destroy a ${generatorName} by name`,
    name: "destroy",
    type: "boolean",
  });
}

export function log(): GeneratorArgFactory {
  return (generatorName) => ({
    description: `Log the generated ${generatorName} to the console, instead of writing it to disk`,
    name: "log",
    type: "boolean",
  });
}

export function name(): GeneratorArgFactory {
  return (generatorName) => ({
    description: `The ${generatorName}'s name`,
    name: "name",
    type: "positional",
  });
}

export function nested({
  description,
}: {
  description: string;
}): GeneratorArgFactory {
  return () => ({
    description,
    modifyTargetFile: (targetFile, args): void => {
      if (args.nested) {
        targetFile.subDir = join(targetFile.subDir, targetFile.name);
        targetFile.name = "index";
      }
    },
    name: "nested",
    type: "boolean",
  });
}

export function path(): GeneratorArgFactory {
  return (generatorName) => ({
    description: `Generate a ${generatorName} at a custom path, e.g. \`--path=src/-private\``,
    name: "path",
    type: "string",
  });
}

export function test(): GeneratorArgFactory {
  return (generatorName) => ({
    description: `Generate a corresponding ${testGeneratorName(generatorName)}`,
    name: "test",
    type: "boolean",
  });
}

export function typescript({
  gts = false,
}: {
  gts?: boolean;
} = {}): GeneratorArgFactory {
  const jsExt = gts ? ".gjs" : ".js";
  const tsExt = gts ? ".gts" : ".ts";

  return (generatorName) => ({
    alias: [...(gts ? ["gts"] : []), "ts"],
    description: `Generate a \`${tsExt}\` ${generatorName}, instead of a \`${jsExt}\` ${generatorName}`,
    modifyTargetFile: (targetFile, args): void => {
      targetFile.ext = args.typescript ? tsExt : jsExt;
    },
    modifyTemplateFile: async (templateFile, args): Promise<void> => {
      if (args.typescript) {
        templateFile.ext = tsExt;

        if ((await templateFile.exists()) === false) {
          templateFile.ext = jsExt;
        }
      } else {
        templateFile.ext = jsExt;
      }
    },
    name: "typescript",
    type: "boolean",
  });
}

function getSrcDir(packageJson: EmberPackageJson): string {
  return isV2Addon(packageJson)
    ? "src"
    : isV1Addon(packageJson)
      ? "addon"
      : "app";
}

function resolveArgs(
  config: Config,
  generatorName: string,
  generatorArgs: Generator["args"],
  args: Args,
): Args {
  const generatorConfig =
    config.generators?.[generatorName as keyof Config["generators"]];

  const resolvedArgs: Args = {
    typescript: config.typescript,
  };

  for (const arg of generatorArgs) {
    if (args[arg.name] !== undefined) {
      resolvedArgs[arg.name] = args[arg.name];
    } else if (generatorConfig?.[arg.name] !== undefined) {
      resolvedArgs[arg.name] = generatorConfig[arg.name];
    }
  }

  return resolvedArgs;
}
