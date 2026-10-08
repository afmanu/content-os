import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { buildDashboardView } from "../dashboard/src/view.mjs";
import {
  answerOnboardingBlock,
  confirmOnboarding,
  getOnboardingStatus,
  previewOnboarding,
  startOnboarding,
} from "./content-onboard.mjs";
import { CORE_ROOT, resolveInstance } from "./instance-resolver.mjs";
import { validateRepository } from "./validate-content-os.mjs";

const NOW = "2031-02-03T04:05:06.000Z";

function hash(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function write(path, value) {
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, value);
}

function fixture() {
  const parent = mkdtempSync(join(tmpdir(), "content-os-onboard-fictional-"));
  return {
    parent,
    instanceRoot: join(parent, "alex-workspace"),
    draftPath: join(parent, "onboard-draft.json"),
    configPath: join(parent, "local-config.json"),
    cleanup: () => rmSync(parent, { recursive: true, force: true }),
  };
}

function answerAll(target, activeChannels = ["linkedin"]) {
  const options = { draftPath: target.draftPath, now: () => NOW };
  answerOnboardingBlock({ ...options, block: "identity", answers: {
    display_name: "Alex Example",
    role_expertise: "Fictional workflow educator",
    content_basis: "Synthetic operational examples",
  } });
  answerOnboardingBlock({ ...options, block: "purpose", answers: {
    goal: "Help fictional teams understand repeatable work",
    audience: "Fictional small teams",
    territories: ["synthetic operations", "documentation"],
    language: "English",
  } });
  answerOnboardingBlock({ ...options, block: "channels", answers: { active_channels: activeChannels } });
  answerOnboardingBlock({ ...options, block: "voice", answers: {
    sources: [], deferred: true, observed_from_samples: [], user_instruction: "Use direct, concrete explanations",
  } });
  answerOnboardingBlock({ ...options, block: "privacy", answers: {} });
  answerOnboardingBlock({ ...options, block: "tools", answers: {
    current_runtime: { name: "fictional local runtime", status: "AVAILABLE" },
    audiovisual: { interest: true, status: "NOT_CONFIGURED" },
    local_transcription: { status: "UNKNOWN" },
    other_tools: [],
  } });
}

function createConfigured(activeChannels = ["linkedin"]) {
  const target = fixture();
  startOnboarding({ instanceRoot: target.instanceRoot, draftPath: target.draftPath, now: () => NOW });
  answerAll(target, activeChannels);
  const preview = previewOnboarding({ draftPath: target.draftPath });
  const result = confirmOnboarding({
    draftPath: target.draftPath,
    configPath: target.configPath,
    confirmation: "CREATE INSTANCE",
    now: () => NOW,
  });
  return { ...target, preview, result };
}

test("A. clean core remains NOT_CONFIGURED", () => {
  const result = validateRepository({ coreRoot: CORE_ROOT, env: {}, configPath: join(tmpdir(), "content-os-no-such-config.json") });
  assert.equal(result.core.status, "PASS");
  assert.equal(result.instance.status, "NOT_CONFIGURED");
});

test("B. first onboarding creates an external instance only after confirmation", () => {
  const target = fixture();
  try {
    startOnboarding({ instanceRoot: target.instanceRoot, draftPath: target.draftPath, now: () => NOW });
    answerAll(target);
    assert.equal(existsSync(target.instanceRoot), false);
    const result = confirmOnboarding({ draftPath: target.draftPath, configPath: target.configPath, confirmation: "CREATE INSTANCE", now: () => NOW });
    assert.equal(result.status, "CREATED");
    assert.equal(existsSync(join(target.instanceRoot, "profile", "ONBOARDING.json")), true);
    assert.equal(existsSync(target.draftPath), false);
    const resolved = resolveInstance({ coreRoot: CORE_ROOT, env: {}, configPath: target.configPath });
    assert.equal(resolved.status, "CONFIGURED");
    assert.equal(resolved.instance_root, target.instanceRoot);
  } finally { target.cleanup(); }
});

test("C. zero pieces and zero outputs is a valid configured instance", () => {
  const target = createConfigured();
  try {
    const result = validateRepository({ configPath: target.configPath, env: {} });
    assert.equal(result.instance.status, "PASS");
    assert.equal(result.instance.counts.content, 0);
    assert.equal(result.instance.counts.outputs, 0);
  } finally { target.cleanup(); }
});

test("D. one explicitly active channel is valid", () => {
  const target = createConfigured(["youtube"]);
  try {
    const channels = JSON.parse(readFileSync(join(target.instanceRoot, "channel", "ACTIVE-CHANNELS.json"), "utf8"));
    assert.deepEqual(channels.active_channels, ["youtube"]);
    assert.equal(validateRepository({ explicitInstanceRoot: target.instanceRoot, env: {} }).instance.status, "PASS");
  } finally { target.cleanup(); }
});

test("E. multiple explicitly active registered channels are valid", () => {
  const target = createConfigured(["linkedin", "x"]);
  try {
    const channels = JSON.parse(readFileSync(join(target.instanceRoot, "channel", "ACTIVE-CHANNELS.json"), "utf8"));
    assert.deepEqual(channels.active_channels, ["linkedin", "x"]);
    assert.equal(validateRepository({ explicitInstanceRoot: target.instanceRoot, env: {} }).instance.status, "PASS");
  } finally { target.cleanup(); }
});

test("F. an inactive channel is not treated as active", () => {
  const target = createConfigured(["linkedin"]);
  try {
    const channels = JSON.parse(readFileSync(join(target.instanceRoot, "channel", "ACTIVE-CHANNELS.json"), "utf8"));
    assert.equal(channels.available_channels.includes("x"), true);
    assert.equal(channels.active_channels.includes("x"), false);
    assert.match(readFileSync(join(CORE_ROOT, "workflows", "OUTPUT.md"), "utf8"), /STOP \/ INACTIVE CHANNEL/);
  } finally { target.cleanup(); }
});

test("G. conservative privacy defaults are materialized", () => {
  const target = createConfigured();
  try {
    const onboarding = JSON.parse(readFileSync(join(target.instanceRoot, "profile", "ONBOARDING.json"), "utf8"));
    assert.deepEqual(onboarding.answers.privacy, {
      sync_status: "UNKNOWN",
      private_media_policy: "OUTSIDE_CORE",
      external_processing: "NOT_AUTHORIZED",
      external_actions_default: "HUMAN_APPROVAL_REQUIRED",
      publication_approval: "HUMAN_APPROVAL_REQUIRED",
    });
  } finally { target.cleanup(); }
});

test("voice source stays private, copied, hashed, and separated from observations", () => {
  const target = fixture();
  try {
    const samplePath = join(target.parent, "fictional-voice-sample.txt");
    write(samplePath, "A completely fictional writing sample.\n");
    startOnboarding({ instanceRoot: target.instanceRoot, draftPath: target.draftPath, now: () => NOW });
    const options = { draftPath: target.draftPath, now: () => NOW };
    answerOnboardingBlock({ ...options, block: "identity", answers: { display_name: "Alex Example", role_expertise: "Fictional educator", content_basis: "Synthetic examples" } });
    answerOnboardingBlock({ ...options, block: "purpose", answers: { goal: "Explain fictional work", audience: "Fictional teams", territories: ["synthetic systems"], language: "English" } });
    answerOnboardingBlock({ ...options, block: "channels", answers: { active_channels: ["x"] } });
    answerOnboardingBlock({ ...options, block: "voice", answers: { sources: [{ kind: "article", path: samplePath }], deferred: false, observed_from_samples: ["Uses short declarative sentences in this sample"], user_instruction: "Prefer concrete examples" } });
    answerOnboardingBlock({ ...options, block: "privacy", answers: {} });
    answerOnboardingBlock({ ...options, block: "tools", answers: {} });
    confirmOnboarding({ draftPath: target.draftPath, configPath: target.configPath, confirmation: "CREATE INSTANCE", now: () => NOW });
    const manifest = JSON.parse(readFileSync(join(target.instanceRoot, "profile", "VOICE-SOURCES.json"), "utf8"));
    const onboarding = readFileSync(join(target.instanceRoot, "profile", "ONBOARDING.json"), "utf8");
    const voice = readFileSync(join(target.instanceRoot, "profile", "VOICE.md"), "utf8");
    assert.equal(manifest.sources.length, 1);
    assert.equal(readFileSync(join(target.instanceRoot, manifest.sources[0].stored_path), "utf8"), "A completely fictional writing sample.\n");
    assert.equal(onboarding.includes(samplePath), false);
    assert.match(voice, /## Observed from samples/);
    assert.match(voice, /## User instruction/);
  } finally { target.cleanup(); }
});

test("H. CORE and INSTANCE roots must be separate and non-nested", () => {
  const target = fixture();
  try {
    assert.throws(() => startOnboarding({ instanceRoot: CORE_ROOT, draftPath: target.draftPath }), /CORE_INSTANCE_ROOT_CONFLICT/);
    assert.throws(() => startOnboarding({ instanceRoot: join(CORE_ROOT, "workspace"), draftPath: target.draftPath }), /CORE_INSTANCE_ROOT_CONFLICT/);
  } finally { target.cleanup(); }
});

test("I. an unknown occupied directory stops without overwrite", () => {
  const target = fixture();
  try {
    mkdirSync(target.instanceRoot);
    const marker = join(target.instanceRoot, "keep.txt");
    write(marker, "preserve\n");
    assert.throws(() => startOnboarding({ instanceRoot: target.instanceRoot, draftPath: target.draftPath }), /INSTANCE_ROOT_OCCUPIED/);
    assert.equal(readFileSync(marker, "utf8"), "preserve\n");
    assert.equal(existsSync(target.draftPath), false);
  } finally { target.cleanup(); }
});

test("J. interrupted onboarding resumes from the next missing block", () => {
  const target = fixture();
  try {
    startOnboarding({ instanceRoot: target.instanceRoot, draftPath: target.draftPath, now: () => NOW });
    answerOnboardingBlock({ draftPath: target.draftPath, block: "identity", answers: {
      display_name: "Alex Example", role_expertise: "Fictional educator", content_basis: "Synthetic examples",
    }, now: () => NOW });
    const resumed = startOnboarding({ mode: "RESUME", draftPath: target.draftPath });
    assert.equal(resumed.current_block, "purpose");
    assert.deepEqual(resumed.completed_blocks, ["identity"]);
    assert.deepEqual(getOnboardingStatus({ draftPath: target.draftPath }), resumed);
  } finally { target.cleanup(); }
});

test("K. refresh with identical answers is idempotent", () => {
  const target = createConfigured();
  try {
    const onboardingPath = join(target.instanceRoot, "profile", "ONBOARDING.json");
    const before = hash(onboardingPath);
    const refreshDraft = join(target.parent, "refresh.json");
    startOnboarding({ mode: "REFRESH", instanceRoot: target.instanceRoot, draftPath: refreshDraft, now: () => "2032-01-01T00:00:00.000Z" });
    assert.deepEqual(previewOnboarding({ draftPath: refreshDraft }).changes, []);
    const result = confirmOnboarding({ draftPath: refreshDraft, configPath: target.configPath, confirmation: "APPLY REFRESH", now: () => "2032-01-01T00:00:00.000Z" });
    assert.equal(result.status, "NO_CHANGE");
    assert.deepEqual(result.changed_files, []);
    assert.equal(hash(onboardingPath), before);
  } finally { target.cleanup(); }
});

test("L. channel refresh preserves content, outputs, Decisions, Learnings, and history", () => {
  const target = createConfigured(["linkedin"]);
  try {
    const statePath = join(target.instanceRoot, "state", "pieces.json");
    const decisionsPath = join(target.instanceRoot, "docs", "DECISIONS.md");
    const learningPath = join(target.instanceRoot, "docs", "LEARNING-LEDGER.md");
    const historyPath = join(target.instanceRoot, "docs", "STATE.md");
    write(join(target.instanceRoot, "outputs", "OUTPUT-900", "OUTPUT.md"), "# Synthetic historical output\n");
    write(statePath, `${JSON.stringify({
      schema_version: 1,
      updated_at: NOW,
      pieces: [{ id: "CONTENT-900" }],
      outputs: [{ output_id: "OUTPUT-900", content_id: "CONTENT-900", channel: "linkedin", format: "post", origin: "DIRECT", source_output_id: null, artifact: "outputs/OUTPUT-900/OUTPUT.md" }],
    }, null, 2)}\n`);
    write(decisionsPath, "# Decisions\n\n## DEC-900 — Fictional\n");
    write(learningPath, "# Learnings\n\n## LRN-900 — Fictional\n");
    const protectedHashes = [statePath, decisionsPath, learningPath, historyPath].map(hash);
    const refreshDraft = join(target.parent, "refresh.json");
    startOnboarding({ mode: "REFRESH", instanceRoot: target.instanceRoot, draftPath: refreshDraft, now: () => NOW });
    answerOnboardingBlock({ draftPath: refreshDraft, block: "channels", answers: { active_channels: ["x"] }, now: () => "2032-01-01T00:00:00.000Z" });
    assert.deepEqual(previewOnboarding({ draftPath: refreshDraft }).changes, [{
      block: "channels",
      before: { active_channels: ["linkedin"] },
      after: { active_channels: ["x"] },
    }]);
    const result = confirmOnboarding({ draftPath: refreshDraft, configPath: target.configPath, confirmation: "APPLY REFRESH", now: () => "2032-01-01T00:00:00.000Z" });
    assert.equal(result.status, "REFRESHED");
    assert.deepEqual([statePath, decisionsPath, learningPath, historyPath].map(hash), protectedHashes);
    const channels = JSON.parse(readFileSync(join(target.instanceRoot, "channel", "ACTIVE-CHANNELS.json"), "utf8"));
    assert.deepEqual(channels.active_channels, ["x"]);
    const state = JSON.parse(readFileSync(statePath, "utf8"));
    assert.equal(state.pieces.length, 1);
    assert.equal(state.outputs.length, 1);
    assert.equal(validateRepository({ explicitInstanceRoot: target.instanceRoot, env: {} }).instance.status, "PASS");
  } finally { target.cleanup(); }
});

test("M. configured onboarding removes dashboard setup-required state", () => {
  const target = createConfigured();
  try {
    const view = buildDashboardView({ explicitInstanceRoot: target.instanceRoot, env: {} });
    assert.equal(view.setupRequired, false);
    assert.deepEqual(view.identity, { displayName: "Alex Example" });
    assert.deepEqual(view.counts, { content: 0, outputs: 0, audits: 0, learnings: 0, decisions: 0, edits: 0 });
  } finally { target.cleanup(); }
});

test("N. validator reports CORE PASS and configured INSTANCE PASS", () => {
  const target = createConfigured(["youtube", "linkedin"]);
  try {
    const result = validateRepository({ configPath: target.configPath, env: {} });
    assert.equal(result.core.status, "PASS");
    assert.equal(result.instance.status, "PASS");
    assert.equal(result.operational.status, "READY_FOR_OPERATIONS");
    assert.equal(result.optional_modules.av.status, "OPTIONAL_NOT_BUNDLED");
    assert.equal(result.overall, "PASS");
  } finally { target.cleanup(); }
});
