import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { CORE_ROOT, resolveInstance } from "./instance-resolver.mjs";
import { scanDistribution } from "./privacy-scan.mjs";
import { validateRepository } from "./validate-content-os.mjs";

function write(path, value) {
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, value);
}

function syntheticWorkspace({ populated = false } = {}) {
  const parent = mkdtempSync(join(tmpdir(), "content-os-fictional-"));
  const root = join(parent, "workspace");
  cpSync(join(CORE_ROOT, "templates", "instance"), root, { recursive: true });
  write(join(root, "profile", "PROFILE.md"), "# Fictional profile\n\nSTATUS: CONFIGURED\n\nThis is a synthetic test workspace.\n");
  const activeChannels = ["x"];
  const answers = {
    identity: { display_name: "Alex Example", role_expertise: "Fictional systems educator", content_basis: "Synthetic workflow examples" },
    purpose: { goal: "Explain fictional systems", audience: "Fictional small teams", territories: ["synthetic operations"], language: "English" },
    channels: { active_channels: activeChannels },
    voice: { sources: [], deferred: true, observed_from_samples: [], user_instruction: "Clear and concise" },
    privacy: { sync_status: "UNKNOWN", private_media_policy: "OUTSIDE_CORE", external_processing: "NOT_AUTHORIZED", external_actions_default: "HUMAN_APPROVAL_REQUIRED", publication_approval: "HUMAN_APPROVAL_REQUIRED" },
    tools: { current_runtime: { name: "test runtime", status: "AVAILABLE" }, audiovisual: { interest: false, status: "NOT_CONFIGURED" }, local_transcription: { status: "UNKNOWN" }, other_tools: [] },
  };
  write(join(root, "profile", "ONBOARDING.json"), `${JSON.stringify({ schema_version: 1, status: "configured", configured_at: "2030-01-01T00:00:00.000Z", updated_at: "2030-01-01T00:00:00.000Z", answers }, null, 2)}\n`);
  write(join(root, "profile", "VOICE.md"), "# Fictional voice\n");
  write(join(root, "profile", "VOICE-SOURCES.json"), `${JSON.stringify({ schema_version: 1, sources: [] }, null, 2)}\n`);
  write(join(root, "channel", "CONSTITUTION.md"), "# Fictional constitution\n\nSynthetic test policy.\n");
  write(join(root, "channel", "ACTIVE-CHANNELS.json"), `${JSON.stringify({ schema_version: 1, status: "CONFIGURED", available_channels: ["youtube", "linkedin", "x"], active_channels: activeChannels }, null, 2)}\n`);
  const state = populated ? JSON.parse(readFileSync(join(CORE_ROOT, "examples", "synthetic", "content-output.json"), "utf8")) : { schema_version: 1, updated_at: "2030-01-01", pieces: [], outputs: [] };
  delete state.synthetic;
  write(join(root, "state", "pieces.json"), `${JSON.stringify(state, null, 2)}\n`);
  if (populated) write(join(root, "outputs", "OUTPUT-900", "OUTPUT.md"), "# SYNTHETIC / FICTIONAL OUTPUT\n");
  return { root, cleanup: () => rmSync(parent, { recursive: true, force: true }) };
}

test("clean core is valid and missing instance is an intentional setup state", () => {
  const result = validateRepository({ coreRoot: CORE_ROOT, env: {} });
  assert.equal(result.core.status, "PASS");
  assert.equal(result.instance.status, "NOT_CONFIGURED");
  assert.equal(result.operational.status, "NOT_READY");
  assert.equal(result.overall, "PASS_WITH_SETUP_REQUIRED");
});

test("resolver never treats the product core as a workspace", () => {
  assert.throws(() => resolveInstance({ coreRoot: CORE_ROOT, explicitRoot: CORE_ROOT, env: {} }), /INSTANCE_INSIDE_CORE/);
});

test("configured empty fictional workspace is valid", () => {
  const fixture = syntheticWorkspace();
  try {
    const result = validateRepository({ coreRoot: CORE_ROOT, env: {}, explicitInstanceRoot: fixture.root });
    assert.equal(result.overall, "PASS");
    assert.equal(result.instance.status, "PASS");
    assert.deepEqual(result.instance.counts, { content: 0, outputs: 0, labs: 0, research: 0, audits: 0, edits: 0, decisions: 0, learnings: 0 });
  } finally { fixture.cleanup(); }
});

test("configured fictional workspace supports one CONTENT and one OUTPUT", () => {
  const fixture = syntheticWorkspace({ populated: true });
  try {
    const result = validateRepository({ coreRoot: CORE_ROOT, env: {}, explicitInstanceRoot: fixture.root });
    assert.equal(result.overall, "PASS");
    assert.equal(result.instance.counts.content, 1);
    assert.equal(result.instance.counts.outputs, 1);
  } finally { fixture.cleanup(); }
});

test("distribution privacy scan passes", () => {
  const result = scanDistribution(CORE_ROOT);
  assert.deepEqual(result.findings, []);
  assert.equal(result.status, "PASS");
});
