# P4 public release candidate acceptance

GIT_RELEASE_CANDIDATE_READINESS: **READY**

## Resolved P3 gates

P3 was technically reviewable and blocked only by two owner decisions: the top-level product license and authorization of the initial release scope/version. The owner selected Apache License 2.0 and authorized `0.1.0-alpha.1`. No release scope was added.

## License and version

- Top-level license: `Apache-2.0`; the official complete text is in `LICENSE`.
- Top-level `NOTICE`: not created. No included third-party implementation or asset carries a pertinent notice requirement.
- Version: `0.1.0-alpha.1` in the distribution `VERSION` only.

## Scope and provenance

The included scope is the reviewed P3 filesystem: core contracts; 16 workflows and skill adapters; CONTENT → OUTPUT; YouTube, LinkedIn, and X; BUILD human-in-the-loop; OUTPUT, REPURPOSE, REVIEW, LINK, LEVEL-UP, and AUDIT; validator; dashboard; ONBOARD; schemas/templates; synthetic fixtures; and the safe original AV contracts/adapters.

Classification remains:

- Content OS files: `ORIGINAL CONTENT-OS`;
- AIS-OS / Nate: `CONCEPTUAL INSPIRATION` only;
- hyperframes student kit: no code or asset included; the declared AV adapters are original Content OS;
- AV runtime and its dependencies: `OPTIONAL_NOT_BUNDLED`;
- bundled third-party code, package, binary, model, font, media, or asset: none.

The top-level Apache-2.0 license does not relicense third-party components.

## Privacy

Final release-content scan: `PASS` — 118 files scanned, 0 findings. The scan covers personal names and email, user/cloud paths, real identifiers, private audits/transcripts/media, credentials and tokens, GPS/device metadata, authenticated URLs, local selectors/config, symlinks, and unknown binary types. Release-local `.git` metadata is excluded from content scanning and validated as a separate repository boundary.

## Clean install and tests

Clean-copy acceptance: `PASS`.

- Pre-onboard: CORE `PASS`, INSTANCE `NOT_CONFIGURED`, OPERATIONAL `NOT_READY`, dashboard `SETUP REQUIRED`.
- Synthetic onboard using `Alex Example`: CORE `PASS`, INSTANCE `PASS`, OPERATIONAL `READY_FOR_OPERATIONS`, empty dashboard workspace.
- Synthetic CONTENT + OUTPUT: validator, provenance, active-channel routing, dashboard counts, and artifact resolution `PASS`.
- Temporary candidate, instance, selector, checkpoint, and fixtures removed after the run.

Final automated suite: `PASS` — 33 passed, 0 failed. It covers core/productization, onboarding, validator, OUTPUT/provenance, dashboard/read-only HTTP, portability/routing, clean-copy release acceptance, and safe AV adapters. Syntax checks passed for 18 JavaScript files. No optional runtime was installed and the tests used no external service.

## Network boundary

The exercised setup, validator, onboarding, dashboard, privacy, and synthetic-test paths require no Internet access. The clean-copy child validator ran with HTTP/HTTPS/all-proxy variables directed to an unavailable loopback endpoint. This is evidence for included code paths, not packet-level proof about the operating system, Node.js, editor, or future optional modules.

## Initial P4 Git gate

At the initial P4 execution, Git initialization required the privacy, clean-copy, and test results above to pass. The release source was required to contain one new root commit, the annotated tag `v0.1.0-alpha.1`, no copied private history, no remote, and a clean tracked worktree. These requirements describe internal release hygiene, not permanent product invariants. Remote creation, push, GitHub Release, registry publication, and website publication were not authorized by P4.

## Readiness decision

`READY`: license applied; version applied; included-file provenance resolved; privacy has 0 findings; tests and clean install pass; private history is absent; and the AV optional boundary remains consistent.

## P5 portability remediation — 2026-10-08

P5 discovered a release portability defect: normal Git remotes were incorrectly treated as a core validation failure. Corrected before public publication.

The initial P4 commit `64b433ae071e6e6ed6175f2e505d483789194358` introduced `core.git_boundary`, which enforced zero remotes and exactly one root commit in the general validator. Its filesystem clean-copy acceptance excluded `.git`, so that acceptance did not cover a normal distributed Git clone. P5 stopped before repository creation, push, or release publication.

The remediation removes the Git topology check and its runtime Git invocation. A filesystem copy, local Git repository without remotes, normal clone with `origin`, and fork/development repository with `origin` plus `upstream` have the same CORE, INSTANCE, and OPERATIONAL results; multiple remotes or commits do not create a warning. Existing product structure and privacy checks remain unchanged. The dashboard consumes the validator result and needs no code change.

Release preflight still checks that the local release source does not accidentally point at a private remote before public repository creation. That is a release procedure check, not a distributed product invariant.

Verification after remediation:

- four Git-state regression fixtures: `PASS`, including two-commit development histories;
- clean filesystem copy and actual local synthetic clone with safe `origin`: pre-onboard, fictional onboarding, and synthetic CONTENT + OUTPUT all `PASS`;
- structure/privacy negative fixtures: existing checks still reject live instance state in the core and synthetic credential-shaped content;
- complete public suite: 39 passed, 0 failed;
- dashboard check: 3 passed, 0 failed;
- syntax checks: 18 JavaScript files passed;
- release privacy scan: 118 files, 0 findings;
- temporary repositories, instances, and fixtures removed after verification.

The version remains `0.1.0-alpha.1`. The local annotated tag previously pointed at the initial P4 commit above; remediation preserves that commit and requires a new commit above it, followed by retargeting only the unpublished local tag to the corrected HEAD. No public history is rewritten.

P5 PREFLIGHT READINESS: **READY**. Publication is not part of this remediation execution.
