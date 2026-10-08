# Top-level license options

STATUS: **DECIDED — APACHE LICENSE 2.0**

This comparison supports a product decision; it is not legal advice. The current candidate contains original Content OS code/documentation and no bundled third-party code or assets that force a top-level license choice.

## Option 1 — MIT

- **Permissiveness:** highly permissive; permits use, modification, distribution, sublicensing, and sale.
- **Attribution:** recipients must retain the copyright and permission notice in copies or substantial portions.
- **Patent terms:** no explicit patent grant or patent-retaliation clause.
- **Compatibility:** short and widely understood; commonly combined with proprietary or open-source software, subject to other components' terms.
- **Commercial reuse:** allowed, including proprietary products and paid services.

Canonical text: [Open Source Initiative — MIT](https://opensource.org/license/mit).

## Option 2 — Apache License 2.0

- **Permissiveness:** permissive; permits use, modification, source/object distribution, sublicensing, and commercial use.
- **Attribution:** requires the license, retention of relevant notices, prominent notices on modified files, and preservation of an upstream `NOTICE` when one exists.
- **Patent terms:** includes an explicit contributor patent grant and a patent-litigation termination provision.
- **Compatibility:** suitable for commercial and open-source reuse; downstream distributors must preserve its license/notice obligations. Compatibility with copyleft licenses should be checked for the intended combination.
- **Commercial reuse:** allowed, including proprietary larger products, while preserving required notices.

Canonical text: [Apache Software Foundation — Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Option 3 — Mozilla Public License 2.0

Reason to consider it: the owner may want improvements to covered Content OS source files to remain available while still permitting combination with larger proprietary works.

- **Permissiveness:** weak copyleft at file level rather than fully permissive.
- **Attribution:** license and source-availability notices must be preserved for covered files.
- **Patent terms:** includes contributor patent grants and patent-related termination provisions.
- **Compatibility:** allows a larger work under other terms, but modified covered source files remain under MPL 2.0; this creates more compliance work than MIT or Apache-2.0.
- **Commercial reuse:** allowed, including commercial larger works, subject to source obligations for covered files.

Canonical text: [Mozilla — MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

## Recommendation

For the stated objective — let other people use Content OS, modify it, and build on top of it — **Apache License 2.0** is the recommended option. It remains permissive and commercially usable while making the patent grant and notice mechanics explicit for a system intended to accept contributions and extensions.

MIT is the simpler alternative if minimal notice overhead is more important than explicit patent language. MPL 2.0 is not recommended for the current objective unless file-level reciprocity is intentional.

## Owner decision

Apache License 2.0 was selected for the `0.1.0-alpha.1` local release candidate. The complete official text is applied at [`../LICENSE`](../LICENSE). This decision does not authorize remote creation, push, a GitHub Release, or publication.
