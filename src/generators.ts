import {
  defineCommand,
  type ArgDef,
  type ArgsDef,
  type CommandDef,
  type ParsedArgs,
} from "citty";
import { cwd } from "node:process";
import { logGemberErrors } from "./errors.js";
import { generate } from "./generate.js";
import { resolveConfig, type Config } from "./config.js";

export const generators = [
  defineGenerator({
    args: [
      classBased({ functionBasedName: "template-only" }),
      name(),
      nested({
        description:
          "Generate a nested colocated component, e.g. `foo/bar/index.gjs`",
      }),
      path(),
      typescript({ jsExt: "gjs", tsExt: "gts" }),
    ],
    name: "component",
  }),

  defineGenerator({
    args: [classBased(), name(), path(), typescript()],
    name: "helper",
  }),

  defineGenerator({
    args: [classBased(), name(), path(), typescript()],
    name: "modifier",
  }),

  defineGenerator({
    args: [name(), path(), typescript()],
    name: "service",
  }),
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResolvedArgs = Record<string, any>;
type GeneratorArgs = (GeneratorArg<boolean> | GeneratorArg<string>)[];
type GeneratorArg<T> = {
  argDefFactory: (generatorName: string) => ArgDef;
  name: string;
  templateFilenameToken?: (value: T) => string;
};

function defineGenerator({
  args,
  description,
  name,
  targetDir,
}: {
  args: GeneratorArgs;
  description?: string;
  name: string;
  targetDir?: string;
}): {
  args: GeneratorArgs;
  commandDef: CommandDef;
  description: string;
  name: string;
  targetDir: string;
} {
  if (description === undefined) {
    description = `Generate a new ${name}`;
  }

  if (targetDir === undefined) {
    targetDir = name + "s";
  }

  const commandDef = defineCommand({
    args: args.reduce((args: ArgsDef, arg) => {
      args[arg.name] = arg.argDefFactory(name);

      return args;
    }, {}),
    meta: { description },
    run: (ctx) =>
      logGemberErrors(async () => {
        const resolvedArgs = await resolveArgs(name, args, ctx.args);
        const templateFilename = [name];

        for (const arg of args) {
          if (arg.templateFilenameToken) {
            templateFilename.push(
              // @ts-expect-error: FIXME:
              arg.templateFilenameToken(resolvedArgs[arg.name]),
            );
          }
        }

        return generate({
          customTargetPath: resolvedArgs.path,
          entityName: resolvedArgs.name,
          generatorName: name,
          nested: resolvedArgs.nested,
          packagePath: cwd(),
          targetDir,
          templateFilename: templateFilename.join("."),
        });
      }),
  });

  return {
    args,
    commandDef,
    description,
    name,
    targetDir,
  };
}

function classBased({
  functionBasedName = "function-based",
}: { functionBasedName?: string } = {}): GeneratorArg<boolean> {
  return {
    argDefFactory: (generatorName) => ({
      alias: ["class", "class-based"],
      description: `Generate a class-based ${generatorName}`,
      type: "boolean",
    }),
    name: "classBased",
    templateFilenameToken: (classBased) =>
      classBased ? "class-based" : functionBasedName,
  };
}

function name(): GeneratorArg<string> {
  return {
    argDefFactory: (generatorName) => ({
      description: `The ${generatorName}'s name`,
      required: true,
      type: "positional",
    }),
    name: "name",
  };
}

function nested({
  description,
}: {
  description: string;
}): GeneratorArg<boolean> {
  return {
    argDefFactory: () => ({
      description,
      type: "boolean",
    }),
    name: "nested",
  };
}

function path(): GeneratorArg<string> {
  return {
    argDefFactory: (generatorName) => ({
      description: `Generate a ${generatorName} at a custom path`,
      type: "string",
    }),
    name: "path",
  };
}

function typescript({
  jsExt = "js",
  tsExt = "ts",
}: {
  jsExt?: string;
  tsExt?: string;
} = {}): GeneratorArg<boolean> {
  return {
    argDefFactory: (generatorName) => ({
      alias: "ts",
      description: `Generate a \`.${tsExt}\` ${generatorName}`,
      type: "boolean",
    }),
    name: "typescript",
    templateFilenameToken: (typescript) => (typescript ? tsExt : jsExt),
  };
}

async function resolveArgs(
  generatorName: string,
  generatorArgs: GeneratorArgs,
  parsedArgs: ParsedArgs,
): Promise<ResolvedArgs> {
  const config = await resolveConfig(cwd());
  const generatorConfig =
    config.generators?.[generatorName as keyof Config["generators"]];

  const resolvedArgs: ResolvedArgs = {
    typescript: config.typescript,
  };

  for (const arg of generatorArgs) {
    if (parsedArgs[arg.name] !== undefined) {
      resolvedArgs[arg.name] = parsedArgs[arg.name];
    } else if (generatorConfig?.[arg.name] !== undefined) {
      resolvedArgs[arg.name] = generatorConfig[arg.name];
    }
  }

  return resolvedArgs;
}
