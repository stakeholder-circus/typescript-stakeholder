# TypeScript Edge Cases

- Same-seed JSON output must remain byte-stable for the same `focus-family`.
- `focus-family` is required unless `--list-values` is used.
- Later families must emit grouped fallback renderer keys, not placeholder dedicated renderers.
- Experimental flags must not change deterministic output unless a provider is explicitly requested.
