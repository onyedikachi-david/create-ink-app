import { execa } from "execa";

export async function createFirstGitCommit(targetDir: string) {
  try {
    await execa("git", ["add", "-A"], { cwd: targetDir });
    await execa(
      "git",
      ["commit", "-m", "Initial commit with Create-Ink-App", "--no-verify"],
      { cwd: targetDir }
    );
  } catch (e: any) {
    // cast error as ExecaError to get stderr

    throw new Error("Failed to initialize git repository", {
      cause: e?.stderr ?? e,
    });
  }
}
