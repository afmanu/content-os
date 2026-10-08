# P2 acceptance record

STATUS: PASS — LOCAL STAGING ONLY

## Capability delivered

CONTENT-ONBOARD now provides an explicit, dependency-free path:

```text
CORE → USER INPUT → PRIVATE INSTANCE → VALIDATION → DASHBOARD READY
```

It supports `FIRST_SETUP`, `RESUME`, and `REFRESH`. FIRST SETUP creates no final workspace before the exact `CREATE INSTANCE` confirmation. REFRESH requires `APPLY REFRESH`, shows a safe before/after summary, and never rewrites editorial state or history.

The only pre-confirmation write is the ignored local onboarding checkpoint. The final selector is also ignored. The instance is required to be external to and non-nested with CORE.

## Clean core before onboarding

- CORE: `PASS`
- INSTANCE: `NOT_CONFIGURED`
- OPERATIONAL: `NOT_READY`
- OVERALL: `PASS_WITH_SETUP_REQUIRED`
- AV: `REVIEW_REQUIRED`

No live instance roots, local selector, onboarding checkpoint, Git history, or demo data were present in CORE after verification.

## Interview and creation

The interview contains exactly six sequential blocks: identity, content purpose, channels, voice, privacy/control, and tools/optional capabilities. It asks only for missing fields and persists progress after each block.

The configured workspace contains:

- profile, onboarding configuration, voice synthesis and private source inventory;
- user Constitution and explicit active-channel selection;
- empty `pieces` and `outputs` collections;
- STATE, Decisions, and Learning Ledger;
- RADAR sources/watchlist bootstrap;
- empty indexes for ideas, labs, research, audits, outputs, and postproduction.

The generated Constitution separates canonical product principles from user editorial preferences. Unknown or deferred information remains explicit instead of being inferred.

## Privacy and control

Verified defaults:

- sync status: `UNKNOWN` until chosen;
- private media: `OUTSIDE_CORE`;
- external processing: `NOT_AUTHORIZED`;
- external actions: `HUMAN_APPROVAL_REQUIRED`;
- publication: `HUMAN_APPROVAL_REQUIRED`.

Credential-shaped fields are rejected. Voice samples are copied only after confirmation, hashed, and referenced by instance-relative path. Their original absolute paths are absent from configured instance context. Observations and user instructions remain separate.

## Channels and OUTPUT

Only `youtube`, `linkedin`, and `x` are available. At least one must be chosen explicitly; none are activated by default. One or multiple registered channels validate.

OUTPUT reads the instance activation file before writing. A registered but inactive destination produces `STOP / INACTIVE CHANNEL`; activation is a separate ONBOARD REFRESH decision. Historical outputs remain preserved if a later refresh deactivates their channel.

## Resume, refresh, and idempotency

- RESUME recovered the next missing block from an interrupted checkpoint.
- An unknown occupied directory stopped without overwrite.
- Same-root and nested-root configurations stopped before creation.
- REFRESH changed the selected channels while preserving an existing CONTENT, OUTPUT, Decisions, Learnings, and STATE history byte-for-byte.
- REFRESH with identical answers returned `NO_CHANGE`, changed no instance file, and generated no new instance timestamp.

## Automated acceptance A–N

| Case | Result |
| --- | --- |
| A clean core → NOT_CONFIGURED | PASS |
| B first onboarding creates instance | PASS |
| C zero pieces / zero outputs valid | PASS |
| D one active channel valid | PASS |
| E multiple active channels valid | PASS |
| F inactive channel not active | PASS |
| G conservative privacy defaults | PASS |
| H CORE ≠ INSTANCE enforced | PASS |
| I unknown existing directory stops/no overwrite | PASS |
| J interrupted onboarding resumes | PASS |
| K identical rerun is idempotent | PASS |
| L refresh preserves content and state | PASS |
| M dashboard setup state disappears | PASS |
| N validator reports CORE PASS + INSTANCE PASS | PASS |

An additional synthetic test verified private voice-source copying, hashing, path removal, and the separation of observed traits from user instruction.

Full Node test run: 32 passed, 0 failed.

The new `content-onboard` skill also passed the skill-specific validator and keeps `allow_implicit_invocation: false`.

## Clean-user acceptance

A separate temporary instance used only the fictional identity `Alex Example` and fictitious purpose, audience, territories, and voice instruction.

Observed after `CREATE INSTANCE`:

- instance creation: `CREATED`;
- CORE: `PASS`;
- INSTANCE: `PASS`;
- OPERATIONAL: `READY_FOR_OPERATIONS`;
- AV: `REVIEW_REQUIRED`;
- active channels: `linkedin`, `x`;
- pieces: 0;
- outputs: 0;
- dashboard HTTP view: `setupRequired: false`;
- safe identity: `Alex Example`;
- content, outputs, audits, learnings, decisions, and edits: all 0;
- selector path: relative, not absolute;
- temporary instance, checkpoint, and selector: removed after verification.

No first CONTENT, RADAR round, link, external action, or publication was started.

## Dashboard

The local read-only HTTP server was started on loopback with an ephemeral port against the configured temporary instance. `/api/view` returned the configured identity and zero real counts without `SETUP REQUIRED`. Existing GET/HEAD-only behavior remains covered by tests.

## Source and third-party boundaries

P2 was authored in the distribution tree only. No private development data, history, path, or fingerprint entered the candidate.

No third-party onboarding code, branded intake framework, question set, voice wording, package, runtime, account, or service was incorporated.

## Remaining gates

- PRODUCT LICENSE: `PENDING OWNER DECISION`.
- AV DISTRIBUTION: `REVIEW_REQUIRED`; no runtime was installed.
- PUBLIC RELEASE: blocked by the unresolved license and third-party/AV review gates.
- P3: not started.
