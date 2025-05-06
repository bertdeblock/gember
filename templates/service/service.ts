import Service from "@ember/service";

export default class {{name.pascal}}Service extends Service {}

declare module "@ember/service" {
  interface Registry {
    {{{name.pathMaybeQuoted}}}: {{name.pascal}}Service;
  }
}
