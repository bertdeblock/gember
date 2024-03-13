import { generateDocument } from "./generate-document.js";
import { DocumentName } from "./types.js";

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
  return generateDocument(DocumentName.Component, name, {
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
  return generateDocument(DocumentName.Helper, name, {
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
  return generateDocument(DocumentName.Modifier, name, {
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
  return generateDocument(DocumentName.Service, name, {
    cwd,
    inputs: { authoringFormat },
    path,
  });
}
