# Privacy denylist and structural review

The automated scanner is `scripts/privacy-scan.mjs`. It checks text and paths for personal names from the source instance, email addresses, Windows user paths, cloud-sync paths, known real IDs, likely credentials and token shapes, authenticated URLs, private keys, GPS/device metadata, real audit/edit records, transcripts, private media/project roots, and runtime-local selectors or onboarding checkpoints.

Automation is not sufficient. Structural review must also confirm:

- no top-level user state or editorial artifact roots exist;
- no private/source Git history or remote configuration exists; release-local `.git` metadata is excluded from content scanning and validated separately;
- templates contain only placeholders and empty collections;
- examples are explicitly fictional and use reserved synthetic IDs;
- dashboard fixtures never appear as live data;
- optional AV contains no runtime packages, binaries, downloads, renders, media, or private configuration;
- provenance records distinguish inspiration, copied/adapted implementation, and packages.

Any match fails the distribution review unless its exact path and purpose are explicitly documented as a safe product reference.
