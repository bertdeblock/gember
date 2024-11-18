import { join } from "node:path";
import recursiveCopy from "recursive-copy";
import { v4 as uuidv4 } from "uuid";

type Blueprint = "v1-app" | "v1-addon" | "v2-addon" | "v2-addon-hooks";

export function blueprintPath(name: Blueprint) {
  return join("test/blueprints", name);
}

export async function copyBlueprint(
  name: Blueprint,
  directory: string = uuidv4(),
) {
  const cwd = join("test/output", directory);

  await recursiveCopy(blueprintPath(name), cwd);

  return cwd;
}
