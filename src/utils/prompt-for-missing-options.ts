import inquirer from "inquirer";
import { Options, RawOptions } from "../types";

// default values for unspecified args
const defaultOptions: RawOptions = {
  project: "my-dapp-example",
  install: true,
  dev: false,
};

const invalidQuestionNames = ["project", "install"];
const nullExtensionChoice = {
  name: "None",
  value: null,
};

export async function promptForMissingOptions(
  options: RawOptions
): Promise<Options> {
  const cliAnswers = Object.fromEntries(
    Object.entries(options).filter(([key, value]) => value !== null)
  );

  const questions = [];

  questions.push({
    type: "input",
    name: "project",
    message: "Your project name:",
    default: defaultOptions.project,
    validate: (value: string) => value.length > 0,
  });

  //   config.questions.forEach((question) => {
  //     if (invalidQuestionNames.includes(question.name)) {
  //       throw new Error(
  //         `The name of the question can't be "${
  //           question.name
  //         }". The invalid names are: ${invalidQuestionNames
  //           .map((w) => `"${w}"`)
  //           .join(", ")}`
  //       );
  //     }

  //     questions.push({
  //       type: question.type === "multi-select" ? "checkbox" : "list",
  //       name: question.name,
  //       message: question.message,
  //     });
  //   });

  questions.push({
    type: "confirm",
    name: "install",
    message: "Install packages?",
    default: defaultOptions.install,
  });

  const answers = await inquirer.prompt(questions, cliAnswers);

  const mergedOptions = {
    project: options.project ?? answers.project,
    install: options.install ?? answers.install,
    dev: options.dev ?? defaultOptions.dev,
  };

  return mergedOptions;
}
