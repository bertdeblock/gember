import process from "node:process";
import { logger } from "./logger.js";

export class GemberError extends Error {}

export async function logGemberErrors(
  func: () => Promise<void>,
): Promise<void> {
  try {
    await func();
  } catch (error) {
    if (error instanceof GemberError) {
      logger.error(error);
      process.exitCode = 1;
    } else {
      throw error;
    }
  }
}
