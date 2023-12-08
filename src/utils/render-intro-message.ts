import chalk from "chalk";

export const TITLE_TEXT = `
 ${chalk.bold.blue("+-+-+-+-+-+-+-+-+-+-+-+-+-+-+")}
 ${chalk.bold.blue("|      Create Ink! app      |")}
 ${chalk.bold.blue("+-+-+-+-+-+-+-+-+-+-+-+-+-+-+")}
`;

export function renderIntroMessage() {
  console.log(TITLE_TEXT);
}
