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
  return generate("component", name, packagePath, {
    inputs: { classBased, typescript },
    nested,
    path,
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
  return generate("helper", name, packagePath, {
    inputs: { classBased, typescript },
    path,
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
  return generate("modifier", name, packagePath, {
    inputs: { classBased, typescript },
    path,
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
  return generate("service", name, packagePath, {
    inputs: { typescript },
    path,
  });
}
