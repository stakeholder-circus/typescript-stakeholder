# TypeScript Docker

## Build and smoke
- `docker build -t typescript-stakeholder .`
- `docker run --rm typescript-stakeholder --list-values`
- `docker run --rm typescript-stakeholder --focus-family delivery_preview_ops --output-format json --seed smoke`

## Rationale
- The image runs formatter, build, and tests during the build stage.
- Docker is the portable Linux gate for this tranche.
