  # TypeScript Toolchain

  - State: scaffold-only next-20 prep
  - Toolchain source: `repo-local-pnpm`

  ## Planned commands after promotion
    - `pnpm init`
- `pnpm add -D typescript @types/node`
- `pnpm exec tsc --init --rootDir src --outDir dist --module esnext --target es2022`
- `pnpm exec tsc -p tsconfig.json`

  ## Scaffold-time checks
  - `python3 scripts/validate_scaffold.py`
  - `/nix/var/nix/profiles/default/bin/nix --extra-experimental-features 'nix-command flakes' flake lock`

  ## Current limitation
  - Use repo-local TypeScript via pnpm; do not depend on a global tsc.
