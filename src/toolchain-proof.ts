export function toolchainProof(): string {
  return "typescript-ready";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(`${toolchainProof()}\n`);
}
