# Product and instance boundary

## Product core

The product core owns operation contracts, runtime adapters, schemas, validation, the read-only dashboard, neutral channel engines, templates, synthetic fixtures, and optional-module boundaries. It contains no live editorial state.

## User instance

The external private workspace owns identity, purpose, audience, voice, brand, active channels, CONTENT, OUTPUT, ideas, sources, research, labs, audits, user Decisions and Learnings, approvals, media, and evidence.

The workspace's `state/pieces.json` is the single operational state store. The dashboard projects it; workflows update it only under their contracts. No database or second registry is introduced.

## Resolution

`scripts/instance-resolver.mjs` accepts one explicit selector. A missing selector is `NOT_CONFIGURED`. The resolver never searches home directories, infers sync locations, or falls back to product templates as live state.

ONBOARD is the only operation that may turn `NOT_CONFIGURED` into a connected instance. Before confirmation it writes only an ignored local checkpoint; after `CREATE INSTANCE` it creates an external, non-nested workspace and an ignored CORE → INSTANCE selector. The instance stores no absolute path back to the core.
