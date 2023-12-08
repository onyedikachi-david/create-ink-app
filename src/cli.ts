import { createProject } from "./main";
import type { Args } from "./types";
import { parseArgumentsIntoOptions } from "./utils/parse-arguments-into-options";
import { promptForMissingOptions } from "./utils/prompt-for-missing-options";
import { renderIntroMessage } from "./utils/render-intro-message";

export async function cli(args: Args) {
  renderIntroMessage();

  const rawOptions = parseArgumentsIntoOptions(args);
  const options = await promptForMissingOptions(rawOptions);

  await createProject(options);
}
