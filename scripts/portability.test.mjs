import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { CORE_ROOT, resolveInstance } from "./instance-resolver.mjs";

const workflowNames = new Set(readdirSync(join(CORE_ROOT, "workflows")).filter((name) => name.endsWith(".md")));

test("every skill resolves one existing canonical workflow and the instance resolver", () => {
  const skillRoot = join(CORE_ROOT, ".agents", "skills");
  for (const entry of readdirSync(skillRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skill = readFileSync(join(skillRoot, entry.name, "SKILL.md"), "utf8");
    const match = skill.match(/\[workflows\/([^\]]+\.md)\]/);
    assert.ok(match, `${entry.name} needs a canonical workflow link`);
    assert.ok(workflowNames.has(match[1]), `${entry.name} points to missing ${match[1]}`);
    assert.match(skill, /node scripts\/resolve-instance\.mjs --json/);
    assert.match(skill, /INSTANCE_ROOT/);
  }
});

test("canonical workflows declare product and instance root routing", () => {
  for (const name of workflowNames) {
    const workflow = readFileSync(join(CORE_ROOT, "workflows", name), "utf8");
    assert.match(workflow, /> ROOT CONTRACT:/, `${name} lacks the root contract`);
    assert.match(workflow, /SETUP REQUIRED/, `${name} lacks setup behavior`);
  }
});

test("core-readable operations do not invent a workspace", () => {
  const before = resolveInstance({ coreRoot: CORE_ROOT, env: {} });
  assert.equal(before.status, "NOT_CONFIGURED");
  for (const name of ["AUDIT.md", "LEVEL-UP.md", "LINK.md"]) {
    assert.ok(readFileSync(join(CORE_ROOT, "workflows", name), "utf8").length > 0);
  }
  const after = resolveInstance({ coreRoot: CORE_ROOT, env: {} });
  assert.deepEqual(after, before);
  assert.equal(existsSync(join(CORE_ROOT, "state")), false);
});
