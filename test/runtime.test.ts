import assert from "node:assert/strict";
import test from "node:test";

import { run } from "../src/runtime.js";

const dedicatedFamilies: Array<[string, string, string]> = [
  ["code_analyzer", "analysisFocus", "classic-six.code_analyzer"],
  ["data_processing", "dataWindow", "classic-six.data_processing"],
  ["jargon", "languagePolicy", "classic-six.jargon"],
  ["metrics", "signalBlend", "classic-six.metrics"],
  ["network_activity", "transportMix", "classic-six.network_activity"],
  ["system_monitoring", "telemetryScope", "classic-six.system_monitoring"],
  ["agent_workflows", "coordinationMode", "modern-core.agent_workflows"],
  [
    "platform_engineering",
    "platformSurface",
    "modern-core.platform_engineering",
  ],
  [
    "observability_ai_runtime",
    "runtimeSignals",
    "modern-core.observability_ai_runtime",
  ],
  [
    "delivery_preview_ops",
    "deliveryGuardrail",
    "modern-core.delivery_preview_ops",
  ],
  [
    "supply_chain_security",
    "supplyChainPosture",
    "modern-core.supply_chain_security",
  ],
];

const fallbackFamilies: Array<[string, string]> = [
  ["ai_inference_ops", "fallback.ai_governance"],
  ["blockchain_protocol_ops", "fallback.security_blockchain"],
  ["fhir_profile_generator", "fallback.health_protocol"],
  ["hybrid_runtime_ops", "fallback.overlay_quantum"],
];

test("list-values exposes the full registry and renderer keys", () => {
  const result = run(["--list-values"]);
  assert.equal(result.exitCode, 0);

  const payload = JSON.parse(result.stdoutText) as {
    generatorFamilies: Array<{ id: string; rendererKey: string }>;
  };

  assert.ok(payload.generatorFamilies.length >= 30);
  assert.ok(
    payload.generatorFamilies.some((item) => item.id === "code_analyzer"),
  );
  assert.ok(
    payload.generatorFamilies.some(
      (item) => item.id === "delivery_preview_ops",
    ),
  );
  assert.ok(
    payload.generatorFamilies.every(
      (item) => typeof item.rendererKey === "string",
    ),
  );
});

for (const [family, contextKey, rendererKey] of dedicatedFamilies) {
  test(`${family} emits dedicated metadata`, () => {
    const result = run([
      "--focus-family",
      family,
      "--output-format",
      "json",
      "--seed",
      "smoke",
    ]);
    assert.equal(result.exitCode, 0);
    const payload = JSON.parse(result.stdoutText) as {
      family: string;
      context: Record<string, string>;
    };
    assert.equal(payload.family, family);
    assert.ok(payload.context[contextKey]);
    assert.equal(payload.context.rendererKey, rendererKey);
  });
}

for (const [family, rendererKey] of fallbackFamilies) {
  test(`${family} emits grouped fallback metadata`, () => {
    const result = run([
      "--focus-family",
      family,
      "--output-format",
      "json",
      "--seed",
      "fallback",
    ]);
    assert.equal(result.exitCode, 0);
    const payload = JSON.parse(result.stdoutText) as {
      context: Record<string, string>;
    };
    assert.equal(payload.context.rendererKey, rendererKey);
    assert.ok(payload.context.fallbackFamily);
  });
}

test("deterministic json stays stable for the same seed", () => {
  const args = [
    "--focus-family",
    "platform_engineering",
    "--output-format",
    "json",
    "--seed",
    "same-seed",
  ];
  const first = run(args);
  const second = run(args);
  assert.equal(first.exitCode, 0);
  assert.equal(first.stdoutText, second.stdoutText);
});

test("experimental provider flags fail fast", () => {
  const result = run(["--experimental-provider", "openai-compatible"]);
  assert.equal(result.exitCode, 1);
  assert.match(
    result.stderrText,
    /experimental-provider is not implemented yet in typescript-stakeholder/,
  );
});

test("orphan experimental flags fail fast", () => {
  const result = run(["--experimental-mode", "consumer-session"]);
  assert.equal(result.exitCode, 1);
  assert.match(
    result.stderrText,
    /experimental flags require --experimental-provider/,
  );
});
