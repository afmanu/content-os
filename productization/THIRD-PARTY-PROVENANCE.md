# Third-party provenance

STATUS: **CURRENT RELEASE SCOPE REVIEWED**

This inventory distinguishes architectural inspiration, copied/adapted implementation, packages, and assets. It is a technical provenance record, not legal advice.

## Revisions inspected

Public `main` was verified read-only on 2026-10-07:

- `nateherkai/AIS-OS`: `ce9cb93a1145da5daba84ea37208ec35fd03606e`;
- `nateherkai/hyperframes-student-kit`: `0d30152a82b9ceb93cfdd9bdbf46f0d5ab3cde86`.

Repository license files, third-party notices, implementations, package metadata, assets, and public documentation were inspected. No upstream instruction or script was executed.

## Core classification

| Distribution surface | Classification | Finding | Notice requirement |
| --- | --- | --- | --- |
| AUDIT, LEVEL-UP, LINK, ONBOARD concepts | `CONCEPTUAL INSPIRATION` | Equivalent functions were studied in AIS-OS, but Content OS contracts, questions, state model, gates, code, and wording were developed for the CONTENT/OUTPUT architecture. | Provenance record only; no copied-code notice. |
| All `workflows/*.md` and `.agents/skills/**` | `ORIGINAL CONTENT-OS` | No AIS intake, Three Ms, Four Cs, trademark copy, branded questions, skill code, or agent configuration is included. | Apache License 2.0. |
| `channel/**`, `docs/**`, schemas, templates, dashboard, and core scripts | `ORIGINAL CONTENT-OS` | Product-specific contracts and dependency-free implementation. | Apache License 2.0. |
| `examples/synthetic/**` and test-created workspaces | `ORIGINAL CONTENT-OS` / `SYNTHETIC TEST` | Fictitious data only; no anonymized user case. | Apache License 2.0. |
| Productization records | `ORIGINAL CONTENT-OS` | Release controls and evidence; no third-party implementation. | Apache License 2.0. |

AIS-OS is MIT-licensed, but no AIS-OS code or substantial text is included. Its framework/trademark material is outside the release scope. Architectural similarity alone is not classified as derivative code.

## AV file-by-file classification

| File | Classification | Basis |
| --- | --- | --- |
| `tools/av/NOTICE.md` | `ORIGINAL` | Content OS provenance notice. |
| `tools/av/README.md` | `ORIGINAL` | Content OS public/optional-module boundary. |
| `tools/av/STATUS.md` | `ORIGINAL` | Content OS capability status. |
| `tools/av/adapters/approve-synthetic-cut.mjs` | `ORIGINAL` | Content OS approval/check adapter for a predeclared synthetic fixture. |
| `tools/av/adapters/compose-edl.mjs` | `ORIGINAL` | Content OS EDL composition/lineage adapter. Upstream operation names appear only as provenance values in generated data; no upstream algorithm or script is bundled. |
| `tools/av/adapters/normalize-transcript.mjs` | `ORIGINAL` | Content OS schema normalization for synthetic and compatible local transcripts. It imports only Node built-ins and local code. |
| `tools/av/adapters/timeline.mjs` | `ORIGINAL` | Content OS timing, cut validation, EDL composition, retiming, and equivalence implementation. |
| `tools/av/tests/adapters.test.mjs` | `SYNTHETIC TEST` | Original tests with fictional data and no media. |
| `tools/av/tests/expected/synthetic-v1.json` | `SYNTHETIC TEST` | Predeclared fictional timings and tolerances. |
| `tools/av/tests/fixtures/synthetic-v1.transcript.json` | `SYNTHETIC TEST` | Fictional tokens, tones, colors, and timings; no ASR or human recording. |

No included AV file is classified as `ADAPTED FROM STUDENT KIT`, `THIRD-PARTY`, or `LOCAL/DO NOT DISTRIBUTE`.

## Student-kit and runtime boundary

The student kit is MIT-licensed for its software, with separate restrictions/notices for brand materials, examples, imported pipeline resources, HyperFrames, GSAP, fonts, and other assets. Because Content OS bundles none of that implementation or media, the student-kit MIT notice is not copied into this candidate.

The following remain outside the release:

| Component | Classification | Included | Gate before future inclusion |
| --- | --- | --- | --- |
| HyperFrames | `THIRD-PARTY PACKAGE` | No | Pin version; include Apache-2.0 license/NOTICE obligations; test portability and network behavior. |
| GSAP | `THIRD-PARTY PACKAGE` | No | Review the then-current GSAP terms and retain applicable license text. |
| Playwright/browser runtime | `THIRD-PARTY PACKAGE` | No | Select supported platforms, notices, download behavior, and cache boundary. |
| esbuild / Sharp / native packages | `THIRD-PARTY PACKAGE` | No | Review every transitive/native license and platform artifact. |
| FFmpeg | `THIRD-PARTY PACKAGE / BINARY` | No | Decide user-provided versus redistributed binary and comply with the chosen build's license. |
| transcription engines/models | `THIRD-PARTY PACKAGE / MODEL` | No | Review code/model licenses, download, privacy, size, and platform support. |
| fonts, motion cards, templates, brand examples, videos | `THIRD-PARTY ASSET` | No | Establish asset-specific rights; do not infer them from repository license. |
| student-kit scripts and pipeline resources | `ADAPTED THIRD-PARTY CODE` only if later copied or modified | No | Record exact files/hashes and retain MIT and any separate pipeline permission/notice. |

## Runtime prerequisites and references

- Node.js 22+ is an external prerequisite, not redistributed here. Included JavaScript imports only Node built-ins and relative local modules.
- A user-provided browser displays the loopback dashboard; no browser package is bundled.
- JSON Schema URLs are identifiers and are not fetched by the validator.
- The CSS uses only generic/system font families; no font asset or CDN is referenced.

## Notice decision

No current candidate file requires a copied third-party license or attribution notice because no third-party code, package, binary, model, font, media, or asset is bundled. `tools/av/NOTICE.md` is an informational Content OS provenance notice, not a substitute for a future dependency license.

The top-level Content OS license is Apache License 2.0. It does not relicense excluded or future third-party components. Adding any excluded component reopens this inventory before release.
