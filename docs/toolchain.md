# TypeScript Toolchain

- State: deterministic first tranche implemented locally
- Toolchain source: `repo-local-pnpm`

## Commands
- `pnpm install`
- `pnpm run format`
- `pnpm run build`
- `pnpm run test`
- `node dist/src/index.js --list-values`

## Notes
- Use repo-local TypeScript via pnpm; do not depend on a global `tsc`.
- Docker is the reproducible Linux gate.
- The runtime expects Node `22` semantics and ESM output.
