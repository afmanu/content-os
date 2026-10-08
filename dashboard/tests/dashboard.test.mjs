import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { CORE_ROOT } from "../../scripts/instance-resolver.mjs";
import { buildDashboardView } from "../src/view.mjs";
import { createDashboardServer } from "../src/server.mjs";

function write(path, value) {
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, value);
}

function emptyWorkspace() {
  const parent = mkdtempSync(join(tmpdir(), "content-os-dashboard-fictional-"));
  const root = join(parent, "workspace");
  cpSync(join(CORE_ROOT, "templates", "instance"), root, { recursive: true });
  write(join(root, "profile", "PROFILE.md"), "# Fictional profile\nSTATUS: CONFIGURED\n");
  const answers = {
    identity: { display_name: "Alex Example", role_expertise: "Fictional educator", content_basis: "Synthetic examples" },
    purpose: { goal: "Test the dashboard", audience: "Fictional teams", territories: ["synthetic systems"], language: "English" },
    channels: { active_channels: ["linkedin"] },
    voice: { sources: [], deferred: true, observed_from_samples: [], user_instruction: "SKIP" },
    privacy: { sync_status: "UNKNOWN", private_media_policy: "OUTSIDE_CORE", external_processing: "NOT_AUTHORIZED", external_actions_default: "HUMAN_APPROVAL_REQUIRED", publication_approval: "HUMAN_APPROVAL_REQUIRED" },
    tools: { current_runtime: { name: "test runtime", status: "AVAILABLE" }, audiovisual: { interest: false, status: "NOT_CONFIGURED" }, local_transcription: { status: "UNKNOWN" }, other_tools: [] },
  };
  write(join(root, "profile", "ONBOARDING.json"), `${JSON.stringify({ schema_version: 1, status: "configured", configured_at: "2030-01-01T00:00:00.000Z", updated_at: "2030-01-01T00:00:00.000Z", answers }, null, 2)}\n`);
  write(join(root, "profile", "VOICE.md"), "# Fictional voice\n");
  write(join(root, "profile", "VOICE-SOURCES.json"), `${JSON.stringify({ schema_version: 1, sources: [] }, null, 2)}\n`);
  write(join(root, "channel", "CONSTITUTION.md"), "# Fictional constitution\n");
  write(join(root, "channel", "ACTIVE-CHANNELS.json"), `${JSON.stringify({ schema_version: 1, status: "CONFIGURED", available_channels: ["youtube", "linkedin", "x"], active_channels: ["linkedin"] }, null, 2)}\n`);
  write(join(root, "state", "pieces.json"), `${JSON.stringify({ schema_version: 1, updated_at: "2030-01-01", pieces: [], outputs: [] }, null, 2)}\n`);
  return { root, cleanup: () => rmSync(parent, { recursive: true, force: true }) };
}

test("clean dashboard shows setup required and no demo data", () => {
  const view = buildDashboardView({ coreRoot: CORE_ROOT, env: {} });
  assert.equal(view.setupRequired, true);
  assert.equal(view.system.core, "PASS");
  assert.equal(view.system.instance, "NOT_CONFIGURED");
  assert.deepEqual(view.counts, { content: 0, outputs: 0, audits: 0, learnings: 0, decisions: 0, edits: 0 });
  assert.deepEqual(view.pieces, []);
});

test("dashboard reads a configured empty external workspace", () => {
  const fixture = emptyWorkspace();
  try {
    const view = buildDashboardView({ coreRoot: CORE_ROOT, env: {}, explicitInstanceRoot: fixture.root });
    assert.equal(view.setupRequired, false);
    assert.equal(view.system.instance, "PASS");
    assert.equal(view.counts.content, 0);
    assert.equal(view.counts.learnings, 0);
    assert.deepEqual(view.identity, { displayName: "Alex Example" });
  } finally { fixture.cleanup(); }
});

test("HTTP surface is read-only", async () => {
  const server = createDashboardServer({ viewOptions: { coreRoot: CORE_ROOT, env: {} } });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const address = server.address();
    const get = await fetch(`http://127.0.0.1:${address.port}/api/view`);
    assert.equal(get.status, 200);
    assert.equal((await get.json()).setupRequired, true);
    const post = await fetch(`http://127.0.0.1:${address.port}/api/view`, { method: "POST" });
    assert.equal(post.status, 405);
  } finally { await new Promise((resolve) => server.close(resolve)); }
});
