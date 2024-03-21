import { generateDocument } from "./generate-document.js";

export function generateComponent(
  name: string,
  {
    classBased = false,
    cwd = "",
    path = "",
    typescript = false,
  }: {
    classBased?: boolean;
    cwd?: string;
    path?: string;
    typescript?: boolean;
  } = {},
) {
  return generateDocument("component", name, {
    cwd,
    inputs: { classBased, typescript },
    path,
  });
}

export function generateHelper(
  name: string,
  {
    classBased = false,
    cwd = "",
    path = "",
    typescript = false,
  }: {
    classBased?: boolean;
    cwd?: string;
    path?: string;
    typescript?: boolean;
  } = {},
) {
  return generateDocument("helper", name, {
    cwd,
    inputs: { classBased, typescript },
    path,
  });
}

export function generateModifier(
  name: string,
  {
    classBased = false,
    cwd = "",
    path = "",
    typescript = false,
  }: {
    classBased?: boolean;
    cwd?: string;
    path?: string;
    typescript?: boolean;
  } = {},
) {
  return generateDocument("modifier", name, {
    cwd,
    inputs: { classBased, typescript },
    path,
  });
}

export function generateService(
  name: string,
  {
    cwd = "",
    path = "",
    typescript = false,
  }: {
    cwd?: string;
    path?: string;
    typescript?: boolean;
  } = {},
) {
  return generateDocument("service", name, {
    cwd,
    inputs: { typescript },
    path,
  });
}
