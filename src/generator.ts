import { Clipboard } from "@napi-rs/clipboard";
import { camelCase, pascalCase, pathCase } from "change-case";
import consola from "consola";
import { ensureDir, pathExists, readJson } from "fs-extra/esm";
import Handlebars from "handlebars";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";
import { resolveConfig, type Config } from "./config.js";
import { GemberError } from "./errors.js";
import { FileReference } from "./file-reference.js";
import { isV1Addon, isV2Addon } from "./helpers.js";
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
  const generatorArgs = [
    copy(),
    log(),
    templateContent(),
    templatePath(),
    ...args,
  ]
    .map((argFactory) => argFactory(generatorName))
    .sort((a, b) => a.name.localeCompare(b.name));

  async function run(args: Args): Promise<void> {
    const packagePath = cwd();
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
      subDir: entityPath ?? "",
    });

    await modifyTargetFile?.(targetFile, resolvedArgs);

    if (targetFile.subDir === "") {
      targetFile.subDir = join(getSrcDir(packageJson), generatorName + "s");
    }

    for (const arg of generatorArgs) {
      await arg.modifyTargetFile?.(targetFile, resolvedArgs);
    }

    let templateContent;

    if (args.templateContent) {
      templateContent = args.templateContent;
    } else if (args.templatePath) {
      try {
        templateContent = await readFile(
          join(packagePath, args.templatePath),
          "utf-8",
        );
      } catch (cause) {
        throw new GemberError(`Could not read file \`${args.templatePath}\`.`, {
          cause,
        });
      }
    } else {
      const templateFile = new FileReference({
        ext: ".ts",
        name: generatorName,
        rootDir: join(
          dirname(fileURLToPath(import.meta.url)),
          "..",
          "templates",
        ),
        subDir: generatorName,
      });

      await modifyTemplateFile?.(templateFile, resolvedArgs);

      for (const arg of generatorArgs) {
        await arg.modifyTemplateFile?.(templateFile, resolvedArgs);
      }

      templateContent = await readFile(templateFile.path(), "utf-8");
    }

    const template = Handlebars.compile(templateContent);

    const entityNameCases = {
      camel: camelCase(entityName),
      pascal: pascalCase(entityName),
      path: pathCase(entityName),
    };

    let templateCompiled;

    try {
      templateCompiled = template({
        name: {
          ...entityNameCases,
          pathMaybeQuoted: /(-|\/)/.test(entityNameCases.path)
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
    } catch (cause) {
      throw new GemberError("Could not compile template.", { cause });
    }

    if (resolvedArgs.copy) {
      const clipboard = new Clipboard();

      clipboard.setText(templateCompiled);

      consola.success(
        `🫚 Generated and copied ${generatorName} \`${entityName}\` to the clipboard.`,
      );
    } else if (resolvedArgs.log) {
      const border = "─".repeat(
        Math.max(...templateCompiled.split("\n").map((line) => line.length)),
      );

      consola.log(border);
      consola.log(targetFile.path());
      consola.log(border);
      consola.log("");
      consola.log(templateCompiled);
      consola.log(border);
    } else {
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

      consola.success(
        `🫚 Generated ${generatorName} \`${entityName}\` at \`${relative(packagePath, generatorFile.path)}\`.`,
      );

      const postGenerate = config.hooks?.postGenerate;

      if (postGenerate) {
        consola.success("🫚 `hooks.postGenerate`: Running...");

        await postGenerate({
          entityName,
          files: [generatorFile],
          generatorName,
        });

        consola.success("🫚 `hooks.postGenerate`: Done!");
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
      if (args.path === undefined) {
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

export function templateContent(): GeneratorArgFactory {
  return () => ({
    description: "Custom template content",
    name: "templateContent",
    type: "string",
  });
}

export function templatePath(): GeneratorArgFactory {
  return () => ({
    description: "Custom template path",
    name: "templatePath",
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
