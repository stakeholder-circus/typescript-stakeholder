# TypeScript Language Specialties

- Repo-local `pnpm` and `tsc` keep the tranche self-contained without global TypeScript assumptions.
- Node ESM output keeps the CLI and test runner aligned across host and Docker paths.
- Stable object construction order is used so normalized JSON remains snapshot-comparable.
