import { createConsola, LogLevels } from "consola";

export const logger = createConsola({
  formatOptions: { date: false },
  level: LogLevels.info,
});
