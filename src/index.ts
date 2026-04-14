import { run } from "./runtime.js";

const result = run(process.argv.slice(2));

if (result.stdoutText) {
  process.stdout.write(result.stdoutText);
}

if (result.stderrText) {
  process.stderr.write(result.stderrText);
}

process.exitCode = result.exitCode;
