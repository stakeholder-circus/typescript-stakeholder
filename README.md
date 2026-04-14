> [!WARNING]
> This repository is AI-assisted and manually reviewed. It is a local-only deterministic TypeScript tranche and is not published yet.

# typescript-stakeholder

TypeScript deterministic parity port under stakeholder-circus.

## Status
- Full dedicated `classic-six + modern-core` is implemented locally.
- Later families are present as grouped fallback renderers.
- Full live-provider/runtime support remains a required follow-on wave.
- Repo-local pnpm + TypeScript bootstrap is authoritative.

## Contract
- `--list-values`
- `--focus-family <family>`
- `--output-format text|json`
- `--seed <value>`
- `--experimental-provider <provider>` fail-fast
- orphan experimental flags fail fast

## Local workflow
```bash
pnpm install
pnpm run format:write
pnpm run build
pnpm run test
node dist/src/index.js --list-values
```

## Documentation
- [STATUS.md](STATUS.md)
- [PARITY.md](PARITY.md)
- [GAPS.md](GAPS.md)
- [docs/toolchain.md](docs/toolchain.md)
- [docs/docker.md](docs/docker.md)
- [docs/experimental.md](docs/experimental.md)
- [docs/traceability/first-push-families.md](docs/traceability/first-push-families.md)
