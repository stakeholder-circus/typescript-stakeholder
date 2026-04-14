    # typescript-stakeholder AGENTS

    - Preserve imported Rust history and provenance.
    - Queue state: `scaffold-only` in the next-20 autonomous sprint.
    - Origin: `git@github.com:stakeholder-circus/typescript-stakeholder.git`
    - Upstream: `https://github.com/giacomo-b/rust-stakeholder`
    - Deterministic normalized JSON is the first implementation target.
    - Missing behavior must fail fast and be recorded in `GAPS.md`.
    - No placeholder runtime behavior once implementation starts.

    ## Planned promotion commands
    - `pnpm init`
- `pnpm add -D typescript @types/node`
- `pnpm exec tsc --init --rootDir src --outDir dist --module esnext --target es2022`
- `pnpm exec tsc -p tsconfig.json`
