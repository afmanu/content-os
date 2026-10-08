import {
  accessSync,
  constants,
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { CORE_ROOT } from "./instance-resolver.mjs";

export const BLOCKS = Object.freeze(["identity", "purpose", "channels", "voice", "privacy", "tools"]);
export const CHANNELS = Object.freeze(["youtube", "linkedin", "x"]);
export const CAPABILITY_STATUSES = Object.freeze(["AVAILABLE", "NOT_CONFIGURED", "UNKNOWN"]);
export const DEFAULT_DRAFT_NAME = ".content-os.onboard.json";

const VOICE_KINDS = new Set(["post", "transcript", "email", "script", "article"]);
const SYNC_STATUSES = new Set(["SYNCED", "LOCAL_ONLY", "UNKNOWN"]);
const EXTERNAL_PROCESSING = new Set(["NOT_AUTHORIZED", "HUMAN_APPROVAL_REQUIRED", "AUTHORIZED"]);
const EXTERNAL_ACTIONS = new Set(["HUMAN_APPROVAL_REQUIRED", "AUTHORIZED_BY_EXPLICIT_SCOPE"]);
const PUBLICATION = new Set(["HUMAN_APPROVAL_REQUIRED"]);
const CREDENTIAL_KEY = /(?:password|passphrase|token|secret|api[_-]?key|authorization|credential)/i;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function inside(parent, target) {
  const value = relative(resolve(parent), resolve(target));
  return value === "" || (!value.startsWith(`..${sep}`) && value !== ".." && !isAbsolute(value));
}

function assertDisjointRoots(coreRoot, instanceRoot) {
  const core = resolve(coreRoot);
  const instance = resolve(instanceRoot);
  if (inside(core, instance) || inside(instance, core)) {
    throw new Error("CORE_INSTANCE_ROOT_CONFLICT: CORE_ROOT and INSTANCE_ROOT must be separate, non-nested roots");
  }
}

function assertNoCredentialFields(value, trail = []) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (CREDENTIAL_KEY.test(key)) throw new Error(`CREDENTIAL_FIELD_REJECTED: ${[...trail, key].join(".")}`);
    assertNoCredentialFields(child, [...trail, key]);
  }
}

function readJson(path, code = "JSON_INVALID") {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`${code}: ${error.message}`);
  }
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
}

function same(a, b) {
  return JSON.stringify(stable(a)) === JSON.stringify(stable(b));
}

function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeText(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanStringArray(value) {
  return Array.isArray(value) ? [...new Set(value.map(cleanString).filter(Boolean))] : [];
}

function normalizeVoiceSource(source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) return null;
  const kind = cleanString(source.kind);
  const path = cleanString(source.path);
  const storedPath = cleanString(source.stored_path);
  const fileName = cleanString(source.file_name) || basename(path || storedPath);
  const digest = cleanString(source.sha256);
  return { kind, ...(path ? { path } : {}), ...(storedPath ? { stored_path: storedPath } : {}), ...(fileName ? { file_name: fileName } : {}), ...(digest ? { sha256: digest } : {}) };
}

export function normalizeBlock(block, value) {
  const input = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  if (block === "identity") return {
    display_name: cleanString(input.display_name),
    role_expertise: cleanString(input.role_expertise),
    content_basis: cleanString(input.content_basis),
  };
  if (block === "purpose") return {
    goal: cleanString(input.goal),
    audience: cleanString(input.audience),
    territories: cleanStringArray(input.territories),
    language: cleanString(input.language),
  };
  if (block === "channels") return { active_channels: cleanStringArray(input.active_channels) };
  if (block === "voice") return {
    sources: Array.isArray(input.sources) ? input.sources.map(normalizeVoiceSource).filter(Boolean) : [],
    deferred: input.deferred === true,
    observed_from_samples: cleanStringArray(input.observed_from_samples),
    user_instruction: cleanString(input.user_instruction) || "SKIP",
  };
  if (block === "privacy") return {
    sync_status: cleanString(input.sync_status) || "UNKNOWN",
    private_media_policy: cleanString(input.private_media_policy) || "OUTSIDE_CORE",
    external_processing: cleanString(input.external_processing) || "NOT_AUTHORIZED",
    external_actions_default: cleanString(input.external_actions_default) || "HUMAN_APPROVAL_REQUIRED",
    publication_approval: cleanString(input.publication_approval) || "HUMAN_APPROVAL_REQUIRED",
  };
  if (block === "tools") return {
    current_runtime: {
      name: cleanString(input.current_runtime?.name) || "current runtime",
      status: cleanString(input.current_runtime?.status) || "UNKNOWN",
    },
    audiovisual: {
      interest: input.audiovisual?.interest === true,
      status: cleanString(input.audiovisual?.status) || "UNKNOWN",
    },
    local_transcription: { status: cleanString(input.local_transcription?.status) || "UNKNOWN" },
    other_tools: Array.isArray(input.other_tools)
      ? input.other_tools.map((tool) => ({ name: cleanString(tool?.name), status: cleanString(tool?.status) || "UNKNOWN" })).filter((tool) => tool.name)
      : [],
  };
  throw new Error(`UNKNOWN_ONBOARDING_BLOCK: ${block}`);
}

export function missingForBlock(block, value) {
  const data = normalizeBlock(block, value);
  const missing = [];
  if (block === "identity") {
    for (const key of ["display_name", "role_expertise", "content_basis"]) if (!data[key]) missing.push(key);
  } else if (block === "purpose") {
    for (const key of ["goal", "audience", "language"]) if (!data[key]) missing.push(key);
    if (!data.territories.length) missing.push("territories");
  } else if (block === "channels") {
    if (!data.active_channels.length) missing.push("active_channels");
    if (data.active_channels.some((channel) => !CHANNELS.includes(channel))) missing.push("registered_active_channels_only");
  } else if (block === "voice") {
    if (data.sources.length > 2) missing.push("maximum_two_voice_sources");
    if (!data.sources.length && !data.deferred) missing.push("voice_sources_or_deferred");
    for (const source of data.sources) {
      if (!VOICE_KINDS.has(source.kind)) missing.push("supported_voice_source_kind");
      if (!source.path && !source.stored_path) missing.push("voice_source_path");
      if (source.path) {
        const sourcePath = resolve(source.path);
        if (!existsSync(sourcePath) || !lstatSync(sourcePath).isFile() || lstatSync(sourcePath).isSymbolicLink()) missing.push("readable_regular_voice_source");
      }
    }
  } else if (block === "privacy") {
    if (!SYNC_STATUSES.has(data.sync_status)) missing.push("sync_status");
    if (data.private_media_policy !== "OUTSIDE_CORE") missing.push("private_media_policy_outside_core");
    if (!EXTERNAL_PROCESSING.has(data.external_processing)) missing.push("external_processing");
    if (!EXTERNAL_ACTIONS.has(data.external_actions_default)) missing.push("external_actions_default");
    if (!PUBLICATION.has(data.publication_approval)) missing.push("publication_approval");
  } else if (block === "tools") {
    for (const status of [data.current_runtime.status, data.audiovisual.status, data.local_transcription.status, ...data.other_tools.map((tool) => tool.status)]) {
      if (!CAPABILITY_STATUSES.includes(status)) missing.push("capability_status");
    }
  }
  return [...new Set(missing)];
}

function completedBlocks(answers) {
  return BLOCKS.filter((block) => answers[block] && missingForBlock(block, answers[block]).length === 0);
}

function currentBlock(answers) {
  return BLOCKS.find((block) => !answers[block] || missingForBlock(block, answers[block]).length) ?? null;
}

function recognizedInstance(root) {
  const onboardingPath = join(root, "profile", "ONBOARDING.json");
  if (!existsSync(onboardingPath)) return null;
  const value = readJson(onboardingPath, "INSTANCE_UNRECOGNIZED");
  if (value.schema_version !== 1 || value.status !== "configured" || !value.answers) throw new Error("INSTANCE_SCHEMA_INCOMPATIBLE");
  return value;
}

function assertDraftFile(path) {
  if (!existsSync(path)) throw new Error("ONBOARDING_DRAFT_NOT_FOUND");
  if (lstatSync(path).isSymbolicLink()) throw new Error("ONBOARDING_DRAFT_INVALID: symbolic links are not accepted");
  const draft = readJson(path, "ONBOARDING_DRAFT_INVALID");
  if (draft.schema_version !== 1 || draft.status !== "in_progress" || !["FIRST_SETUP", "REFRESH"].includes(draft.mode)) {
    throw new Error("ONBOARDING_DRAFT_INVALID: unsupported draft schema or state");
  }
  return draft;
}

function assertTargetParent(instanceRoot) {
  const parent = dirname(instanceRoot);
  if (!existsSync(parent) || !lstatSync(parent).isDirectory() || lstatSync(parent).isSymbolicLink()) {
    throw new Error("INSTANCE_PARENT_INVALID: parent must be an existing regular directory");
  }
  try { accessSync(parent, constants.R_OK | constants.W_OK); }
  catch { throw new Error("INSTANCE_PARENT_PERMISSION_DENIED"); }
}

function localConfigValue(coreRoot, instanceRoot) {
  const rel = relative(resolve(coreRoot), resolve(instanceRoot));
  return rel && !isAbsolute(rel) ? rel.replace(/\\/g, "/") : resolve(instanceRoot);
}

function assertConfigCompatible(configPath, coreRoot, instanceRoot) {
  if (!existsSync(configPath)) return;
  if (lstatSync(configPath).isSymbolicLink()) throw new Error("INSTANCE_CONFIG_INVALID: local config cannot be a symbolic link");
  const config = readJson(configPath, "INSTANCE_CONFIG_INVALID");
  if (typeof config.instance_root !== "string" || !config.instance_root.trim()) throw new Error("INSTANCE_CONFIG_INVALID");
  const configured = isAbsolute(config.instance_root) ? resolve(config.instance_root) : resolve(coreRoot, config.instance_root);
  if (configured !== resolve(instanceRoot)) throw new Error("INSTANCE_CONFIG_CONFLICT: local config selects another workspace");
}

export function startOnboarding({
  coreRoot = CORE_ROOT,
  instanceRoot,
  mode = "FIRST_SETUP",
  draftPath = join(resolve(coreRoot), DEFAULT_DRAFT_NAME),
  now = () => new Date().toISOString(),
} = {}) {
  const normalizedCore = resolve(coreRoot);
  const normalizedDraft = resolve(draftPath);
  if (mode === "RESUME") return getOnboardingStatus({ draftPath: normalizedDraft });
  if (!instanceRoot) throw new Error("INSTANCE_ROOT_REQUIRED");
  const normalizedInstance = resolve(instanceRoot);
  assertDisjointRoots(normalizedCore, normalizedInstance);
  assertTargetParent(normalizedInstance);
  if (existsSync(normalizedDraft)) throw new Error("ONBOARDING_DRAFT_EXISTS: use RESUME or remove the abandoned checkpoint explicitly");

  let answers = {};
  let baseline = null;
  if (mode === "FIRST_SETUP") {
    if (existsSync(normalizedInstance)) throw new Error("INSTANCE_ROOT_OCCUPIED: no files were changed");
  } else if (mode === "REFRESH") {
    if (!existsSync(normalizedInstance) || !lstatSync(normalizedInstance).isDirectory() || lstatSync(normalizedInstance).isSymbolicLink()) {
      throw new Error("INSTANCE_UNRECOGNIZED");
    }
    const onboarding = recognizedInstance(normalizedInstance);
    if (!onboarding) throw new Error("INSTANCE_UNRECOGNIZED");
    answers = clone(onboarding.answers);
    baseline = clone(onboarding.answers);
  } else {
    throw new Error(`ONBOARDING_MODE_INVALID: ${mode}`);
  }

  const draft = {
    schema_version: 1,
    status: "in_progress",
    mode,
    instance_root: normalizedInstance,
    started_at: now(),
    updated_at: now(),
    answers,
    baseline,
  };
  writeJson(normalizedDraft, draft);
  return getOnboardingStatus({ draftPath: normalizedDraft });
}

export function getOnboardingStatus({ draftPath = join(CORE_ROOT, DEFAULT_DRAFT_NAME) } = {}) {
  const draft = assertDraftFile(resolve(draftPath));
  return {
    status: draft.status,
    mode: draft.mode,
    instance_root: draft.instance_root,
    completed_blocks: completedBlocks(draft.answers),
    current_block: currentBlock(draft.answers),
    ready_for_preview: currentBlock(draft.answers) === null,
  };
}

export function answerOnboardingBlock({
  draftPath = join(CORE_ROOT, DEFAULT_DRAFT_NAME),
  block,
  answers,
  now = () => new Date().toISOString(),
} = {}) {
  if (!BLOCKS.includes(block)) throw new Error(`UNKNOWN_ONBOARDING_BLOCK: ${block}`);
  assertNoCredentialFields(answers);
  const path = resolve(draftPath);
  const draft = assertDraftFile(path);
  const expected = currentBlock(draft.answers);
  if (draft.mode === "FIRST_SETUP" && expected && block !== expected) throw new Error(`ONBOARDING_BLOCK_OUT_OF_ORDER: expected ${expected}`);
  const merged = normalizeBlock(block, { ...(draft.answers[block] ?? {}), ...(answers ?? {}) });
  const changed = !same(draft.answers[block], merged);
  if (changed) {
    draft.answers[block] = merged;
    draft.updated_at = now();
    writeJson(path, draft);
  }
  return { ...getOnboardingStatus({ draftPath: path }), missing: missingForBlock(block, merged), changed };
}

function publicVoiceSources(voice) {
  return voice.sources.map((source) => ({ kind: source.kind, file_name: source.file_name || basename(source.path || source.stored_path) }));
}

function diffSummary(block, value) {
  if (!value) return null;
  if (block === "voice") return {
    sources: publicVoiceSources(value),
    deferred: value.deferred,
    observed_count: value.observed_from_samples.length,
    user_instruction: value.user_instruction,
  };
  return clone(value);
}

function diffAnswers(before, after) {
  if (!before) return [];
  return BLOCKS.filter((block) => !same(before[block], after[block])).map((block) => ({
    block,
    before: diffSummary(block, before[block]),
    after: diffSummary(block, after[block]),
  }));
}

export function previewOnboarding({ draftPath = join(CORE_ROOT, DEFAULT_DRAFT_NAME) } = {}) {
  const draft = assertDraftFile(resolve(draftPath));
  const missing = BLOCKS.flatMap((block) => missingForBlock(block, draft.answers[block]).map((field) => `${block}.${field}`));
  if (missing.length) throw new Error(`ONBOARDING_INCOMPLETE: ${missing.join(", ")}`);
  return {
    mode: draft.mode,
    instance_location: draft.instance_root,
    identity: clone(draft.answers.identity),
    content_purpose: draft.answers.purpose.goal,
    audience: draft.answers.purpose.audience,
    subject_territories: clone(draft.answers.purpose.territories),
    active_channels: clone(draft.answers.channels.active_channels),
    language: draft.answers.purpose.language,
    voice_sources: publicVoiceSources(draft.answers.voice),
    privacy_defaults: clone(draft.answers.privacy),
    approval_model: {
      external_actions: draft.answers.privacy.external_actions_default,
      publication: draft.answers.privacy.publication_approval,
    },
    optional_capabilities: clone(draft.answers.tools),
    changes: diffAnswers(draft.baseline, draft.answers),
    confirmation_required: draft.mode === "FIRST_SETUP" ? "CREATE INSTANCE" : "APPLY REFRESH",
  };
}

function safeFileName(name, index) {
  const cleaned = basename(name).replace(/[^A-Za-z0-9._-]/g, "-").replace(/-+/g, "-");
  return `${String(index + 1).padStart(2, "0")}-${cleaned || "voice-sample.txt"}`;
}

function materializeVoice(instanceRoot, voice) {
  const resources = [];
  for (const [index, source] of voice.sources.entries()) {
    if (source.stored_path && !source.path) {
      resources.push({ kind: source.kind, file_name: source.file_name, stored_path: source.stored_path, sha256: source.sha256 });
      continue;
    }
    const sourcePath = resolve(source.path);
    const fileName = safeFileName(source.file_name || basename(sourcePath), index);
    const storedPath = `profile/voice-sources/${fileName}`;
    copyFileSync(sourcePath, join(instanceRoot, storedPath));
    resources.push({ kind: source.kind, file_name: source.file_name || basename(sourcePath), stored_path: storedPath, sha256: sha256(sourcePath) });
  }
  return resources;
}

function instanceAnswers(answers, voiceResources) {
  const copy = clone(answers);
  copy.voice.sources = voiceResources;
  return copy;
}

function list(values) {
  return values.length ? values.join(", ") : "PENDING";
}

function profileText(answers) {
  return `# Workspace profile

STATUS: CONFIGURED

- DISPLAY NAME: ${answers.identity.display_name}
- ROLE / EXPERTISE: ${answers.identity.role_expertise}
- WORK OR KNOWLEDGE MADE INTO CONTENT: ${answers.identity.content_basis}
- CONTENT GOAL: ${answers.purpose.goal}
- AUDIENCE: ${answers.purpose.audience}
- SUBJECT TERRITORIES: ${list(answers.purpose.territories)}
- LANGUAGE: ${answers.purpose.language}
- ACTIVE CHANNELS: ${list(answers.channels.active_channels)}
- VOICE SOURCES: ${answers.voice.sources.length ? `${answers.voice.sources.length} private source(s)` : "DEFERRED"}
- SYNC STATUS: ${answers.privacy.sync_status}
- PRIVATE MEDIA: ${answers.privacy.private_media_policy}
- EXTERNAL PROCESSING: ${answers.privacy.external_processing}
- EXTERNAL ACTIONS: ${answers.privacy.external_actions_default}
- PUBLICATION: ${answers.privacy.publication_approval}
`;
}

function constitutionText(answers) {
  return `# Workspace constitution

STATUS: CONFIGURED

## Canonical product principles

- CONTENT is the channel-independent editorial core; OUTPUT is a concrete expression for one registered active channel.
- Preserve evidence, provenance, material limits, and the distinction between supplied fact, observation, interpretation, and unverified claim.
- Never fabricate experience, demonstrations, interfaces, conversations, metrics, results, or sources.
- Human approvals are scoped and non-transitive. External actions and publication require their own explicit approval.
- \`state/pieces.json\` is the only operational state store. Dashboard and ledgers are projections or history.

## User identity and purpose

- DISPLAY NAME: ${answers.identity.display_name}
- ROLE / EXPERTISE: ${answers.identity.role_expertise}
- WORK OR KNOWLEDGE MADE INTO CONTENT: ${answers.identity.content_basis}
- CONTENT GOAL: ${answers.purpose.goal}
- AUDIENCE: ${answers.purpose.audience}
- LANGUAGE: ${answers.purpose.language}

## User editorial preferences

- SUBJECT TERRITORIES: ${list(answers.purpose.territories)}
- ACTIVE CHANNELS: ${list(answers.channels.active_channels)}
- VOICE INSTRUCTION: ${answers.voice.user_instruction || "PENDING"}

## User privacy and control

- SYNC STATUS: ${answers.privacy.sync_status}
- PRIVATE MEDIA: ${answers.privacy.private_media_policy}
- EXTERNAL PROCESSING: ${answers.privacy.external_processing}
- EXTERNAL ACTIONS: ${answers.privacy.external_actions_default}
- PUBLICATION: ${answers.privacy.publication_approval}

Unknown or deferred preferences remain pending; they are never inferred as permission.
`;
}

function voiceText(answers) {
  const observed = answers.voice.observed_from_samples.length
    ? answers.voice.observed_from_samples.map((item) => `- ${item}`).join("\n")
    : "- PENDING — no evidence-backed observation recorded.";
  return `# Operational voice reference

This reference can be refreshed. A small sample supports provisional observations, not universal rules.

## Observed from samples

${observed}

## User instruction

- ${answers.voice.user_instruction || "SKIP"}

## Limits

- Do not infer personality or psychology.
- Preserve the original sources in this private instance.
- Treat observations from one sample as provisional.
`;
}

function indexText(name) {
  return `# ${name}\n\nNo records yet. Add records only through the applicable authorized workflow.\n`;
}

function initialFiles(answers, nowValue, voiceResources, coreRoot = CORE_ROOT) {
  const safe = instanceAnswers(answers, voiceResources);
  return new Map([
    ["profile/PROFILE.md", profileText(safe)],
    ["profile/ONBOARDING.json", `${JSON.stringify({ schema_version: 1, status: "configured", configured_at: nowValue, updated_at: nowValue, answers: safe }, null, 2)}\n`],
    ["profile/VOICE.md", voiceText(safe)],
    ["profile/VOICE-SOURCES.json", `${JSON.stringify({ schema_version: 1, sources: voiceResources }, null, 2)}\n`],
    ["channel/CONSTITUTION.md", constitutionText(safe)],
    ["channel/ACTIVE-CHANNELS.json", `${JSON.stringify({ schema_version: 1, status: "CONFIGURED", available_channels: CHANNELS, active_channels: safe.channels.active_channels }, null, 2)}\n`],
    ["state/pieces.json", `${JSON.stringify({ schema_version: 1, updated_at: nowValue, pieces: [], outputs: [] }, null, 2)}\n`],
    ["docs/STATE.md", `# Workspace state history\n\n- ${nowValue}: onboarding configured; no CONTENT or OUTPUT created.\n`],
    ["docs/DECISIONS.md", readFileSync(join(coreRoot, "templates", "instance", "docs", "DECISIONS.md"), "utf8")],
    ["docs/LEARNING-LEDGER.md", readFileSync(join(coreRoot, "templates", "instance", "docs", "LEARNING-LEDGER.md"), "utf8")],
    ["radar/SOURCES.md", readFileSync(join(coreRoot, "templates", "instance", "radar", "SOURCES.md"), "utf8")],
    ["radar/WATCHLIST.md", readFileSync(join(coreRoot, "templates", "instance", "radar", "WATCHLIST.md"), "utf8")],
    ["ideas/INDEX.md", indexText("Ideas")],
    ["lab/INDEX.md", indexText("Labs")],
    ["research/INDEX.md", indexText("Research")],
    ["audits/INDEX.md", indexText("Audits")],
    ["outputs/INDEX.md", indexText("Outputs")],
    ["postproduction/INDEX.md", indexText("Postproduction")],
  ]);
}

function refreshedFiles(existing, answers, nowValue, voiceResources) {
  const safe = instanceAnswers(answers, voiceResources);
  return new Map([
    ["profile/PROFILE.md", profileText(safe)],
    ["profile/ONBOARDING.json", `${JSON.stringify({ schema_version: 1, status: "configured", configured_at: existing.configured_at, updated_at: nowValue, answers: safe }, null, 2)}\n`],
    ["profile/VOICE.md", voiceText(safe)],
    ["profile/VOICE-SOURCES.json", `${JSON.stringify({ schema_version: 1, sources: voiceResources }, null, 2)}\n`],
    ["channel/CONSTITUTION.md", constitutionText(safe)],
    ["channel/ACTIVE-CHANNELS.json", `${JSON.stringify({ schema_version: 1, status: "CONFIGURED", available_channels: CHANNELS, active_channels: safe.channels.active_channels }, null, 2)}\n`],
  ]);
}

function writeMap(root, files) {
  const changed = [];
  for (const [relativePath, content] of files) {
    const path = join(root, relativePath);
    if (existsSync(path) && readFileSync(path, "utf8") === content) continue;
    writeText(path, content);
    changed.push(relativePath);
  }
  return changed;
}

function writeLocalConfig(configPath, coreRoot, instanceRoot) {
  assertConfigCompatible(configPath, coreRoot, instanceRoot);
  if (existsSync(configPath)) return false;
  writeJson(configPath, { instance_root: localConfigValue(coreRoot, instanceRoot) });
  return true;
}

export function confirmOnboarding({
  coreRoot = CORE_ROOT,
  draftPath = join(resolve(coreRoot), DEFAULT_DRAFT_NAME),
  configPath = join(resolve(coreRoot), ".content-os.local.json"),
  confirmation,
  now = () => new Date().toISOString(),
} = {}) {
  const normalizedCore = resolve(coreRoot);
  const normalizedDraft = resolve(draftPath);
  const normalizedConfig = resolve(configPath);
  const draft = assertDraftFile(normalizedDraft);
  const preview = previewOnboarding({ draftPath: normalizedDraft });
  if (confirmation !== preview.confirmation_required) throw new Error(`CONFIRMATION_REQUIRED: ${preview.confirmation_required}`);
  const instanceRoot = resolve(draft.instance_root);
  assertDisjointRoots(normalizedCore, instanceRoot);
  assertTargetParent(instanceRoot);
  assertConfigCompatible(normalizedConfig, normalizedCore, instanceRoot);
  const nowValue = now();

  if (draft.mode === "FIRST_SETUP") {
    if (existsSync(instanceRoot)) throw new Error("INSTANCE_ROOT_OCCUPIED: no files were changed");
    const tempRoot = join(dirname(instanceRoot), `.${basename(instanceRoot)}.content-os-create-${process.pid}`);
    if (existsSync(tempRoot)) throw new Error("INSTANCE_TEMP_PATH_OCCUPIED");
    mkdirSync(tempRoot);
    try {
      mkdirSync(join(tempRoot, "profile", "voice-sources"), { recursive: true });
      const voiceResources = materializeVoice(tempRoot, draft.answers.voice);
      const files = initialFiles(draft.answers, nowValue, voiceResources, normalizedCore);
      writeMap(tempRoot, files);
      renameSync(tempRoot, instanceRoot);
      try { writeLocalConfig(normalizedConfig, normalizedCore, instanceRoot); }
      catch (error) {
        rmSync(instanceRoot, { recursive: true, force: true });
        throw error;
      }
      rmSync(normalizedDraft);
      return { status: "CREATED", instance_root: instanceRoot, config_path: normalizedConfig, changed_files: [...files.keys()] };
    } catch (error) {
      if (existsSync(tempRoot)) rmSync(tempRoot, { recursive: true, force: true });
      throw error;
    }
  }

  const existing = recognizedInstance(instanceRoot);
  if (!existing) throw new Error("INSTANCE_UNRECOGNIZED");
  if (same(existing.answers, draft.answers)) {
    writeLocalConfig(normalizedConfig, normalizedCore, instanceRoot);
    rmSync(normalizedDraft);
    return { status: "NO_CHANGE", instance_root: instanceRoot, config_path: normalizedConfig, changed_files: [] };
  }
  mkdirSync(join(instanceRoot, "profile", "voice-sources"), { recursive: true });
  const voiceResources = materializeVoice(instanceRoot, draft.answers.voice);
  const changedFiles = writeMap(instanceRoot, refreshedFiles(existing, draft.answers, nowValue, voiceResources));
  writeLocalConfig(normalizedConfig, normalizedCore, instanceRoot);
  rmSync(normalizedDraft);
  return { status: "REFRESHED", instance_root: instanceRoot, config_path: normalizedConfig, changed_files: changedFiles };
}

function valueAfter(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function print(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export function main() {
  const command = process.argv[2] ?? "status";
  const draftPath = valueAfter("--draft") ?? join(CORE_ROOT, DEFAULT_DRAFT_NAME);
  if (command === "start") {
    print(startOnboarding({ instanceRoot: valueAfter("--instance-root"), mode: valueAfter("--mode") ?? "FIRST_SETUP", draftPath }));
  } else if (command === "resume" || command === "status") {
    print(getOnboardingStatus({ draftPath }));
  } else if (command === "answer") {
    const answersPath = valueAfter("--answers-file");
    if (!answersPath) throw new Error("ANSWERS_FILE_REQUIRED");
    print(answerOnboardingBlock({ draftPath, block: valueAfter("--block"), answers: readJson(resolve(answersPath), "ANSWERS_INVALID") }));
  } else if (command === "preview") {
    print(previewOnboarding({ draftPath }));
  } else if (command === "confirm") {
    print(confirmOnboarding({ draftPath, configPath: valueAfter("--config") ?? join(CORE_ROOT, ".content-os.local.json"), confirmation: valueAfter("--confirmation") }));
  } else {
    throw new Error(`UNKNOWN_COMMAND: ${command}`);
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try { main(); }
  catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
