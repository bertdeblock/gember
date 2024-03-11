import { remove } from "fs-extra";
import { join } from "node:path";
import recursiveCopy from "recursive-copy";
import { v4 as uuidv4 } from "uuid";

export async function copyBlueprint(
  name: "v2-addon" | "v2-addon-hooks",
  directory: string = uuidv4(),
) {
  const cwd = join("test/output", directory);

  await remove(cwd);
  await recursiveCopy(join("test/blueprints", name), cwd);

  return cwd;
}
