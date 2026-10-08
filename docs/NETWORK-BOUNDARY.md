# Network and offline boundary

Content OS does not treat all operations as offline. It distinguishes local product behavior from editorial operations that may need current sources or external platforms.

## Local only

These included operations require no Internet access:

- instance resolution;
- FIRST SETUP, RESUME, and REFRESH onboarding with local inputs;
- core, instance, OUTPUT-provenance, and operational validation;
- privacy scan and included automated tests;
- dashboard server and `/api/view` on loopback;
- reading/writing the private instance through authorized workflows;
- dependency-free AV transcript/timing/EDL adapters and synthetic tests.

The `$schema` URLs in JSON files are identifiers. The included validator does not fetch them.

## Optionally networked

These operations may use the network only when the workflow and user authorization permit it:

- RESEARCH using current web sources;
- RADAR using configured online sources;
- LINK verification of an external URL or connected resource;
- optional external processing, accounts, APIs, uploads, or paid services;
- future optional AV runtimes that obtain packages, models, fonts, or assets.

Each operation must disclose provider, data, purpose, cost, scope, and stop conditions. Local availability does not authorize an external fallback.

## Requires an external source or platform

- discovering current external opportunities through RADAR;
- verifying information that exists only at an external source;
- platform publication, scheduling, or account actions;
- retrieving live performance data for REVIEW.

Those capabilities remain unavailable without explicit access and authorization. The core does not simulate successful access.

## Setup and validation guarantee

Clean setup, onboarding, validation, synthetic fixtures, and the dashboard do not install packages or contact non-loopback endpoints. Release acceptance runs them with proxy variables pointed at an unavailable loopback endpoint and statically rejects external package/network imports in the included runtime surfaces.

This is evidence about the included code paths, not a claim that the operating system, Node.js installation, editor, or future optional modules make no network connections.
