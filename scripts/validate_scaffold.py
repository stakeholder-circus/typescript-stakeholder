from pathlib import Path

required = [
    'README.md',
    'AI_DISCLOSURE.md',
    'PARITY.md',
    'GAPS.md',
    'STATUS.md',
    'AGENTS.md',
    'CONTRIBUTING.md',
    'docs/remotes.md',
    'docs/provenance.md',
    'docs/toolchain.md',
    'docs/docker.md',
    'docs/experimental.md',
    'docs/example-outputs.md',
    'docs/edge-cases.md',
    'docs/language-specialties.md',
    'docs/traceability/first-push-families.md',
    '.githooks/commit-msg',
    '.githooks/pre-push',
    '.github/CODEOWNERS',
    '.github/PULL_REQUEST_TEMPLATE.md',
    '.github/dependabot.yml',
    '.github/workflows/actionlint.yml',
    '.github/workflows/dependency-review.yml',
    '.github/workflows/ci.yml',
    '.github/workflows/ci-native.yml',
    '.github/workflows/docker-smoke.yml',
    'flake.nix',
    'flake.lock',
    'Dockerfile',
    'package.json',
    'pnpm-lock.yaml',
    'tsconfig.json',
    'src/catalog.ts',
    'src/runtime.ts',
    'src/index.ts',
    'test/runtime.test.ts',
]
missing = [path for path in required if not Path(path).exists()]
if missing:
    raise SystemExit('missing scaffold files: ' + ', '.join(missing))
print('scaffold validated')
