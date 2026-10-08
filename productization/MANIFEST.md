# Productization manifest

## Stage status

- P1 CORE / INSTANCE SEPARATION: `PASS`
- P2 CONTENT-ONBOARD: `PASS — LOCAL STAGING ONLY`
- P3 PUBLIC RELEASE HARDENING: `FILESYSTEM CANDIDATE — PASS`
- P4 PUBLIC RELEASE CANDIDATE: `READY — LOCAL GIT ONLY`
- PUBLIC RELEASE: not published

## Source

- SOURCE SNAPSHOT: reviewed internal export; private fingerprint intentionally omitted
- EXPORT MODE: empty staging plus explicit allowlist
- PRIVATE GIT HISTORY COPIED: no
- RELEASE-LOCAL GIT INITIALIZED: yes
- REMOTE CONFIGURED: no
- PUBLICATION STATUS: not authorized

The development worktree was not used as a bulk-copy source. Mixed contracts entered only through the reviewed allowlist so local work could not enter the distribution.

## Copied from the reviewed source snapshot

- `VERSION`
- 15 `.agents/skills/*/agents/openai.yaml` files, preserving existing invocation policy
- `tools/av/adapters/approve-synthetic-cut.mjs`
- `tools/av/adapters/compose-edl.mjs`
- `tools/av/adapters/normalize-transcript.mjs`
- `tools/av/adapters/timeline.mjs`
- `tools/av/tests/fixtures/synthetic-v1.transcript.json`
- `tools/av/tests/expected/synthetic-v1.json`

Copied files were admitted individually, not through a directory copy.

## Transformed from the reviewed source snapshot

- all 15 `workflows/*.md`: added CORE/INSTANCE routing and setup behavior; removed named-user and real-ID examples
- `channel/EDITORIAL-QUALITY.md`
- `channel/VIDEO-STANDARD.md`
- `channel/YOUTUBE-FORMATS.md`
- `channel/YOUTUBE-NARRATIVE.md`
- `channel/AV-STANDARD.md`
- `tools/av/tests/adapters.test.mjs`: marked synthetic and removed a private-looking fixture path

Transformations preserve product contracts while removing instance identity, real item references, local sync-provider assumptions, and operational provenance.

## Generated product files

- generic `README.md` and `AGENTS.md`
- product constitution and channel registry/profiles
- product decision catalog without user-history IDs
- instance resolver and CLI
- validator with CORE, INSTANCE, OPERATIONAL, and optional-module modes
- privacy scanner and portability/core tests
- dependency-free read-only dashboard and dashboard tests
- public config example and schema
- product/instance boundary, allowlist, license gate, and provenance documentation
- optional AV status, boundary, and notice files
- P2 ONBOARD workflow, explicit-invocation skill, dependency-free onboarding engine, onboarding schema, and A–N synthetic acceptance tests
- P2 validator and dashboard projections for a configured empty instance
- public README, network boundary, license comparison, release manifest, final provenance inventory, and clean-copy release acceptance
- Apache License 2.0, P4 release records, release-local Git boundary validation, and final release documentation

## Generated instance templates

- `templates/instance/profile/PROFILE.md`
- `templates/instance/channel/CONSTITUTION.md`
- `templates/instance/channel/ACTIVE-CHANNELS.json`
- `templates/instance/state/pieces.json`
- empty `STATE`, `DECISIONS`, and `LEARNING-LEDGER`
- empty RADAR sources and watchlist

Templates are not live state. ONBOARD uses their empty ledger/RADAR contracts and generates dates, identity, Constitution, active channels, voice references, privacy choices, and required indexes before connecting a workspace.

## Synthetic fixtures

- `examples/synthetic/content-output.json` uses reserved `CONTENT-900` and `OUTPUT-900`
- AV timing fixtures are explicitly marked synthetic and contain no human media
- tests create temporary fictional workspaces under the operating-system temporary directory and remove them in `finally` blocks
- P2 clean-user acceptance uses only the fictional identity `Alex Example`, creates no CONTENT or OUTPUT, validates the instance and dashboard, and removes the temporary workspace

## Excluded patterns

- source `.git`, tags, remotes, releases, and author metadata
- live state, ideas, labs, research, radar, audits, outputs, and postproduction records
- user Decisions, Learnings, state history, checkpoints, reviews, and operational evidence
- private media, raw transcripts, editable projects, paths, credentials, device/GPS metadata, and accounts
- AV packages, lockfile, vendor implementation, render scripts, browser runtime, FFmpeg, native binaries, downloads, caches, logs, `node_modules`, and work outputs
- every path not included in `productization/ALLOWLIST.md`

## Third-party review state

- CONCEPTUAL INSPIRATION: documented, no code attributed or bundled
- P2 ONBOARDING: derived only from Content OS requirements; no external onboarding code, branded framework, question set, or voice wording incorporated
- STUDENT-KIT IMPLEMENTATION: not included; upstream revision and notice boundaries reviewed for this release scope
- HYPERFRAMES / GSAP / NATIVE PACKAGES / FFMPEG: not bundled
- AV DISTRIBUTION STATUS: contracts, original dependency-free adapters, and synthetic tests included; runtime `OPTIONAL_NOT_BUNDLED`

## License

PRODUCT LICENSE: `Apache-2.0`

The complete official text is in the top-level `LICENSE`. It applies to original Content OS material and does not relicense third-party components. No top-level `NOTICE` is required for the current included scope.

## Optional modules

Audiovisual postproduction is optional. Public contracts, dependency-free transcript/timing/EDL adapters, and synthetic tests are present; render/transcription runtime capability is not bundled. ONBOARD records only interest and observed availability and installs nothing. Its absence does not block validator, dashboard, or text/editorial workflows.

## Instance model

- CORE ROOT: this staging directory
- INSTANCE ROOT: an explicit external private workspace, conventionally `content-os-workspace/`
- SELECTOR: `CONTENT_OS_INSTANCE_ROOT` or ignored `.content-os.local.json`
- MISSING SELECTOR: `NOT_CONFIGURED`
- LIVE STATE STORE: `<INSTANCE_ROOT>/state/pieces.json`
- TEMPLATE FALLBACK: forbidden
- AUTOMATIC DIRECTORY SEARCH: forbidden

## Onboarding model

- EXPLICIT TRIGGER: required; implicit invocation disabled
- MODES: `FIRST_SETUP`, `RESUME`, `REFRESH`
- PRE-CONFIRMATION STATE: ignored `.content-os.onboard.json` only
- CREATION CONFIRMATION: `CREATE INSTANCE`
- REFRESH CONFIRMATION: `APPLY REFRESH`
- ACTIVE CHANNELS: explicit non-empty subset of `youtube`, `linkedin`, `x`
- OPERATIONAL STATE: `state/pieces.json`; onboarding profile is configuration, not another state store
- DEFAULT EXTERNAL PROCESSING: `NOT_AUTHORIZED`
- DEFAULT EXTERNAL ACTIONS: `HUMAN_APPROVAL_REQUIRED`
- PUBLICATION: `HUMAN_APPROVAL_REQUIRED`
