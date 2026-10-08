# Workspace decisions

This ledger starts empty. Add a user decision only after it is explicitly accepted and supported by recoverable workspace evidence.

## Entry schema

```text
## DEC-NNN — title
STATUS: ACCEPTED | SUPERSEDED
DATE: YYYY-MM-DD
DECISION: text
CONTEXT: text
WHY: text
ALTERNATIVES CONSIDERED: text
CONSEQUENCES: text
EVIDENCE: workspace references
SUPERSEDES: DEC-NNN | NONE
SUPERSEDED BY: DEC-NNN | NONE
```
