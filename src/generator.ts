import { Clipboard } from "@napi-rs/clipboard";
import { camelCase, pascalCase, pathCase } from "change-case";
import { ensureDir, pathExists, readJson } from "fs-extra/esm";
import Handlebars from "handlebars";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { cwd as processCwd, env } from "node:process";
import { fileURLToPath } from "node:url";
import { resolveConfig, type Config } from "./config.js";
import { FileReference } from "./file-reference.js";
import { isV1Addon, isV2Addon } from "./helpers.js";
import { logger } from "./logger.js";
import type { EmberPackageJson, GeneratorFile } from "./types.js";

export type Generator = {
  args: GeneratorArg[];
  description: string;
  name: string;
  run: (args: Args) => Promise<void>;
};

type GeneratorOptions = {
  args: GeneratorArgFactory[];
  description?: string;
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
  targetFile: FileReference,
  args: Args,
) => Promise<void> | void;

type ModifyTemplateFile = (
  templateFile: FileReference,
  args: Args,
) => Promise<void> | void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Args = Record<string, any>;

export function defineGenerator({
  args,
  description,
  modifyTargetFile,
  modifyTemplateFile,
  name,
}: GeneratorOptions): Generator {
  const generatorName = name;
  const generatorArgs = [copy(), cwd(), log(), ...args]
    .map((argFactory) => argFactory(generatorName))
    .sort((a, b) => a.name.localeCompare(b.name));

  async function run(args: Args): Promise<void> {
    const packagePath = args.cwd ?? processCwd();
    const packageJson: EmberPackageJson = await readJson(
      join(packagePath, "package.json"),
    );

    const config = await resolveConfig(packagePath);
    const resolvedArgs = resolveArgs(
      config,
      generatorName,
      generatorArgs,
      args,
    );

    const entityName: string = resolvedArgs.name;
    const entityPath: string | undefined = resolvedArgs.path;

    const targetFile = new FileReference({
      ext: ".ts",
      name: entityName,
      rootDir: packagePath,
      subDir: entityPath ?? env.GEMBER_PATH ?? "",
    });

    const templateFile = new FileReference({
      ext: ".ts",
      name: generatorName,
      rootDir: join(dirname(fileURLToPath(import.meta.url)), "..", "templates"),
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
        `🫚 Generated and copied ${generatorName} \`${entityName}\` to the clipboard.`,
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
          `\`${relative(packagePath, targetFile.path())}\` already exists. Do you want to overwrite this file?`,
          { type: "confirm" },
        );

        logger.log("");

        if (response === false) {
          return;
        }
      }

      const targetFileParsed = targetFile.parse();
      const generatorFile: GeneratorFile = {
        base: targetFileParsed.base,
        content: templateCompiled,
        dir: targetFileParsed.dir,
        ext: targetFileParsed.ext,
        name: targetFileParsed.name,
        path: targetFile.path(),
        root: targetFileParsed.root,
      };

      await ensureDir(generatorFile.dir);
      await writeFile(generatorFile.path, generatorFile.content);

      logger.success(
        `🫚 Generated ${generatorName} \`${entityName}\` at \`${relative(packagePath, generatorFile.path)}\`.`,
      );

      const postGenerate = config.hooks?.postGenerate;

      if (postGenerate) {
        logger.success("🫚 `hooks.postGenerate`: Running...");

        await postGenerate({
          entityName,
          files: [generatorFile],
          generatorName,
        });

        logger.success("🫚 `hooks.postGenerate`: Done!");
      }
    }
  }

  return {
    args: generatorArgs,
    description: description ?? `Generate a new ${generatorName}`,
    name: generatorName,
    run,
  };
}

export function defineTestGenerator(
  options: GeneratorOptions & { testsDir: string; testsSubDir?: string },
): Generator {
  return defineGenerator({
    ...options,
    modifyTargetFile: (targetFile, args) => {
      if (args.path === undefined && env.GEMBER_PATH === undefined) {
        targetFile.subDir = join(
          "tests",
          options.testsDir,
          options.testsSubDir ?? options.name + "s",
        );
      }

      targetFile.name += "-test";
    },
    name: `${options.name}-test`,
  });
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
    required: true,
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
