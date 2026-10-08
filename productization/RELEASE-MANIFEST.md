# Release candidate manifest

VERSION: `0.1.0-alpha.1`

LICENSE: `Apache-2.0`

RELEASE_STATUS: `RELEASE_CANDIDATE`

PUBLICATION: **NOT AUTHORIZED**

## Release scope

The candidate distributes a stateless public Content OS core that creates and operates against a separate private user instance.

Included:

- core contracts, product Constitution, channel registry, and editorial/AV standards;
- all 16 current canonical workflows and their 16 explicit skill adapters;
- the channel-independent `CONTENT → OUTPUT` model;
- `youtube`, `linkedin`, and `x` channel routes;
- BUILD human-in-the-loop, OUTPUT, REPURPOSE, REVIEW, LINK, LEVEL-UP, and AUDIT;
- FIRST SETUP / RESUME / REFRESH onboarding;
- instance resolver, validator, privacy scanner, and synthetic acceptance tests;
- dependency-free, loopback-only read-only dashboard;
- schemas, empty instance templates, and fictional fixtures;
- original dependency-free AV contracts, transcript/timing/EDL adapters, and synthetic tests;
- productization, provenance, network, license, and acceptance documentation.

## Excluded modules and data

- private user instances and user-specific data;
- identity, real CONTENT/OUTPUT/LAB identifiers, research, audits, Decisions, Learnings, approvals, private AV projects, media, and transcripts;
- private development Git history and fingerprints;
- remote configuration, GitHub repositories/releases, generated packages, and publication artifacts;
- credentials, authenticated URLs, local selectors, checkpoints, caches, logs, and device/GPS metadata;
- automatic publishing, platform integrations, accounts, APIs, uploads, paid services, and other external services;
- FFmpeg binaries, HyperFrames runtime, GSAP runtime, Chrome/browser runtime, ASR models/runtime, native packages, fonts, brand assets, example media, and vendor directories.

## Optional modules

AV runtime status: `OPTIONAL_NOT_BUNDLED`.

The public core includes AV contracts and original local adapters only. Render, transcription, browser automation, FFmpeg, HyperFrames, GSAP, native packages, models, fonts, and downloads require a separately versioned, licensed, portable, and network-reviewed module.

## Third-party notices

No top-level `NOTICE` is required for the current included files because no third-party implementation or asset is bundled and no pertinent upstream NOTICE content must be carried forward. `tools/av/NOTICE.md` records the AV boundary. Every future optional dependency reopens the file-level inventory in `productization/THIRD-PARTY-PROVENANCE.md`.

## Known limitations

- AV runtime not bundled;
- YouTube route is more developed than LinkedIn and X;
- empirical calibration across channels and audiences remains limited;
- no automatic publishing or account action;
- network-dependent research/discovery requires explicit access and authorization;
- external actions remain under user control;
- this is an alpha release and interfaces or contracts may still change;
- Node.js 22+ is required.

## License status

`Apache-2.0` applied in the top-level [`LICENSE`](../LICENSE). It licenses original Content OS material only and does not relicense third-party components.

## Privacy result

P4 final content scan: `PASS` — 118 candidate files inspected, 0 findings. No live instance root, local selector, onboarding checkpoint, symlink, binary/unreviewed file type, private artifact path, credential pattern, authenticated URL, or known private identifier was found. Release-local Git metadata is excluded from content scanning and validated separately.

## Test result

P4 final suite: `PASS` — 33 tests passed, 0 failed; 18 JavaScript files passed syntax checks.

Clean-copy acceptance: `PASS` for pre-onboard, configured empty workspace, and synthetic CONTENT + OUTPUT states. It exercised ONBOARD, validator, loopback dashboard, privacy scan, instance isolation, and all 16 skill-to-workflow routes from a temporary copy without Git metadata or local configuration.

## Version

`0.1.0-alpha.1` is applied in the canonical [`VERSION`](../VERSION) file. The private development repository version is outside this release and was not changed.

## Git readiness

P4 authorizes a new local Git repository with one root commit and the annotated tag `v0.1.0-alpha.1`. No remote, copied history, local config, live instance root, binary/media payload, dependency directory, or generated cache belongs to the release content. Push, GitHub repository creation, GitHub Release, registry publication, and website publication remain unauthorized.
