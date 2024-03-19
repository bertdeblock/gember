import { generateDocument } from "./generate-document.js";

export function generateComponent(
  name: string,
  {
    classBased = false,
    cwd = "",
    path = "",
    ts = false,
  }: {
    classBased?: boolean;
    cwd?: string;
    path?: string;
    ts?: boolean;
  } = {},
) {
  return generateDocument("component", name, {
    cwd,
    inputs: { classBased, ts },
    path,
  });
}

export function generateHelper(
  name: string,
  {
    classBased = false,
    cwd = "",
    path = "",
    ts = false,
  }: {
    classBased?: boolean;
    cwd?: string;
    path?: string;
    ts?: boolean;
  } = {},
) {
  return generateDocument("helper", name, {
    cwd,
    inputs: { classBased, ts },
    path,
  });
}

export function generateModifier(
  name: string,
  {
    classBased = false,
    cwd = "",
    path = "",
    ts = false,
  }: {
    classBased?: boolean;
    cwd?: string;
    path?: string;
    ts?: boolean;
  } = {},
) {
  return generateDocument("modifier", name, {
    cwd,
    inputs: { classBased, ts },
    path,
  });
}

export function generateService(
  name: string,
  {
    cwd = "",
    path = "",
    ts = false,
  }: {
    cwd?: string;
    path?: string;
    ts?: boolean;
  } = {},
) {
  return generateDocument("service", name, {
    cwd,
    inputs: { ts },
    path,
  });
}
