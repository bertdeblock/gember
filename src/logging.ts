import chalk from "chalk";

export function success(message: string): void {
  console.log(chalk.green(`🫚 ${message}`));
}
