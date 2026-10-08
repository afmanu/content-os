---
name: content-status
description: Read product setup or workspace status without executing workflows or writing files.
---

# Read Content OS status

Read `CORE_ROOT/AGENTS.md`, then the canonical contract at [workflows/INDEX.md](../../../workflows/INDEX.md). This skill is an adapter; the workflow remains authoritative and this file grants no additional permission.

Resolve context with:

```text
node scripts/resolve-instance.mjs --json
```

This operation may inspect the core without an instance. If user state is needed and the resolver is not `CONFIGURED`, return the setup message and do not invent context.

When configured, treat every workspace path in the workflow as relative to the returned `INSTANCE_ROOT`. Product contracts and channel engines remain relative to `CORE_ROOT`. Never read product templates as live state and never search for another workspace.

Without a workspace, report SETUP REQUIRED plus core capability status. With one, read its canonical state. Never create, repair, or advance work.

A mention, example, or status question is not an execution request. Preserve workflow stop conditions, external-access gates, spending limits, human approvals, and separate publication authorization. Stop after the requested operation or its next human decision.
