import { generateDocument } from "./generate-document.js";
import { DocumentName } from "./types.js";

export function generateComponent(
  name: string,
  cwd: string,
  options: { gts: boolean } = { gts: false },
) {
  return generateDocument(DocumentName.Component, name, cwd, options);
}

export function generateHelper(
  name: string,
  cwd: string,
  options: { ts: boolean } = { ts: false },
) {
  return generateDocument(DocumentName.Helper, name, cwd, options);
}

export function generateModifier(
  name: string,
  cwd: string,
  options: { ts: boolean } = { ts: false },
) {
  return generateDocument(DocumentName.Modifier, name, cwd, options);
}

export function generateService(
  name: string,
  cwd: string,
  options: { ts: boolean } = { ts: false },
) {
  return generateDocument(DocumentName.Service, name, cwd, options);
}
