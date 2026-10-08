---
name: content-experiment
description: Prepare or explicitly execute a workspace experiment under its approved protocol and limits.
---

# Prepare or execute an experiment

Read `CORE_ROOT/AGENTS.md`, then the canonical contract at [workflows/EXPERIMENT.md](../../../workflows/EXPERIMENT.md). This skill is an adapter; the workflow remains authoritative and this file grants no additional permission.

Resolve context with:

```text
node scripts/resolve-instance.mjs --json
```

This operation requires an instance. If the resolver is not `CONFIGURED`, return the setup message and stop without writing.

When configured, treat every workspace path in the workflow as relative to the returned `INSTANCE_ROOT`. Product contracts and channel engines remain relative to `CORE_ROOT`. Never read product templates as live state and never search for another workspace.

PREPARE never executes. EXECUTE requires the exact approved protocol, scope, cost, version, and explicit authorization; it does not start production.

A mention, example, or status question is not an execution request. Preserve workflow stop conditions, external-access gates, spending limits, human approvals, and separate publication authorization. Stop after the requested operation or its next human decision.
