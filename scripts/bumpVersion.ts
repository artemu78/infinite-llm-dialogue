import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import * as semver from "semver";

const packageJsonPath = join(process.cwd(), "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

const newVersion = semver.inc(packageJson.version, "patch");
if (!newVersion) {
  console.error("Failed to increment version");
  process.exit(1);
}

packageJson.version = newVersion;
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

console.log(`Version bumped to ${newVersion}`);
