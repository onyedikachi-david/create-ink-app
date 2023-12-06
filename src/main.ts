import path from "path";
import type { Options } from "./types";
import { fileURLToPath } from "url";
import Listr from "listr";
import { createProjectDirectory } from "./tasks/create-project-directory";
import chalk from "chalk";

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
          title: `🚀 Creating a new Ink!athon app in ${chalk.green.bold(options.project)}`,
          task: () => 
      }
      
    ]);
}
