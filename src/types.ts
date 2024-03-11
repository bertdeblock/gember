export enum DocumentName {
  Component = "component",
  Helper = "helper",
  Modifier = "modifier",
  Service = "service",
}

export type File = {
  content: string;
  name: string;
  path: string;
};
