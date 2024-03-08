import { generateDocument } from "./generate-document.js";
import { DocumentName } from "./types.js";

export function generateComponent(
  name: string,
  cwd: string,
  { gts = false, path = "" } = {},
) {
  return generateDocument(DocumentName.Component, name, cwd, {
    inputs: { gts },
    path: path,
  });
}

export function generateHelper(
  name: string,
  cwd: string,
  { path = "", ts = false } = {},
) {
  return generateDocument(DocumentName.Helper, name, cwd, {
    inputs: { ts },
    path: path,
  });
}

export function generateModifier(
  name: string,
  cwd: string,
  { path = "", ts = false } = {},
) {
  return generateDocument(DocumentName.Modifier, name, cwd, {
    inputs: { ts },
    path: path,
  });
}

export function generateService(
  name: string,
  cwd: string,
  { path = "", ts = false } = {},
) {
  return generateDocument(DocumentName.Service, name, cwd, {
    inputs: { ts },
    path: path,
  });
}
