import { pathToFileURL } from "node:url";
import { resolveInstance } from "./instance-resolver.mjs";

function valueAfter(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export function main() {
  try {
    const result = resolveInstance({
      explicitRoot: valueAfter("--instance-root"),
      configPath: valueAfter("--config"),
    });
    if (process.argv.includes("--json")) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    else if (result.status === "NOT_CONFIGURED") process.stdout.write("SETUP REQUIRED\nNo content workspace configured.\nRun onboarding to create/connect a workspace.\n");
    else process.stdout.write(`${result.status}: ${result.instance_root}\n`);
    return 0;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    return 1;
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) process.exitCode = main();
