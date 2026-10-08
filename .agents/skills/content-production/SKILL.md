---
name: content-production
description: Prepare a YouTube production package for an authorized OUTPUT.
---

# Produce a YouTube editorial package

Read `CORE_ROOT/AGENTS.md`, then the canonical contract at [workflows/PRODUCTION.md](../../../workflows/PRODUCTION.md). This skill is an adapter; the workflow remains authoritative and this file grants no additional permission.

Resolve context with:

```text
node scripts/resolve-instance.mjs --json
```

This operation requires an instance. If the resolver is not `CONFIGURED`, return the setup message and stop without writing.

When configured, treat every workspace path in the workflow as relative to the returned `INSTANCE_ROOT`. Product contracts and channel engines remain relative to `CORE_ROOT`. Never read product templates as live state and never search for another workspace.

Decide format before packaging and spoken copy. Production does not authorize research, rehearsal, recording, postproduction, publication, or another output.

A mention, example, or status question is not an execution request. Preserve workflow stop conditions, external-access gates, spending limits, human approvals, and separate publication authorization. Stop after the requested operation or its next human decision.
