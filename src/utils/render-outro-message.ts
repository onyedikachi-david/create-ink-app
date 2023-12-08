import chalk from "chalk";
import { Options } from "../types";

export async function renderOutroMessage(options: Options) {
  let message = `
  \n
  ${chalk.bold.green("Congratulations!")} Your project has been created! 🎉

  ${chalk.bold("Next steps:")}
  
  ${chalk.dim("cd")} ${options.project}
  `;

  message += `
  \t${chalk.bold("In a new terminal window, start the frontend")}
  \t${chalk.dim("pnpm")} start
  `;

  message += `
  ${chalk.bold.green("Thanks for using Create-Ink-App 🙏, Happy Building!")}
  `;

  message += `
  ${chalk.bold("Here are some useful scripts for your project:")}
  \t${chalk.bold.green("postinstall")}: ${chalk.dim("bash postinstall.sh")}
  \t${chalk.bold.green("test")}: ${chalk.dim("bash test-all.sh")}
  \t${chalk.bold.green("build")}: ${chalk.dim("bash build-all.sh")}
  \t${chalk.bold.green("node")}: ${chalk.dim(
    "substrate-contracts-node --dev --base-path ./.node-data"
  )}
  \t${chalk.bold.green("script")}: ${chalk.dim(
    'f() { tsx ./scripts/$1; }; f "$@"'
  )}
  \t${chalk.bold.green("deploy")}: ${chalk.dim("pnpm run script deploy")}
  \t${chalk.bold.green("contracts-ui")}: ${chalk.dim(
    "open https://contracts-ui.substrate.io/?rpc=ws://127.0.0.1:9944"
  )}
  \t${chalk.bold.green("explorer-ui")}: ${chalk.dim(
    "open https://polkadot.js.org/apps/#/explorer?rpc=ws://127.0.0.1:9944"
  )}
  `;
  console.log(message);
}
