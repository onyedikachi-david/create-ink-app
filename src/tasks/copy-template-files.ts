import { promisify } from "util";
import { Options } from "../types";
import link from "../utils/link";
import ncp from "ncp";
import { baseDir } from "../utils/conts";
import path from "path";
import { findFilesRecursiveSync } from "../utils/find-files-recursively";
import { mergePackageJson } from "../utils/merge-package-json";

const copy = promisify(ncp);
let copyOrLink = copy;

const isTemplateRegex = /([^\/\\]*?)\.template\./;
const isPackageJsonRegex = /package\.json/;
const isPnpmLockRegex = /pnpm-lock\.yaml/;
const isNextGeneratedRegex = /packages\/nextjs\/generated/;
const isConfigRegex = /([^\/\\]*?)\\config\.json/;
const isArgsRegex = /([^\/\\]*?)\.args\./;
const isExtensionFolderRegex = /extensions$/;
const isPackagesFolderRegex = /packages$/;

const copyBaseFiles = async (
  { dev: isDev }: Options,
  basePath: string,
  targetDir: string
) => {
  await copyOrLink(basePath, targetDir, {
    clobber: false,
    filter: (fileName) => {
      const isTemplate = isTemplateRegex.test(fileName);
      const isPackageJson = isPackageJsonRegex.test(fileName);
      const isPnpmLock = isPnpmLockRegex.test(fileName);
      const isNextGenrated = isNextGeneratedRegex.test(fileName);

      const skipAlways = isTemplate || isPackageJson;
      const skipDevOnly = isPnpmLock || isNextGenrated;
      const shouldSkip = skipAlways || (isDev && skipDevOnly);

      return !shouldSkip;
    },
  });

  const basePackageJsonPaths = findFilesRecursiveSync(basePath, (path) =>
    isPackageJsonRegex.test(path)
  );

  basePackageJsonPaths.forEach((packageJsonPath) => {
    const partialPath = packageJsonPath.split(basePath)[1];
    mergePackageJson(
      path.join(targetDir, partialPath),
      path.join(basePath, partialPath),
      isDev
    );
  });

  if (isDev) {
    const basePnpmLockPaths = findFilesRecursiveSync(basePath, (path) =>
      isPnpmLockRegex.test(path)
    );
    basePnpmLockPaths.forEach((pnpmLockPath) => {
      const partialPath = pnpmLockPath.split(basePath)[1];
      copy(path.join(basePath, partialPath), path.join(targetDir, partialPath));
    });

    const nextGeneratedPaths = findFilesRecursiveSync(basePath, (path) =>
      isNextGeneratedRegex.test(path)
    );
    nextGeneratedPaths.forEach((nextGeneratedPath) => {
      const partialPath = nextGeneratedPath.split(basePath)[1];
      copy(path.join(basePath, partialPath), path.join(targetDir, partialPath));
    });
  }
};

export async function copyTemplateFiles(
  options: Options,
  templateDir: string,
  targetDir: string
) {
  copyOrLink = options.dev ? link : copy;
  const basePath = path.join(templateDir, baseDir);

  await copyBaseFiles(options, basePath, targetDir)
}
