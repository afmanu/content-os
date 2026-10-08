# P1 acceptance record

STATUS: PASS — LOCAL STAGING ONLY

## Construction

- Built from an empty sibling directory using `productization/ALLOWLIST.md`.
- Source contracts entered through the reviewed distribution allowlist; no private repository history entered the filesystem.
- No source `.git`, remote, tag, release, live state, editorial artifact, or ignored local material was copied.
- Final inventory at verification: 104 files.

## Clean state

- CORE: `PASS`
- INSTANCE: `NOT_CONFIGURED`
- OPERATIONAL: `NOT_READY`
- OVERALL: `PASS_WITH_SETUP_REQUIRED`
- AV: `REVIEW_REQUIRED`, `blocks_core: false`
- Validator exit: 0

The clean core contains 0 CONTENT, 0 OUTPUT, 0 LAB, 0 RESEARCH, 0 AUDIT, 0 EDIT, 0 user Decisions, and 0 user Learnings.

## Dashboard

An actual local HTTP server was started on loopback with an ephemeral port. Both static HTML and `/api/view` reported:

- `CONTENT OS`
- `SETUP REQUIRED`
- no configured workspace
- zero content, outputs, audits, learnings, decisions, and edits

The server was closed after the check. POST remained rejected with HTTP 405 in the automated tests.

## Synthetic instance

Temporary fictional workspaces outside CORE ROOT proved:

- resolver separation;
- configured empty state;
- one fictional CONTENT and one direct fictional OUTPUT;
- registered/active channel validation;
- artifact and provenance validation;
- dashboard configured mode.

All temporary workspaces were removed; no matching residue remained.

## Portability

- 15 workflows declare CORE/INSTANCE routing and `SETUP REQUIRED` behavior.
- 15 skills resolve an existing canonical workflow and use the instance resolver.
- All 15 skills passed the skill-specific validator.
- Existing `allow_implicit_invocation` policies were preserved.
- LINK, LEVEL-UP, and AUDIT contracts were read with no instance before and after; resolver state remained `NOT_CONFIGURED` and no live state root appeared.

## Privacy and structure

- Privacy scanner: `PASS`, 104 files scanned, 0 findings.
- Git history present: no.
- Local instance selector present: no.
- Live instance roots inside core: none.
- Structural review confirms templates are empty/placeholders and examples are explicitly synthetic.

## Automated verification

- Node tests: 17 passed, 0 failed.
- Dashboard tests include clean setup, external empty workspace, and read-only HTTP behavior.
- AV adapter tests include timing, cut-boundary, EDL lineage, and local transcript normalization behavior without render/runtime dependencies.

## Source preservation

The development source remained read-only and functionally unchanged. Its private worktree fingerprints were verified during P1 and are intentionally not reproduced in the public candidate.

## Gates

- PRODUCT LICENSE: `PENDING OWNER DECISION`
- AV DISTRIBUTION: `REVIEW REQUIRED`
- PUBLICATION: blocked
- ONBOARD: not implemented; reserved for P2
