import { join } from "node:path";
import recursiveCopy from "recursive-copy";
import { v4 as uuidv4 } from "uuid";

export async function copyBlueprint(name: "v2-addon") {
  const cwd = join("test/output", uuidv4());

  await recursiveCopy(join("test/blueprints", name), cwd);

  return cwd;
}
