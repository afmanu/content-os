import { lstatSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { CORE_ROOT } from "./instance-resolver.mjs";

const TEXT_EXTENSIONS = new Set(["", ".md", ".txt", ".json", ".mjs", ".js", ".cjs", ".yaml", ".yml", ".html", ".css"]);
const FORBIDDEN_ROOTS = new Set(["state", "ideas", "lab", "research", "radar", "audits", "outputs", "postproduction", "media", "projects"]);
const FORBIDDEN_LOCAL_FILES = new Set([".content-os.local.json", ".content-os.onboard.json"]);
const PATH_NAMES = /(?:^|\/)(?:transcripts?|recordings?|renders?|private-projects?|audits\/AUDIT-|postproduction\/EDIT-)/i;
const RULES = [
  ["source personal identity", /\b(?:Manuel|Manu)\b|Álvarez/giu],
  ["personal email", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu],
  ["Windows user path", /[A-Za-z]:[\\/](?:Users|Documents and Settings)[\\/]/giu],
  ["cloud-synced private path", /\bOneDrive\b|Dropbox[\\/]|Google Drive[\\/]/giu],
  ["known real CONTENT", /\bCONTENT-(?:008|009|010|011)\b/gu],
  ["known real LAB", /\bLAB-(?:001|002|003|004|005|006|007)\b/gu],
  ["known real audit", /\bAUDIT-2026-10-07-(?:001|002)\b/gu],
  ["known private tool case", /\bGrok(?: Bot| Bots)?\b/giu],
  ["credential assignment", /\b(?:api[_-]?key|access[_-]?token|client[_-]?secret|password|authorization)\s*[:=]\s*[^\s<]+/giu],
  ["credential-shaped token", /\b(?:gh[opsu]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,}|AKIA[A-Z0-9]{16})\b/gu],
  ["authenticated URL", /https?:\/\/(?:[^\s\/:@]+:[^\s\/@]+@|[^\s?#]+[^\s#]*[?&](?:token|access_token|api_key|auth)=[^\s&#]+)/giu],
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/gu],
  ["GPS or device metadata", /\b(?:GPSLatitude|GPSLongitude|device[_ -]?serial|com\.apple\.quicktime\.location)\b/giu],
];

function walk(root) {
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, "en"))) {
      if (directory === root && entry.name === ".git") continue;
      const target = join(directory, entry.name);
      const stats = lstatSync(target);
      if (stats.isSymbolicLink()) {
        files.push({ path: target, symlink: true });
      } else if (stats.isDirectory()) visit(target);
      else if (stats.isFile()) files.push({ path: target, symlink: false });
    }
  };
  visit(root);
  return files;
}

export function scanDistribution(root = CORE_ROOT) {
  const coreRoot = resolve(root);
  const findings = [];
  const rootEntries = readdirSync(coreRoot, { withFileTypes: true });
  for (const entry of rootEntries) if (FORBIDDEN_ROOTS.has(entry.name)) findings.push({ code: "FORBIDDEN_ROOT", path: entry.name, detail: "Live instance or history root in product core." });
  for (const entry of rootEntries) if (FORBIDDEN_LOCAL_FILES.has(entry.name)) findings.push({ code: "LOCAL_CONFIG", path: entry.name, detail: "Ignored runtime-local selector or checkpoint is present in the release filesystem." });

  const files = walk(coreRoot);
  for (const file of files) {
    const rel = relative(coreRoot, file.path).replace(/\\/g, "/");
    if (file.symlink) {
      findings.push({ code: "SYMLINK", path: rel, detail: "Distribution cannot contain symbolic links." });
      continue;
    }
    const isMarkedSyntheticFixture = rel.startsWith("tools/av/tests/fixtures/")
      && TEXT_EXTENSIONS.has(extname(file.path).toLowerCase())
      && /"synthetic"\s*:\s*true/.test(readFileSync(file.path, "utf8"));
    if (PATH_NAMES.test(rel) && !rel.startsWith("examples/synthetic/") && !isMarkedSyntheticFixture) findings.push({ code: "PRIVATE_ARTIFACT_PATH", path: rel, detail: "Private media/evidence path pattern." });
    if (!TEXT_EXTENSIONS.has(extname(file.path).toLowerCase())) findings.push({ code: "BINARY_OR_UNKNOWN", path: rel, detail: "Binary or unreviewed file type." });
    else if (rel !== "scripts/privacy-scan.mjs") {
      const text = readFileSync(file.path, "utf8");
      for (const [label, rule] of RULES) {
        rule.lastIndex = 0;
        if (rule.test(text)) findings.push({ code: "DENYLIST_MATCH", path: rel, detail: label });
      }
    }
  }

  return {
    schema_version: "content-os.privacy-scan.v1",
    status: findings.length ? "FAIL" : "PASS",
    files_scanned: files.length,
    structural_review: {
      git_metadata_present: rootEntries.some((entry) => entry.name === ".git"),
      live_instance_roots_present: rootEntries.filter((entry) => FORBIDDEN_ROOTS.has(entry.name)).map((entry) => entry.name),
    },
    findings,
  };
}

export function main() {
  const result = scanDistribution();
  if (process.argv.includes("--json")) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  else process.stdout.write(`PRIVACY: ${result.status}\nFILES: ${result.files_scanned}\nFINDINGS: ${result.findings.length}\n`);
  return result.status === "PASS" ? 0 : 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) process.exitCode = main();
