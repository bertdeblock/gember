import { generateDocument } from "./generate-document.js";

export function generateComponent(
  name: string,
  {
    authoringFormat = "gjs",
    classBased = false,
    cwd = "",
    path = "",
  }: {
    authoringFormat?: "gjs" | "gts";
    classBased?: boolean;
    cwd?: string;
    path?: string;
  } = {},
) {
  return generateDocument("component", name, {
    cwd,
    inputs: { authoringFormat, classBased },
    path,
  });
}

export function generateHelper(
  name: string,
  {
    authoringFormat = "js",
    classBased = false,
    cwd = "",
    path = "",
  }: {
    authoringFormat?: "js" | "ts";
    classBased?: boolean;
    cwd?: string;
    path?: string;
  } = {},
) {
  return generateDocument("helper", name, {
    cwd,
    inputs: { authoringFormat, classBased },
    path,
  });
}

export function generateModifier(
  name: string,
  {
    authoringFormat = "js",
    cwd = "",
    path = "",
  }: {
    authoringFormat?: "js" | "ts";
    cwd?: string;
    path?: string;
  } = {},
) {
  return generateDocument("modifier", name, {
    cwd,
    inputs: { authoringFormat },
    path,
  });
}

export function generateService(
  name: string,
  {
    authoringFormat = "js",
    cwd = "",
    path = "",
  }: {
    authoringFormat?: "js" | "ts";
    cwd?: string;
    path?: string;
  } = {},
) {
  return generateDocument("service", name, {
    cwd,
    inputs: { authoringFormat },
    path,
  });
}
