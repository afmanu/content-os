import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { CORE_ROOT, resolveInstance } from "./instance-resolver.mjs";

const WORKFLOWS = [
  "AUDIT", "BUILD", "EXPERIMENT", "IDEA", "INDEX", "LEVEL-UP", "LINK", "ONBOARD", "OUTPUT",
  "POSTPRODUCTION", "PRODUCTION", "PUBLICATION-PACKAGE", "RADAR", "REPURPOSE", "RESEARCH", "REVIEW",
];

const SKILLS = [
  "content-audit", "content-build", "content-experiment", "content-idea", "content-level-up",
  "content-link", "content-onboard", "content-output", "content-postproduction", "content-production",
  "content-publication-package", "content-radar", "content-repurpose", "content-research",
  "content-review", "content-status",
];

const CORE_REQUIRED = [
  "README.md", "AGENTS.md", "LICENSE", "VERSION", "channel/CONSTITUTION.md", "channel/INDEX.md",
  "channel/EDITORIAL-QUALITY.md", "docs/PRODUCT-BOUNDARY.md", "docs/PRODUCT-DECISIONS.md",
  "docs/NETWORK-BOUNDARY.md", "productization/LICENSE-OPTIONS.md", "productization/RELEASE-MANIFEST.md",
  "config/content-os.local.example.json", "schemas/instance-config.schema.json",
  "schemas/onboarding.schema.json",
  "templates/instance/state/pieces.json", "dashboard/src/server.mjs", "productization/ALLOWLIST.md",
];

const INSTANCE_REQUIRED = [
  "profile/PROFILE.md", "profile/ONBOARDING.json", "profile/VOICE.md", "profile/VOICE-SOURCES.json",
  "channel/CONSTITUTION.md", "channel/ACTIVE-CHANNELS.json",
  "state/pieces.json", "docs/STATE.md", "docs/DECISIONS.md", "docs/LEARNING-LEDGER.md",
];

const CHANNEL_FORMATS = Object.freeze({
  youtube: new Set(["walkthrough", "tutorial", "build", "case_study", "deconstruction", "investigation", "experiment", "comparison", "explainer", "framework", "list", "news", "story", "short_video"]),
  linkedin: new Set(["post", "long_post"]),
  x: new Set(["short_post", "long_post"]),
});

function check(id, status, message) {
  return { id, status, message };
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function existingFiles(root, names) {
  return names.filter((name) => existsSync(join(root, name)));
}

function countFiles(root, matcher) {
  if (!existsSync(root)) return 0;
  let count = 0;
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const target = join(root, entry.name);
    if (entry.isDirectory()) count += countFiles(target, matcher);
    else if (entry.isFile() && matcher(target)) count += 1;
  }
  return count;
}

function pathInside(root, target) {
  const value = relative(resolve(root), resolve(target));
  return value === "" || (!value.startsWith(`..${sep}`) && value !== ".." && !isAbsolute(value));
}

function validateCore(coreRoot) {
  const checks = [];
  const missing = CORE_REQUIRED.filter((path) => !existsSync(join(coreRoot, path)));
  checks.push(check("core.required", missing.length ? "FAIL" : "PASS", missing.length ? `Missing: ${missing.join(", ")}` : "Required product surfaces exist."));

  const missingWorkflows = WORKFLOWS.filter((name) => !existsSync(join(coreRoot, "workflows", `${name}.md`)));
  checks.push(check("core.workflows", missingWorkflows.length ? "FAIL" : "PASS", missingWorkflows.length ? `Missing: ${missingWorkflows.join(", ")}` : "All canonical workflow contracts exist."));

  const missingSkills = SKILLS.filter((name) => !existsSync(join(coreRoot, ".agents", "skills", name, "SKILL.md")) || !existsSync(join(coreRoot, ".agents", "skills", name, "agents", "openai.yaml")));
  checks.push(check("core.skills", missingSkills.length ? "FAIL" : "PASS", missingSkills.length ? `Missing: ${missingSkills.join(", ")}` : "All workflow adapters exist."));

  const forbiddenRoots = ["state", "ideas", "lab", "research", "radar", "audits", "outputs", "postproduction"].filter((name) => existsSync(join(coreRoot, name)));
  checks.push(check("core.no_live_instance", forbiddenRoots.length ? "FAIL" : "PASS", forbiddenRoots.length ? `Live instance roots present: ${forbiddenRoots.join(", ")}` : "No live instance roots exist in CORE_ROOT."));

  const version = existsSync(join(coreRoot, "VERSION")) ? readFileSync(join(coreRoot, "VERSION"), "utf8").trim() : "";
  checks.push(check("core.release_version", version === "0.1.0-alpha.1" ? "PASS" : "FAIL", `Release version: ${version || "missing"}.`));

  const channelIndex = existsSync(join(coreRoot, "channel", "INDEX.md")) ? readFileSync(join(coreRoot, "channel", "INDEX.md"), "utf8") : "";
  const channels = [...channelIndex.matchAll(/^\| `([^`]+)` \|/gm)].map((match) => match[1]);
  checks.push(check("core.channels", JSON.stringify(channels) === JSON.stringify(["youtube", "linkedin", "x"]) ? "PASS" : "FAIL", `Available channels: ${channels.join(", ") || "none"}.`));

  const major = Number(process.versions.node.split(".")[0]);
  checks.push(check("core.node", major >= 22 ? "PASS" : "FAIL", `Node ${process.versions.node}.`));

  const status = checks.some((item) => item.status === "FAIL") ? "FAIL" : "PASS";
  return { status, checks };
}

function validateOutputs(state, root, errors) {
  const contentIds = new Set();
  for (const piece of state.pieces) {
    if (!piece || typeof piece !== "object" || !/^CONTENT-\d{3,}$/.test(piece.id ?? "")) errors.push("Invalid CONTENT identity.");
    else if (contentIds.has(piece.id)) errors.push(`Duplicate CONTENT identity: ${piece.id}.`);
    else contentIds.add(piece.id);
  }

  const outputIds = new Set();
  const byId = new Map();
  for (const output of state.outputs) {
    if (!output || typeof output !== "object" || !/^OUTPUT-\d{3,}$/.test(output.output_id ?? "")) {
      errors.push("Invalid OUTPUT identity.");
      continue;
    }
    if (outputIds.has(output.output_id)) errors.push(`Duplicate OUTPUT identity: ${output.output_id}.`);
    outputIds.add(output.output_id);
    byId.set(output.output_id, output);
    if (!contentIds.has(output.content_id)) errors.push(`Unknown CONTENT for ${output.output_id}.`);
    if (!Object.hasOwn(CHANNEL_FORMATS, output.channel)) errors.push(`Unregistered channel for ${output.output_id}.`);
    else if (!CHANNEL_FORMATS[output.channel].has(output.format)) errors.push(`Invalid format for ${output.output_id}.`);
    if (!['DIRECT', 'REPURPOSED'].includes(output.origin)) errors.push(`Invalid origin for ${output.output_id}.`);
    if (output.origin === "DIRECT" && output.source_output_id != null) errors.push(`DIRECT output ${output.output_id} cannot have source_output_id.`);
    if (output.origin === "REPURPOSED" && !output.source_output_id) errors.push(`REPURPOSED output ${output.output_id} requires source_output_id.`);
    if (typeof output.artifact !== "string" || !output.artifact || !existsSync(join(root, output.artifact))) errors.push(`Missing artifact for ${output.output_id}.`);
  }

  for (const output of state.outputs) {
    if (output.origin !== "REPURPOSED" || !output.source_output_id) continue;
    const source = byId.get(output.source_output_id);
    if (!source) errors.push(`Unknown source output for ${output.output_id}.`);
    else if (source.content_id !== output.content_id) errors.push(`Cross-CONTENT provenance for ${output.output_id}.`);
    const visited = new Set([output.output_id]);
    let current = output;
    while (current?.source_output_id) {
      if (visited.has(current.source_output_id)) {
        errors.push(`OUTPUT cycle at ${output.output_id}.`);
        break;
      }
      visited.add(current.source_output_id);
      current = byId.get(current.source_output_id);
    }
  }
}

function validateInstance(resolution) {
  if (resolution.status === "NOT_CONFIGURED") {
    return { status: "NOT_CONFIGURED", root: null, checks: [], counts: { content: 0, outputs: 0, labs: 0, research: 0, audits: 0, edits: 0, decisions: 0, learnings: 0 } };
  }
  if (resolution.status === "CONFIGURED_MISSING") {
    return { status: "FAIL", root: resolution.instance_root, checks: [check("instance.root", "FAIL", "Configured workspace does not exist.")], counts: {} };
  }

  const root = resolution.instance_root;
  const checks = [];
  const missing = INSTANCE_REQUIRED.filter((path) => !existsSync(join(root, path)));
  checks.push(check("instance.required", missing.length ? "FAIL" : "PASS", missing.length ? `Missing: ${missing.join(", ")}` : "Required workspace surfaces exist."));
  if (missing.length) return { status: "FAIL", root, checks, counts: {} };

  const errors = [];
  let state;
  let channels;
  let onboarding;
  let voiceSources;
  try { state = readJson(join(root, "state", "pieces.json")); } catch (error) { errors.push(`Invalid state JSON: ${error.message}`); }
  try { channels = readJson(join(root, "channel", "ACTIVE-CHANNELS.json")); } catch (error) { errors.push(`Invalid channel JSON: ${error.message}`); }
  try { onboarding = readJson(join(root, "profile", "ONBOARDING.json")); } catch (error) { errors.push(`Invalid onboarding JSON: ${error.message}`); }
  try { voiceSources = readJson(join(root, "profile", "VOICE-SOURCES.json")); } catch (error) { errors.push(`Invalid voice source JSON: ${error.message}`); }

  if (state) {
    if (state.schema_version !== 1) errors.push("Unsupported state schema_version.");
    if (!Array.isArray(state.pieces)) errors.push("pieces must be an array.");
    if (!Array.isArray(state.outputs)) errors.push("outputs must be an array.");
    if (typeof state.updated_at !== "string" || Number.isNaN(Date.parse(state.updated_at))) errors.push("updated_at must be a generated date.");
  }

  const available = channels?.available_channels;
  const active = channels?.active_channels;
  if (channels?.status !== "CONFIGURED") errors.push("Workspace channels must be CONFIGURED.");
  if (JSON.stringify(available) !== JSON.stringify(["youtube", "linkedin", "x"])) errors.push("Workspace available_channels must match the product registry.");
  if (!Array.isArray(active) || !active.length || active.some((value) => !available?.includes(value))) errors.push("active_channels must be a non-empty registered subset.");

  if (onboarding) {
    if (onboarding.schema_version !== 1 || onboarding.status !== "configured") errors.push("Onboarding must use supported configured schema.");
    if (typeof onboarding.configured_at !== "string" || Number.isNaN(Date.parse(onboarding.configured_at))) errors.push("configured_at must be a generated date.");
    if (typeof onboarding.updated_at !== "string" || Number.isNaN(Date.parse(onboarding.updated_at))) errors.push("onboarding updated_at must be a generated date.");
    const answers = onboarding.answers;
    for (const block of ["identity", "purpose", "channels", "voice", "privacy", "tools"]) if (!answers?.[block]) errors.push(`Missing onboarding block: ${block}.`);
    if (answers?.privacy?.private_media_policy !== "OUTSIDE_CORE") errors.push("Private media must remain outside CORE_ROOT.");
    if (answers?.privacy?.publication_approval !== "HUMAN_APPROVAL_REQUIRED") errors.push("Publication must require human approval.");
    if (active && JSON.stringify(answers?.channels?.active_channels) !== JSON.stringify(active)) errors.push("Onboarding and active channel selection differ.");
  }

  if (voiceSources) {
    if (voiceSources.schema_version !== 1 || !Array.isArray(voiceSources.sources)) errors.push("Voice source inventory schema is invalid.");
    else for (const source of voiceSources.sources) {
      if (!source || typeof source.stored_path !== "string" || isAbsolute(source.stored_path) || !pathInside(root, join(root, source.stored_path))) errors.push("Voice source path must be relative and inside INSTANCE_ROOT.");
      else if (!existsSync(join(root, source.stored_path)) || !statSync(join(root, source.stored_path)).isFile()) errors.push("Referenced voice source is missing.");
      if (Object.hasOwn(source ?? {}, "path")) errors.push("Original voice source paths must not be stored in configured context.");
    }
  }

  if (state && Array.isArray(state.pieces) && Array.isArray(state.outputs) && Array.isArray(active)) validateOutputs(state, root, errors);

  const stateFiles = readdirSync(join(root, "state")).filter((name) => name !== "pieces.json");
  if (stateFiles.length) errors.push("A second state store is not allowed.");

  checks.push(check("instance.schema", errors.length ? "FAIL" : "PASS", errors.length ? errors.join(" ") : "Workspace schema is valid."));
  const decisions = (readFileSync(join(root, "docs", "DECISIONS.md"), "utf8").match(/^## DEC-\d{3,}\b/gm) ?? []).length;
  const learnings = (readFileSync(join(root, "docs", "LEARNING-LEDGER.md"), "utf8").match(/^## LRN-\d{3,}\b/gm) ?? []).length;
  const counts = {
    content: state?.pieces?.length ?? 0,
    outputs: state?.outputs?.length ?? 0,
    labs: countFiles(join(root, "lab"), () => true),
    research: countFiles(join(root, "research"), () => true),
    audits: countFiles(join(root, "audits"), (path) => /(?:^|[\\/])AUDIT-[^\\/]+\.md$/.test(path)),
    edits: countFiles(join(root, "postproduction"), (path) => /EDIT-\d+\.md$/.test(path)),
    decisions,
    learnings,
  };
  return { status: errors.length ? "FAIL" : "PASS", root, checks, counts };
}

export function validateRepository({ coreRoot = CORE_ROOT, env = process.env, explicitInstanceRoot, configPath } = {}) {
  const resolvedCore = resolve(coreRoot);
  const core = validateCore(resolvedCore);
  let resolution;
  let instance;
  try {
    resolution = resolveInstance({ coreRoot: resolvedCore, env, explicitRoot: explicitInstanceRoot, configPath });
    instance = validateInstance(resolution);
  } catch (error) {
    resolution = { status: "INVALID", core_root: resolvedCore, instance_root: null, source: null };
    instance = { status: "FAIL", root: null, checks: [check("instance.resolver", "FAIL", error.message)], counts: {} };
  }
  const operational = instance.status === "PASS"
    ? { status: "READY_FOR_OPERATIONS", reason: "Valid workspace connected; each workflow still enforces its own inputs and gates." }
    : { status: "NOT_READY", reason: instance.status === "NOT_CONFIGURED" ? "INSTANCE_NOT_CONFIGURED" : "INSTANCE_INVALID" };
  const optionalModules = { av: { status: "OPTIONAL_NOT_BUNDLED", blocks_core: false, reason: "Public contracts and original local adapters are included; render, transcription, browser, FFmpeg, and third-party runtime dependencies are not bundled." } };
  const overall = core.status === "FAIL" || instance.status === "FAIL" ? "FAIL" : instance.status === "NOT_CONFIGURED" ? "PASS_WITH_SETUP_REQUIRED" : "PASS";
  return {
    schema_version: "content-os.validation.v2",
    core,
    instance,
    operational,
    optional_modules: optionalModules,
    overall,
  };
}

function valueAfter(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export function main() {
  const result = validateRepository({ explicitInstanceRoot: valueAfter("--instance-root"), configPath: valueAfter("--config") });
  if (process.argv.includes("--json")) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  else {
    process.stdout.write(`CORE: ${result.core.status}\n`);
    process.stdout.write(`INSTANCE: ${result.instance.status}\n`);
    process.stdout.write(`OPERATIONAL: ${result.operational.status}\n`);
    process.stdout.write(`AV: ${result.optional_modules.av.status}\n`);
    process.stdout.write(`OVERALL: ${result.overall}\n`);
  }
  return result.overall === "FAIL" ? 1 : 0;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) process.exitCode = main();
