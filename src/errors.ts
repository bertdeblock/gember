import { consola } from "consola";
import process from "node:process";

export class GemberError extends Error {}

export async function logGemberErrors(
  func: () => Promise<void>,
): Promise<void> {
  try {
    await func();
  } catch (error) {
    if (error instanceof GemberError) {
      consola.error(error);
      process.exitCode = 1;
    } else {
      throw error;
    }
  }
}
