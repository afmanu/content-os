# Optional audiovisual module boundary

AV PUBLIC SUPPORT SURFACE: **INCLUDED**

AV RUNTIME: **OPTIONAL MODULE — NOT BUNDLED**

The product core does not require AV. This release candidate includes only dependency-free timing/transcript/EDL adapters and synthetic tests that are original Content OS integration code. It does not bundle a render engine or claim end-to-end audiovisual readiness.

Not included:

- HyperFrames, GSAP, browser runtime, FFmpeg, native packages, or package lock;
- student-kit vendored scripts;
- binaries, downloads, caches, `node_modules`, renders, logs, or work directories;
- private project configuration, media, transcripts, manifests, pilots, incidents, or operational evidence.

The omitted functionality remains documented rather than silently represented as available. POSTPRODUCTION reports `NOT_INSTALLED` until a separately approved runtime passes licensing, portability, installation, network-control, and synthetic-render checks.

Included adapters can be tested without installation:

```text
node --test tools/av/tests/adapters.test.mjs
```

See `productization/THIRD-PARTY-PROVENANCE.md` for the file-by-file classification and expansion gate.
