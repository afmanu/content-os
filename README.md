# Content OS

Content OS organizes how you turn what you know and do into content with AI.

It preserves evidence, limits, provenance, and human approval throughout that process.

It is a human-in-the-loop editorial operating system, not an autonomous publisher.

## Core model

```text
knowledge / work
      ↓
   CONTENT
      ↓
  0..N OUTPUTS
      ↓
publish → review → learning
```

`CONTENT` is the channel-independent editorial core: intent, thesis, audience problem, evidence, creator advantage, claims, and limits. `OUTPUT` is one concrete expression for a registered channel. A repurposed OUTPUT keeps its source OUTPUT and common CONTENT provenance.

Creating an artifact never authorizes publication.

## Public core and private workspace

This repository is the public product core: workflows, skills, schemas, validator, dashboard, empty templates, and synthetic tests.

Identity, voice samples, CONTENT, OUTPUT, research, labs, audits, media, approvals, Decisions, and Learnings live in a separate private workspace. The core never searches for one or treats templates as live state.

```text
PUBLIC CORE ≠ PRIVATE USER INSTANCE
```

## Supported channels

- `youtube`
- `linkedin`
- `x`

Users activate only the channels they actually use. YouTube currently has the most developed production route. Channel profiles are operating contracts, not claims of empirical optimization.

## Human-in-the-loop operations

BUILD follows:

```text
system prepares → human executes → system verifies
```

LEVEL-UP follows:

```text
system proposes → human approves → implementation
```

External access, spending, recording, editing approvals, and publication remain separate human decisions.

## Quick start

Requirements: Node.js 22 or later. Core setup and validation require no package installation and no Internet access.

```text
git clone <repository-url> content-os
cd content-os
node scripts/content-onboard.mjs start --instance-root ../content-os-workspace
# Complete one block at a time, inspect preview, then confirm CREATE INSTANCE.
node scripts/validate-content-os.mjs
node dashboard/src/server.mjs
```

In Codex, an explicit request such as `Configura Content OS` activates the `content-onboard` skill. See [`workflows/ONBOARD.md`](workflows/ONBOARD.md) for FIRST SETUP, RESUME, REFRESH, and the exact checkpoint/confirmation behavior.

After onboarding, begin with one of these requests:

- `Quiero crear contenido sobre…` → IDEA / COMMISSION.
- `Tengo este dossier/investigación…` → LINK / COMMISSION according to intent.
- `Busca oportunidades nuevas…` → RADAR.

None runs automatically.

Expected before onboarding:

```text
CORE: PASS
INSTANCE: NOT_CONFIGURED
OPERATIONAL: NOT_READY
AV: OPTIONAL_NOT_BUNDLED
```

Expected after onboarding:

```text
CORE: PASS
INSTANCE: PASS
OPERATIONAL: READY_FOR_OPERATIONS
AV: OPTIONAL_NOT_BUNDLED
```

## Dashboard

The dashboard is a local, read-only projection:

```text
node dashboard/src/server.mjs
```

Before onboarding it shows `SETUP REQUIRED`. After onboarding it shows the configured display name and real workspace counts. It provides no write controls and never substitutes demo data.

## Audiovisual boundary

Public AV contracts, dependency-free transcript/timing/EDL adapters, and synthetic tests are included under [`tools/av/`](tools/av/README.md).

The render/transcription runtime is an optional module and is not bundled. HyperFrames, GSAP, browsers, FFmpeg, native packages, models, fonts, downloads, caches, and media are not included or installed automatically.

## Current limits

- audiovisual render and transcription runtime not bundled;
- limited empirical calibration across channels and audiences;
- no automatic publishing;
- no automatic account, API, payment, upload, or external action;
- no claim of maximum autonomy or guaranteed content performance;
- alpha release; interfaces and contracts may still change.

Operations that need current web sources or external platforms declare that requirement and preserve human gates. See [`docs/NETWORK-BOUNDARY.md`](docs/NETWORK-BOUNDARY.md).

## Validate the candidate

```text
node scripts/validate-content-os.mjs
node scripts/privacy-scan.mjs
node --test
```

All included examples use synthetic or fictional data.

## Release status

Version `0.1.0-alpha.1` is a local release candidate under the [Apache License 2.0](LICENSE). It has not been published, pushed, or connected to a remote repository. See [`productization/RELEASE-MANIFEST.md`](productization/RELEASE-MANIFEST.md).
