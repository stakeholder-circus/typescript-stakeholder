# Contributing to typescript-stakeholder

## Rules
- Treat Rust as the source-of-truth baseline for downstream ports.
- Use Conventional Commits.
- Do not land silent behavioral changes; update traceability and docs in the same tranche.
- Keep deterministic seeded behavior stable unless the change is explicitly documented as a baseline evolution.

## Local workflow
- `pnpm install`
- `pnpm run format`
- `pnpm run build`
- `pnpm run test`
- `docker build -t typescript-stakeholder .`
- `docker run --rm typescript-stakeholder --list-values`

## Change discipline
- Generator-family additions must update docs, examples, and traceability.
- Experimental provider work must stay clearly separated from deterministic parity paths.
- Prefer additive event-schema evolution over breaking changes.
