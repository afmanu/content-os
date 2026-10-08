import { existsSync, lstatSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const CORE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function inside(parent, target) {
  const value = relative(resolve(parent), resolve(target));
  return value === "" || (!value.startsWith(`..${sep}`) && value !== ".." && !isAbsolute(value));
}
function parseConfig(path) {
  let value;
  try {
    value = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`INSTANCE_CONFIG_INVALID: ${error.message}`);
  }
  if (!value || typeof value !== "object" || Array.isArray(value) || typeof value.instance_root !== "string" || !value.instance_root.trim()) {
    throw new Error("INSTANCE_CONFIG_INVALID: instance_root must be a non-empty string");
  }
  return value.instance_root.trim();
}

export function resolveInstance({ coreRoot = CORE_ROOT, env = process.env, explicitRoot, configPath } = {}) {
  const normalizedCore = resolve(coreRoot);
  const localConfig = configPath ? resolve(configPath) : resolve(normalizedCore, ".content-os.local.json");
  let candidate = explicitRoot;
  let source = explicitRoot ? "argument" : null;

  if (!candidate && typeof env.CONTENT_OS_INSTANCE_ROOT === "string" && env.CONTENT_OS_INSTANCE_ROOT.trim()) {
    candidate = env.CONTENT_OS_INSTANCE_ROOT.trim();
    source = "environment";
  }

  if (!candidate && existsSync(localConfig)) {
    if (lstatSync(localConfig).isSymbolicLink()) throw new Error("INSTANCE_CONFIG_INVALID: local config cannot be a symbolic link");
    candidate = parseConfig(localConfig);
    source = "local_config";
  }

  if (!candidate) {
    return {
      status: "NOT_CONFIGURED",
      core_root: normalizedCore,
      instance_root: null,
      source: null,
    };
  }

  const instanceRoot = isAbsolute(candidate) ? resolve(candidate) : resolve(normalizedCore, candidate);
  if (inside(normalizedCore, instanceRoot)) {
    throw new Error("INSTANCE_INSIDE_CORE: the workspace must be outside CORE_ROOT");
  }

  return {
    status: existsSync(instanceRoot) ? "CONFIGURED" : "CONFIGURED_MISSING",
    core_root: normalizedCore,
    instance_root: instanceRoot,
    source,
  };
}
