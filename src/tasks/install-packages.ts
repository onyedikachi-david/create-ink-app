import { spawn } from "child_process";
import { projectInstall } from "pkg-install";
import { execSync, ExecSyncOptionsWithBufferEncoding } from "child_process";

export function installPackages(targetDir: string) {
  const execOpts: ExecSyncOptionsWithBufferEncoding = {
    stdio: "inherit",
    cwd: targetDir,
  };

  execSync("pnpm install", execOpts);
}
