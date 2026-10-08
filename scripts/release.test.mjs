import assert from "node:assert/strict";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { CORE_ROOT } from "./instance-resolver.mjs";
import { scanDistribution } from "./privacy-scan.mjs";
import { validateRepository } from "./validate-content-os.mjs";

const NOW = "2032-03-04T05:06:07.000Z";
const LIVE_ROOTS = new Set(["state", "ideas", "lab", "research", "radar", "audits", "outputs", "postproduction"]);

function write(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, value);
}

function copyCandidate(source, target) {
  cpSync(source, target, {
    recursive: true,
    filter(path) {
      const rel = relative(source, path);
      if (!rel) return true;
      const first = rel.split(/[\\/]/)[0];
      return first !== ".git"
        && !LIVE_ROOTS.has(first)
        && first !== ".content-os.local.json"
        && first !== ".content-os.onboard.json";
    },
  });
}

function runGit(root, ...args) {
  const result = spawnSync("git", ["-C", root, "-c", "user.name=Synthetic Fixture", "-c", "user.email=synthetic.invalid", "-c", "commit.gpgsign=false", ...args], { encoding: "utf8", windowsHide: true });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

for (const fixture of [
  { name: "no .git", git: false, remotes: [] },
  { name: "local Git without remotes", git: true, remotes: [] },
  { name: "normal origin", git: true, remotes: ["origin"] },
  { name: "origin and upstream", git: true, remotes: ["origin", "upstream"] },
]) {
  test(`validator accepts ${fixture.name} without changing instance or operational semantics`, () => {
    const parent = mkdtempSync(join(tmpdir(), "content-os-git-fictional-"));
    const candidateRoot = join(parent, "content-os");
    try {
      copyCandidate(CORE_ROOT, candidateRoot);
      const expected = validateRepository({ coreRoot: candidateRoot, env: {} });
      if (fixture.git) {
        runGit(candidateRoot, "init");
        runGit(candidateRoot, "commit", "--allow-empty", "-m", "Synthetic initial commit");
        runGit(candidateRoot, "commit", "--allow-empty", "-m", "Synthetic development commit");
        for (const remote of fixture.remotes) runGit(candidateRoot, "remote", "add", remote, `https://example.invalid/${remote}/content-os.git`);
        assert.equal(runGit(candidateRoot, "rev-list", "--count", "--all"), "2");
        assert.deepEqual(runGit(candidateRoot, "remote").split(/\r?\n/).filter(Boolean), fixture.remotes);
      }
      const result = validateRepository({ coreRoot: candidateRoot, env: {} });
      assert.equal(result.core.status, "PASS");
      assert.ok(result.core.checks.every((check) => check.status === "PASS"));
      assert.deepEqual(result, expected);
    } finally {
      rmSync(parent, { recursive: true, force: true });
    }
    assert.equal(existsSync(parent), false);
  });
}

test("normal remotes do not hide existing structure or privacy defects", () => {
  const parent = mkdtempSync(join(tmpdir(), "content-os-git-defects-fictional-"));
  const candidateRoot = join(parent, "content-os");
  try {
    copyCandidate(CORE_ROOT, candidateRoot);
    runGit(candidateRoot, "init");
    runGit(candidateRoot, "remote", "add", "origin", "https://example.invalid/content-os.git");
    write(join(candidateRoot, "state", "pieces.json"), "{}\n");
    write(join(candidateRoot, "synthetic-sensitive.txt"), `${["api", "key"].join("_")}: fictional-placeholder\n`);
    const result = validateRepository({ coreRoot: candidateRoot, env: {} });
    assert.equal(result.core.status, "FAIL");
    assert.equal(result.core.checks.find((check) => check.id === "core.no_live_instance").status, "FAIL");
    const privacy = scanDistribution(candidateRoot);
    assert.equal(privacy.status, "FAIL");
    assert.ok(privacy.findings.some((finding) => finding.code === "FORBIDDEN_ROOT" && finding.path === "state"));
    assert.ok(privacy.findings.some((finding) => finding.code === "DENYLIST_MATCH" && finding.path === "synthetic-sensitive.txt"));
  } finally {
    rmSync(parent, { recursive: true, force: true });
  }
  assert.equal(existsSync(parent), false);
});

function runtimeFiles(root) {
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const target = join(directory, entry.name);
      if (entry.isDirectory()) visit(target);
      else if (entry.isFile() && /\.(?:mjs|js)$/.test(entry.name) && !entry.name.endsWith(".test.mjs")) files.push(target);
    }
  };
  for (const directory of [join(root, "scripts"), join(root, "dashboard", "src"), join(root, "tools", "av", "adapters")]) visit(directory);
  return files;
}

function assertLocalRuntime(root) {
  for (const file of runtimeFiles(root)) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/\bfrom\s+["']([^"']+)["']/g)) {
      assert.ok(match[1].startsWith("node:") || match[1].startsWith("."), `${relative(root, file)} imports external package ${match[1]}`);
    }
    assert.doesNotMatch(text, /\b(?:node:https|node:net|node:tls|node:dns)\b/, `${relative(root, file)} has an external-network runtime import`);
    for (const url of text.matchAll(/https?:\/\/[^\s"'`)]+/g)) {
      assert.match(url[0], /^http:\/\/(?:127\.0\.0\.1|localhost)/, `${relative(root, file)} contains a non-loopback runtime URL`);
    }
  }
}

async function readHttpView(server) {
  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/api/view`);
  assert.equal(response.status, 200);
  return response.json();
}

async function verifyReleaseCandidate(withOrigin) {
  const parent = mkdtempSync(join(tmpdir(), "content-os-release-fictional-"));
  const candidateRoot = join(parent, "content-os");
  const instanceRoot = join(parent, "alex-workspace");
  const draftPath = join(parent, "onboard.json");
  const configPath = join(candidateRoot, ".content-os.local.json");
  let server;
  try {
    if (withOrigin) {
      const seedRoot = join(parent, "synthetic-source");
      copyCandidate(CORE_ROOT, seedRoot);
      runGit(seedRoot, "init");
      runGit(seedRoot, "add", "--all");
      runGit(seedRoot, "commit", "-m", "Synthetic initial commit");
      runGit(seedRoot, "commit", "--allow-empty", "-m", "Synthetic development commit");
      runGit(parent, "clone", "--no-hardlinks", "--", seedRoot, candidateRoot);
      runGit(candidateRoot, "remote", "set-url", "origin", "https://example.invalid/content-os.git");
      assert.equal(runGit(candidateRoot, "remote", "get-url", "origin"), "https://example.invalid/content-os.git");
      assert.equal(runGit(candidateRoot, "rev-list", "--count", "--all"), "2");
    } else copyCandidate(CORE_ROOT, candidateRoot);
    assert.equal(existsSync(join(candidateRoot, ".git")), withOrigin);
    assertLocalRuntime(candidateRoot);

    const child = spawnSync(process.execPath, [join(candidateRoot, "scripts", "validate-content-os.mjs")], {
      cwd: candidateRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        CONTENT_OS_INSTANCE_ROOT: "",
        HTTP_PROXY: "http://127.0.0.1:9",
        HTTPS_PROXY: "http://127.0.0.1:9",
        ALL_PROXY: "http://127.0.0.1:9",
        NO_PROXY: "127.0.0.1,localhost",
      },
    });
    assert.equal(child.status, 0, child.stderr);
    assert.match(child.stdout, /CORE: PASS/);
    assert.match(child.stdout, /INSTANCE: NOT_CONFIGURED/);

    const onboard = await import(pathToFileURL(join(candidateRoot, "scripts", "content-onboard.mjs")).href);
    const validationModule = await import(pathToFileURL(join(candidateRoot, "scripts", "validate-content-os.mjs")).href);
    const privacyModule = await import(pathToFileURL(join(candidateRoot, "scripts", "privacy-scan.mjs")).href);
    const dashboardModule = await import(pathToFileURL(join(candidateRoot, "dashboard", "src", "server.mjs")).href);

    const privacy = privacyModule.scanDistribution(candidateRoot);
    assert.equal(privacy.status, "PASS");
    const pre = validationModule.validateRepository({ coreRoot: candidateRoot, env: {}, configPath });
    assert.equal(pre.core.status, "PASS");
    assert.equal(pre.instance.status, "NOT_CONFIGURED");
    assert.equal(pre.operational.status, "NOT_READY");

    server = dashboardModule.createDashboardServer({ viewOptions: { coreRoot: candidateRoot, env: {}, configPath } });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    assert.equal((await readHttpView(server)).setupRequired, true);

    const now = () => NOW;
    onboard.startOnboarding({ coreRoot: candidateRoot, instanceRoot, draftPath, now });
    const answer = (block, answers) => onboard.answerOnboardingBlock({ draftPath, block, answers, now });
    answer("identity", { display_name: "Alex Example", role_expertise: "Fictional documentation educator", content_basis: "Synthetic operational knowledge" });
    answer("purpose", { goal: "Help fictional teams document work", audience: "Fictional small teams", territories: ["synthetic documentation"], language: "English" });
    answer("channels", { active_channels: ["x"] });
    answer("voice", { sources: [], deferred: true, observed_from_samples: [], user_instruction: "Use concrete fictional examples" });
    answer("privacy", {});
    answer("tools", { current_runtime: { name: "local test runtime", status: "AVAILABLE" }, audiovisual: { interest: false, status: "NOT_CONFIGURED" }, local_transcription: { status: "UNKNOWN" }, other_tools: [] });
    assert.equal(onboard.previewOnboarding({ draftPath }).confirmation_required, "CREATE INSTANCE");
    assert.equal(onboard.confirmOnboarding({ coreRoot: candidateRoot, draftPath, configPath, confirmation: "CREATE INSTANCE", now }).status, "CREATED");

    const empty = validationModule.validateRepository({ coreRoot: candidateRoot, env: {}, configPath });
    assert.equal(empty.core.status, "PASS");
    assert.equal(empty.instance.status, "PASS");
    assert.equal(empty.operational.status, "READY_FOR_OPERATIONS");
    assert.equal(empty.optional_modules.av.status, "OPTIONAL_NOT_BUNDLED");
    const emptyView = await readHttpView(server);
    assert.equal(emptyView.setupRequired, false);
    assert.deepEqual(emptyView.counts, { content: 0, outputs: 0, audits: 0, learnings: 0, decisions: 0, edits: 0 });

    write(join(instanceRoot, "outputs", "OUTPUT-900", "OUTPUT.md"), "# SYNTHETIC / FICTIONAL OUTPUT\n\nThis is not a real publication.\n");
    write(join(instanceRoot, "state", "pieces.json"), `${JSON.stringify({
      schema_version: 1,
      updated_at: NOW,
      pieces: [{
        id: "CONTENT-900",
        type: "content",
        editorial_question: "How can a fictional team document a handoff?",
        working_title: "Synthetic handoff",
        format: null,
        origins: [],
        stage: "candidate",
        status: "synthetic_fixture",
        next_action: "A human reviews the fictional example.",
        blockers: [],
        artifacts: {},
        state_evidence: [],
        approvals: { recording: false, publication: false },
      }],
      outputs: [{
        output_id: "OUTPUT-900",
        content_id: "CONTENT-900",
        channel: "x",
        origin: "DIRECT",
        source_output_id: null,
        angle: "A fictional compact explanation",
        format: "short_post",
        promise: "Explain a fictional handoff without claiming a real result.",
        status: "synthetic_fixture",
        artifact: "outputs/OUTPUT-900/OUTPUT.md",
        review_status: null,
      }],
    }, null, 2)}\n`);

    const populated = validationModule.validateRepository({ coreRoot: candidateRoot, env: {}, configPath });
    assert.equal(populated.core.status, "PASS");
    assert.equal(populated.instance.status, "PASS");
    assert.equal(populated.instance.counts.content, 1);
    assert.equal(populated.instance.counts.outputs, 1);
    const populatedView = await readHttpView(server);
    assert.equal(populatedView.counts.content, 1);
    assert.equal(populatedView.counts.outputs, 1);

    const skillRoot = join(candidateRoot, ".agents", "skills");
    const skills = readdirSync(skillRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
    assert.equal(skills.length, 16);
    for (const skill of skills) {
      const text = readFileSync(join(skillRoot, skill.name, "SKILL.md"), "utf8");
      const match = text.match(/\[workflows\/([^\]]+\.md)\]/);
      assert.ok(match && existsSync(join(candidateRoot, "workflows", match[1])), `${skill.name} workflow is not portable`);
    }
  } finally {
    if (server?.listening) await new Promise((resolve) => server.close(resolve));
    rmSync(parent, { recursive: true, force: true });
  }
  assert.equal(existsSync(parent), false);
}

test("filesystem release candidate works in three validator/dashboard states", () => verifyReleaseCandidate(false));
test("local synthetic clone with origin works in three validator/dashboard states", () => verifyReleaseCandidate(true));
