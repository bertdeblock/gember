import { generate } from "./generate.js";

export function generateComponent(
  name: string,
  packagePath: string,
  {
    classBased = false,
    nested,
    path,
    typescript = false,
  }: {
    classBased?: boolean;
    nested?: boolean;
    path?: string;
    typescript?: boolean;
  } = {},
): Promise<void> {
  return generate({
    customTargetPath: path,
    entityName: name,
    generatorName: "component",
    nested,
    packagePath,
    targetDir: "components",
    templateFilename:
      (classBased ? "class-based" : "template-only") +
      (typescript ? ".gts" : ".gjs"),
  });
}

export function generateHelper(
  name: string,
  packagePath: string,
  {
    classBased = false,
    path,
    typescript = false,
  }: {
    classBased?: boolean;
    path?: string;
    typescript?: boolean;
  } = {},
): Promise<void> {
  return generate({
    customTargetPath: path,
    entityName: name,
    generatorName: "helper",
    packagePath,
    targetDir: "helpers",
    templateFilename:
      (classBased ? "class-based" : "function-based") +
      (typescript ? ".ts" : ".js"),
  });
}

export function generateModifier(
  name: string,
  packagePath: string,
  {
    classBased = false,
    path,
    typescript = false,
  }: {
    classBased?: boolean;
    path?: string;
    typescript?: boolean;
  } = {},
): Promise<void> {
  return generate({
    customTargetPath: path,
    entityName: name,
    generatorName: "modifier",
    packagePath,
    targetDir: "modifiers",
    templateFilename:
      (classBased ? "class-based" : "function-based") +
      (typescript ? ".ts" : ".js"),
  });
}

export function generateService(
  name: string,
  packagePath: string,
  {
    path,
    typescript = false,
  }: {
    path?: string;
    typescript?: boolean;
  } = {},
): Promise<void> {
  return generate({
    customTargetPath: path,
    entityName: name,
    generatorName: "service",
    packagePath,
    targetDir: "services",
    templateFilename: typescript ? "service.ts" : "service.js",
  });
}
