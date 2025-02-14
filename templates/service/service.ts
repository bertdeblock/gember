import Service from "@ember/service";

export default class {{name.pascal}} extends Service {}

declare module "@ember/service" {
  interface Registry {
    "{{name.registryPath}}": {{name.pascal}};
  }
}
