---
name: content-output
description: Create an explicitly requested OUTPUT for a registered active channel.
---

# Create a channel output

Read `CORE_ROOT/AGENTS.md`, then the canonical contract at [workflows/OUTPUT.md](../../../workflows/OUTPUT.md). This skill is an adapter; the workflow remains authoritative and this file grants no additional permission.

Resolve context with:

```text
node scripts/resolve-instance.mjs --json
```

This operation requires an instance. If the resolver is not `CONFIGURED`, return the setup message and stop without writing.

When configured, treat every workspace path in the workflow as relative to the returned `INSTANCE_ROOT`. Product contracts and channel engines remain relative to `CORE_ROOT`. Never read product templates as live state and never search for another workspace.

Create only the requested active channels. Read `INSTANCE_ROOT/channel/ACTIVE-CHANNELS.json` and stop before writing for an inactive channel; activation requires a separate explicit ONBOARD REFRESH decision. A proposal creates nothing. Do not treat publication or repurposing as authorized.

A mention, example, or status question is not an execution request. Preserve workflow stop conditions, external-access gates, spending limits, human approvals, and separate publication authorization. Stop after the requested operation or its next human decision.
