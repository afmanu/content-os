# P3 public release hardening acceptance

PUBLIC_RELEASE_READINESS: **BLOCKED**

The filesystem candidate is technically reviewable. Public redistribution remains blocked by the top-level license and release approval gates.

## Preserved boundary

- PUBLIC CORE and PRIVATE USER INSTANCE remain separate.
- The candidate contains no live user state, private editorial artifact, media, transcript, local selector, onboarding checkpoint, source Git history, or source fingerprint.
- `state/pieces.json` exists only as an empty instance template or as explicitly fictional temporary test data.

## Scope and provenance

- Included core: editorial/channel contracts, 16 workflows, 16 skill adapters, ONBOARD, instance resolver, validator, privacy scanner, read-only dashboard, empty templates, and fictional fixtures.
- Included AV support: public contracts, four original dependency-free transcript/timing/EDL adapters, and synthetic tests.
- AV render/transcription runtime: `OPTIONAL_NOT_BUNDLED`.
- AIS-OS relationship: `CONCEPTUAL INSPIRATION` for studied operation types; no copied/adapted implementation, proprietary framework wording, brand asset, or trademark copy is included.
- Current candidate: no third-party code, package, binary, model, font, media, or asset is bundled. No copied third-party notice is therefore required for the included files.

The exact file-level inventory and inspected upstream revisions are recorded in [`THIRD-PARTY-PROVENANCE.md`](THIRD-PARTY-PROVENANCE.md). Any future AV runtime or third-party component reopens that inventory.

## License gate

Top-level product license: `OWNER DECISION REQUIRED`.

[`LICENSE-OPTIONS.md`](LICENSE-OPTIONS.md) compares MIT, Apache-2.0, and MPL-2.0. Apache-2.0 is recommended for permissive reuse with explicit patent and notice terms, but no license has been selected or applied.

## Clean-copy acceptance

The release acceptance copied the candidate to a fresh operating-system temporary directory while excluding Git metadata, live instance roots, local selectors, and onboarding checkpoints. It used only the fictional identity `Alex Example` and synthetic IDs.

| State | CORE | INSTANCE | OPERATIONAL | Overall | Dashboard |
| --- | --- | --- | --- | --- | --- |
| A. Pre-onboard | `PASS` | `NOT_CONFIGURED` | `NOT_READY` | `PASS_WITH_SETUP_REQUIRED` | `SETUP REQUIRED`, zero counts |
| B. Configured empty instance | `PASS` | `PASS` | `READY_FOR_OPERATIONS` | `PASS` | configured identity, zero counts |
| C. Synthetic CONTENT + OUTPUT | `PASS` | `PASS` | `READY_FOR_OPERATIONS` | `PASS` | one CONTENT and one OUTPUT |

ONBOARD completed FIRST SETUP only after `CREATE INSTANCE`, created an external non-nested workspace, and did not use source/private data. All 16 skills resolved an existing canonical workflow from the clean copy, including POSTPRODUCTION as a contract whose runtime remains optional.

The dashboard bound only to loopback, exposed no write route, displayed no fake metrics, and did not substitute fixture data for a real workspace.

## Offline and network evidence

Setup, validator, privacy scan, onboarding, synthetic fixtures, and dashboard acceptance completed without installing packages or requiring an Internet source. The clean-copy child validator ran with HTTP/HTTPS/all-proxy variables pointed at an unavailable loopback endpoint. Acceptance also rejected external package imports, external-network Node imports, and non-loopback runtime URLs in the included runtime surfaces.

This proves the exercised included code paths and their static boundary; it is not packet-level proof about the operating system, Node.js installation, editor, or future optional modules. Network-dependent editorial work remains explicitly classified in [`../docs/NETWORK-BOUNDARY.md`](../docs/NETWORK-BOUNDARY.md).

## Final verification

- Automated suite: `PASS` — 33 passed, 0 failed.
- Privacy scan: `PASS` — 116 files scanned, 0 findings.
- Synthetic fixtures: explicitly fictional; no anonymized real case.
- Filesystem: no `.git`, remote, live instance root, local selector/checkpoint, dependency directory, binary/media payload, generated cache, or symlink.
- Public README: covers product purpose, CONTENT → OUTPUT model, channels, human gates, quick start, AV boundary, and current limits without private-instance references.
- Release version recommendation: `0.1.0-alpha.1`; not applied.

## Blocking gates

1. The owner must select and authorize a top-level product license.
2. The owner must approve the public release scope and initial public version.
3. Git initialization, remote creation, commit, tag, push, release, and publication require a separate explicit authorization.

AV runtime exclusion is a declared product limit, not a blocker for the current core release scope. No third-party provenance blocker remains for the files currently included.
