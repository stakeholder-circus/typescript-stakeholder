# TypeScript Parity

- Role: local-only full-parity target in the next-20 wave
- Parity class: full-parity
- Tranche state: deterministic first tranche implemented

## Review model
- Rust remains the canonical source-of-truth.
- Java remains the depth-anchor audit surface for CLI and normalized JSON behavior.
- `stakeholder-core` remains the behavioral contract.
- This repo is deterministic-first in the current tranche.

## Current parity bar
- Dedicated `classic-six + modern-core`
- Grouped fallback for later families
- `--list-values`, deterministic same-seed JSON, and experimental-provider fail-fast
- Native and Docker validation green locally
