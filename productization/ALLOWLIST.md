# Distribution allowlist

SOURCE SNAPSHOT: reviewed internal export; private fingerprint not distributed

The staging tree is built from an empty directory. Only the patterns below may enter it. An unclassified path is rejected.

## CORE

- `.gitignore`, `README.md`, `AGENTS.md`, `LICENSE`, `VERSION`
- `workflows/*.md`
- `.agents/skills/*/SKILL.md`
- `.agents/skills/*/agents/openai.yaml`
- `channel/*.md`
- `scripts/*.mjs`
- `dashboard/package.json`
- `dashboard/src/**`
- `dashboard/tests/**`
- `docs/PRODUCT-DECISIONS.md`
- `docs/PRODUCT-BOUNDARY.md`
- `docs/NETWORK-BOUNDARY.md`
- `config/content-os.local.example.json`
- `schemas/*.json`
- `productization/*.md`

P2 adds `workflows/ONBOARD.md`, the `content-onboard` skill and manifest, `scripts/content-onboard.mjs`, its synthetic tests, and `schemas/onboarding.schema.json` through these existing patterns.

## TEMPLATE

- `templates/instance/**`

Templates contain placeholders or empty collections only. They are not an active instance and are never read as live state.

## SYNTHETIC EXAMPLE

- `examples/synthetic/**`
- test fixtures created under operating-system temporary directories
- `tools/av/tests/**` only when explicitly marked synthetic

Synthetic IDs use the reserved `900+` range and are never copied from a real piece.

## THIRD-PARTY REVIEWED

No third-party runtime or vendored implementation is approved for redistribution in P1 or P2. Safe provenance documentation may be included, but unresolved code, packages, binaries, and assets remain excluded.

## Explicit exclusions

- source `.git/**`, source remotes, source tags, source releases, and source-repository history; P4 release-local Git metadata is never copied from the source or treated as distributable content
- real `state/`, `ideas/`, `lab/`, `research/`, `radar/`, `audits/`, `outputs/`, and `postproduction/`
- private Decisions, Learnings, state history, checkpoints, integration plans, incident reports, and operational evidence
- media, transcripts, device/GPS metadata, editable projects, caches, downloads, binaries, logs, and `node_modules`
- credentials, account data, absolute user paths, local sync details, and private configuration
- FFmpeg, browser binaries, HyperFrames, GSAP, native packages, and student-kit implementation pending review
- any file not enumerated by this allowlist

Runtime-local `.content-os.onboard.json` and `.content-os.local.json` are ignored selectors/checkpoints, never distribution artifacts. Voice samples and generated user workspaces remain outside CORE.
