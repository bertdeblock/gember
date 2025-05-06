import Service from "@ember/service";

export default class {{name.pascal}}Service extends Service {}

declare module "@ember/service" {
  interface Registry {
    "{{name.path}}": {{name.pascal}}Service;
  }
}
