import path from "path";
import type { Options } from "./types";
import { fileURLToPath } from "url";
import Listr from "listr";
import { createProjectDirectory } from "./tasks/create-project-directory";
import chalk from "chalk";
import { copyTemplateFiles } from "./tasks/copy-template-files";
import { installPackages } from "./tasks/install-packages";
import { createFirstGitCommit } from "./tasks/create-first-git-commit";
import { renderOutroMessage } from "./utils/render-outro-message";

export async function createProject(options: Options) {
  console.log(`\n`);

  const currentFileUrl = import.meta.url;

  const templateDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    "../../templates"
  );

  const targetDirectory = path.resolve(process.cwd(), options.project);

  const task = new Listr([
    {
      title: `📁 Create project directory ${targetDirectory}`,
      task: () => createProjectDirectory(options.project),
    },
    {
      title: `🚀 Creating a new Ink!athon app in ${chalk.green.bold(
        options.project
      )}`,
      task: () =>
        copyTemplateFiles(options, templateDirectory, targetDirectory),
    },
    {
      title: `📦 Installing dependencies with pnpm, this could take a while`,
      task: () => installPackages(targetDirectory),
      skip: () => {
        if (!options.install) {
          return "Manually skipped";
        }
      },
    },
    {
      title: `📡 Initializing git repository`,
      task: () => createFirstGitCommit(targetDirectory),
    },
  ]);

  try {
    await task.run();
    renderOutroMessage(options);
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"), error);
    console.log("%s Exiting...", chalk.red.bold("Uh oh! 😕 Sorry about that!"));
  }
}
