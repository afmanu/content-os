---
name: content-onboard
description: Configure or refresh a private Content OS workspace after an explicit request such as “configura Content OS”, “set up Content OS”, “onboard me”, “crea mi workspace”, or “inicializa mi Content OS”. Do not run for questions about how onboarding works.
---

# Configure a private Content OS instance

Read `CORE_ROOT/AGENTS.md`, then the canonical contract at [workflows/ONBOARD.md](../../../workflows/ONBOARD.md). This skill is an adapter; the workflow remains authoritative and this file grants no additional permission.

Resolve existing context with:

```text
node scripts/resolve-instance.mjs --json
```

Unlike other instance workflows, FIRST SETUP may begin when the resolver returns `NOT_CONFIGURED`. Use `node scripts/content-onboard.mjs` for its checkpoint, preview, confirmation, creation, resume, and refresh operations. Treat all workspace paths as relative to the selected external `INSTANCE_ROOT` and all product contracts as relative to `CORE_ROOT`.

Ask one canonical block at a time and only for missing fields. Before `CREATE INSTANCE`, write no final workspace. Before `APPLY REFRESH`, show the affected blocks. Reject unknown occupied roots, nested roots, unrecognized instances, incompatible schemas, and conflicting local configuration without deleting or overwriting anything.

Never request or store credentials. Never activate unselected channels, install optional capabilities, create demo content, execute a first content operation, publish, or interpret a question about onboarding as authorization to run it.
