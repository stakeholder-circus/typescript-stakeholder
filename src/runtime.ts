import {
  complexities,
  contextFor,
  devTypes,
  experimentalFlags,
  experimentalModes,
  experimentalProviders,
  generatorFamilies,
  isKnownFamily,
  jargonLevels,
  outputFormats,
  personalizationProfiles,
  promptAssets,
  registryId,
  rendererKeyFor,
  trancheFor,
  type GeneratorFamily,
} from "./catalog.js";

export type RunResult = {
  exitCode: number;
  stdoutText: string;
  stderrText: string;
};

type ParsedArgs = {
  values: Map<string, string | true>;
  error?: string;
};

const knownValueFlags = new Set([
  "project",
  "framework",
  "focus-family",
  "output-format",
  "seed",
  "experimental-provider",
  "experimental-mode",
  "experimental-profile",
  "experimental-prompt-asset",
  "experimental-prompt-version",
  "experimental-personalization-profile",
  "experimental-model",
  "experimental-base-url",
  "experimental-session-file",
  "experimental-store",
  "experimental-bootstrap-command",
]);

const knownBoolFlags = new Set([
  "list-values",
  "alerts",
  "minimal",
  "team",
  "no-color",
  "trace",
  "experimental-disable-cache",
]);

export function run(args: string[]): RunResult {
  const parsed = parseArgs(args);
  if (parsed.error) {
    return { exitCode: 1, stdoutText: "", stderrText: `${parsed.error}\n` };
  }

  const provider = valueOf(parsed.values, "experimental-provider");
  if (!provider && hasOrphanExperimental(parsed.values)) {
    return {
      exitCode: 1,
      stdoutText: "",
      stderrText: "experimental flags require --experimental-provider\n",
    };
  }

  if (provider) {
    return {
      exitCode: 1,
      stdoutText: "",
      stderrText:
        "experimental-provider is not implemented yet in typescript-stakeholder\n",
    };
  }

  if (parsed.values.has("list-values")) {
    return {
      exitCode: 0,
      stdoutText: `${JSON.stringify(listValuesPayload(), null, 2)}\n`,
      stderrText: "",
    };
  }

  const familyValue = valueOf(parsed.values, "focus-family");
  if (!familyValue || !isKnownFamily(familyValue)) {
    return {
      exitCode: 1,
      stdoutText: "",
      stderrText:
        "focus-family is required and must be a known generator family\n",
    };
  }

  const seed = valueOf(parsed.values, "seed") ?? "default-seed";
  const format = valueOf(parsed.values, "output-format") ?? "text";
  const payload = payloadFor(familyValue, seed);

  if (format === "json") {
    return {
      exitCode: 0,
      stdoutText: `${JSON.stringify(payload, null, 2)}\n`,
      stderrText: "",
    };
  }

  return {
    exitCode: 0,
    stdoutText: `${textFor(payload)}\n`,
    stderrText: "",
  };
}

function listValuesPayload() {
  return {
    complexities: [...complexities],
    devTypes: [...devTypes],
    experimentalFlags: [...experimentalFlags],
    experimentalModes: [...experimentalModes],
    experimentalProviders: [...experimentalProviders],
    flags: [
      "alerts",
      "project",
      "minimal",
      "team",
      "framework",
      "seed",
      "output-format",
      "no-color",
      "trace",
      "list-values",
      ...experimentalFlags,
    ],
    generatorFamilies: generatorFamilies.map((family) => ({
      id: family,
      registryId: registryId(family),
      rendererKey: rendererKeyFor(family),
      tranche: trancheFor(family),
    })),
    jargonLevels: [...jargonLevels],
    outputFormats: [...outputFormats],
    personalizationProfiles: [...personalizationProfiles],
    promptAssets: [...promptAssets],
  };
}

function payloadFor(family: GeneratorFamily, seed: string) {
  const contextDefinition = contextFor(family);
  return {
    eventType: "stakeholder.generator.output",
    sequence: sequenceFor(seed, family),
    family,
    message: `Deterministic typescript tranche for ${family}`,
    timestamp: timestampFor(seed, family),
    context: {
      rendererKey: rendererKeyFor(family),
      [contextDefinition.key]: contextDefinition.value,
      seedFingerprint: fingerprint(seed, family),
      typescriptProfile: "next-20-deterministic-foundation",
    },
  };
}

function textFor(payload: ReturnType<typeof payloadFor>): string {
  return [
    `family: ${payload.family}`,
    `renderer: ${String(payload.context.rendererKey)}`,
    `sequence: ${payload.sequence}`,
    `timestamp: ${payload.timestamp}`,
    `message: ${payload.message}`,
  ].join("\n");
}

function parseArgs(args: string[]): ParsedArgs {
  const values = new Map<string, string | true>();
  for (let index = 0; index < args.length; ) {
    const arg = args[index];
    if (arg === undefined) {
      break;
    }
    if (!arg.startsWith("--")) {
      return { values, error: `unknown positional argument: ${arg}` };
    }

    const flag = arg.slice(2);
    if (knownBoolFlags.has(flag)) {
      values.set(flag, true);
      index += 1;
      continue;
    }

    if (!knownValueFlags.has(flag)) {
      return { values, error: `unknown flag: --${flag}` };
    }

    const value = args[index + 1];
    if (value === undefined) {
      return { values, error: `missing value for --${flag}` };
    }

    values.set(flag, value);
    index += 2;
  }

  return { values };
}

function hasOrphanExperimental(values: Map<string, string | true>): boolean {
  for (const key of values.keys()) {
    if (key.startsWith("experimental-") && key !== "experimental-provider") {
      return true;
    }
  }
  return false;
}

function valueOf(
  values: Map<string, string | true>,
  key: string,
): string | undefined {
  const value = values.get(key);
  return typeof value === "string" ? value : undefined;
}

function sequenceFor(seed: string, family: GeneratorFamily): number {
  return (hash(`${seed}::${family}`) % 9000) + 1000;
}

function timestampFor(seed: string, family: GeneratorFamily): string {
  const seconds = hash(`timestamp::${seed}::${family}`) % 86_400;
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;
  return `2026-01-01T${pad(hour)}:${pad(minute)}:${pad(second)}Z`;
}

function fingerprint(seed: string, family: GeneratorFamily): string {
  return `${registryId(family)}-${hash(`${seed}::${family}`).toString(16)}`;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function hash(input: string): number {
  let value = 0x811c9dc5;
  for (const symbol of input) {
    value ^= symbol.codePointAt(0) ?? 0;
    value = Math.imul(value, 0x01000193) >>> 0;
  }
  return value >>> 0;
}
