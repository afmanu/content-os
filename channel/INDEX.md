# Channel registry

This is the product catalog of available engines/profiles. Active channels are selected only in `<INSTANCE_ROOT>/channel/ACTIVE-CHANNELS.json`.

INSTANCE DEFAULT: `NOT_CONFIGURED`

| Channel | Product profile | Route | Supported formats |
| --- | --- | --- | --- |
| `youtube` | [`YOUTUBE-FORMATS.md`](YOUTUBE-FORMATS.md) | [`PRODUCTION.md`](../workflows/PRODUCTION.md) | `walkthrough`, `tutorial`, `build`, `case_study`, `deconstruction`, `investigation`, `experiment`, `comparison`, `explainer`, `framework`, `list`, `news`, `story`, `short_video` |
| `linkedin` | [`LINKEDIN.md`](LINKEDIN.md) | [`OUTPUT.md`](../workflows/OUTPUT.md) | `post`, `long_post` |
| `x` | [`X.md`](X.md) | [`OUTPUT.md`](../workflows/OUTPUT.md) | `short_post`, `long_post` |

Only these three channels are registered. A request naming another destination stops for a product decision; it does not invent a channel. YouTube has the most developed production engine. LinkedIn and X use lightweight textual OUTPUT routing. Profiles do not create empirical claims or activate accounts.
