import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { CORE_ROOT } from "../../scripts/instance-resolver.mjs";
import { validateRepository } from "../../scripts/validate-content-os.mjs";

function markdownEntries(path, pattern) {
  if (!existsSync(path)) return [];
  const text = readFileSync(path, "utf8");
  return [...text.matchAll(pattern)].map((match) => ({ id: match[1], title: match[2] }));
}

function listMarkdown(root, pattern = /\.md$/) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && pattern.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

function listEdits(root) {
  if (!existsSync(root)) return [];
  const output = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const target = join(directory, entry.name);
      if (entry.isDirectory()) visit(target);
      else if (entry.isFile() && /^EDIT-\d+\.md$/.test(entry.name)) output.push(entry.name.replace(/\.md$/, ""));
    }
  };
  visit(root);
  return output.sort();
}

export function buildDashboardView({ coreRoot = CORE_ROOT, env = process.env, explicitInstanceRoot, configPath } = {}) {
  const validation = validateRepository({ coreRoot, env, explicitInstanceRoot, configPath });
  const setupRequired = validation.instance.status === "NOT_CONFIGURED";
  const base = {
    schemaVersion: "content-os.dashboard.runtime.v2",
    generatedAt: new Date().toISOString(),
    setupRequired,
    message: setupRequired ? "No content workspace configured. Run onboarding to create/connect a workspace." : null,
    system: {
      core: validation.core.status,
      instance: validation.instance.status,
      operational: validation.operational.status,
      av: validation.optional_modules.av.status,
      readOnly: true,
    },
    counts: { content: 0, outputs: 0, audits: 0, learnings: 0, decisions: 0, edits: 0 },
    identity: null,
    pieces: [],
    outputs: [],
    audits: [],
    decisions: [],
    learnings: [],
    edits: [],
  };

  if (validation.instance.status !== "PASS") return base;
  const root = validation.instance.root;
  const state = JSON.parse(readFileSync(join(root, "state", "pieces.json"), "utf8"));
  const onboarding = JSON.parse(readFileSync(join(root, "profile", "ONBOARDING.json"), "utf8"));
  const decisions = markdownEntries(join(root, "docs", "DECISIONS.md"), /^## (DEC-\d{3,}) — (.+)$/gm);
  const learnings = markdownEntries(join(root, "docs", "LEARNING-LEDGER.md"), /^## (LRN-\d{3,}) — (.+)$/gm);
  const audits = listMarkdown(join(root, "audits"), /^AUDIT-.+\.md$/);
  const edits = listEdits(join(root, "postproduction"));
  return {
    ...base,
    identity: { displayName: onboarding.answers.identity.display_name },
    counts: { content: state.pieces.length, outputs: state.outputs.length, audits: audits.length, learnings: learnings.length, decisions: decisions.length, edits: edits.length },
    pieces: state.pieces,
    outputs: state.outputs,
    audits,
    decisions,
    learnings,
    edits,
  };
}
