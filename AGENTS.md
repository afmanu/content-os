# Content OS collaboration rules

## Authority

Read `workflows/INDEX.md` for routing and the applicable workflow before executing an operation. Product contracts live under `workflows/`; `.agents/skills/` are runtime adapters and do not expand permissions.

Resolve the workspace with `node scripts/resolve-instance.mjs --json`. Product files are relative to `CORE_ROOT`. Editorial state and artifacts are relative to the returned `INSTANCE_ROOT`.

If instance status is `NOT_CONFIGURED`, any operation requiring user context must return exactly:

```text
SETUP REQUIRED
No content workspace configured.
Run onboarding to create/connect a workspace.
```

The only exception is an explicit ONBOARD FIRST SETUP request governed by `workflows/ONBOARD.md`. Before `CREATE INSTANCE`, it may write only the ignored onboarding checkpoint. Do not invent a workspace, choose identity or channels, copy templates as live state, or create editorial context automatically.

## Operating boundaries

- A query does not activate an execution workflow.
- Each operation requires an explicit request and stops at its documented gate.
- No operation authorizes publication unless a separate publication capability and approval exist.
- Human approvals are versioned, scoped, and non-transitive.
- BUILD prepares and verifies; the external object is built by the configured human operator unless separately authorized.
- `state/pieces.json` inside the workspace is the only operational state store.
- Dashboard and STATUS are read-only projections.
- Optional capabilities may be unavailable without invalidating the core.
- Never store private media, credentials, absolute user paths, or raw transcripts in the product core.
- OUTPUT may use only channels explicitly active in the instance; activating another channel requires a separate user decision through ONBOARD REFRESH.

## Product evolution

LEVEL-UP may modify product contracts only after a scoped proposal and explicit authorization. User decisions and learnings remain in the workspace. Product defaults never overwrite an existing workspace.
