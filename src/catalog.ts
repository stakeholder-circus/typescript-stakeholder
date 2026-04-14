export const complexities = ["low", "medium", "high", "extreme"] as const;
export const devTypes = [
  "backend",
  "frontend",
  "fullstack",
  "data_science",
  "devops",
  "blockchain",
  "machine_learning",
  "systems_programming",
  "game_development",
  "security",
] as const;
export const jargonLevels = ["low", "medium", "high", "extreme"] as const;
export const outputFormats = ["text", "json"] as const;
export const experimentalModes = ["api", "consumer-session"] as const;
export const experimentalProviders = [
  "openai-compatible",
  "anthropic-api",
  "consumer-openai",
  "consumer-claude",
] as const;
export const promptAssets = [
  "baseline-tranche",
  "provider-runtime-preview",
] as const;
export const personalizationProfiles = [
  "default",
  "ops-audit",
  "security-review",
] as const;
export const experimentalFlags = [
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
  "experimental-disable-cache",
] as const;

export const generatorFamilies = [
  "code_analyzer",
  "data_processing",
  "jargon",
  "metrics",
  "network_activity",
  "system_monitoring",
  "agent_workflows",
  "ai_inference_ops",
  "platform_engineering",
  "supply_chain_security",
  "observability_ai_runtime",
  "delivery_preview_ops",
  "evaluation_and_guardrails",
  "knowledge_retrieval",
  "edge_client_runtime",
  "identity_and_trust",
  "aibom_provenance",
  "agent_boundary_security",
  "embedded_agentic_pipeline",
  "data_governance_compliance",
  "finops_capacity",
  "blockchain_protocol_ops",
  "cross_chain_interop",
  "proof_and_sequencer_ops",
  "hybrid_runtime_ops",
  "capacity_cost_controller",
  "batch_execution_tuner",
  "compiler_maintainer",
  "interop_adapter_engineer",
  "preflight_capacity_planner",
  "simulator_performance_engineer",
  "fhir_profile_generator",
  "smart_launch_oauth",
  "bulk_fhir_population_ops",
  "hl7v2_feed_ops",
  "clinical_workflow_events",
  "dicomweb_imaging_ops",
  "openehr_semantic_record_ops",
  "device_telemetry_clinical",
  "emr_vendor_adapter",
  "ocpp_chargepoint_ops",
  "ocpi_roaming_ops",
  "mcp_a2a_ops",
  "streaming_bus_ops",
  "service_mesh_rpc_ops",
] as const;

export type GeneratorFamily = (typeof generatorFamilies)[number];

type DedicatedFamily = {
  rendererKey: string;
  contextKey: string;
  contextValue: string;
  tranche: "classic-six" | "modern-core";
};

export const dedicatedFamilyMap: Partial<
  Record<GeneratorFamily, DedicatedFamily>
> = {
  code_analyzer: {
    rendererKey: "classic-six.code_analyzer",
    contextKey: "analysisFocus",
    contextValue: "typed-module-contracts",
    tranche: "classic-six",
  },
  data_processing: {
    rendererKey: "classic-six.data_processing",
    contextKey: "dataWindow",
    contextValue: "batched-stream-reconciliation",
    tranche: "classic-six",
  },
  jargon: {
    rendererKey: "classic-six.jargon",
    contextKey: "languagePolicy",
    contextValue: "typed-ecosystem-glossary",
    tranche: "classic-six",
  },
  metrics: {
    rendererKey: "classic-six.metrics",
    contextKey: "signalBlend",
    contextValue: "latency-error-saturation",
    tranche: "classic-six",
  },
  network_activity: {
    rendererKey: "classic-six.network_activity",
    contextKey: "transportMix",
    contextValue: "https-websocket-sse",
    tranche: "classic-six",
  },
  system_monitoring: {
    rendererKey: "classic-six.system_monitoring",
    contextKey: "telemetryScope",
    contextValue: "runtime-build-host",
    tranche: "classic-six",
  },
  agent_workflows: {
    rendererKey: "modern-core.agent_workflows",
    contextKey: "coordinationMode",
    contextValue: "typed-orchestration-handshake",
    tranche: "modern-core",
  },
  platform_engineering: {
    rendererKey: "modern-core.platform_engineering",
    contextKey: "platformSurface",
    contextValue: "pnpm-node-release-lane",
    tranche: "modern-core",
  },
  observability_ai_runtime: {
    rendererKey: "modern-core.observability_ai_runtime",
    contextKey: "runtimeSignals",
    contextValue: "logs-metrics-provider-audit",
    tranche: "modern-core",
  },
  delivery_preview_ops: {
    rendererKey: "modern-core.delivery_preview_ops",
    contextKey: "deliveryGuardrail",
    contextValue: "preview-release-checkpoints",
    tranche: "modern-core",
  },
  supply_chain_security: {
    rendererKey: "modern-core.supply_chain_security",
    contextKey: "supplyChainPosture",
    contextValue: "lockfile-integrity-attestation",
    tranche: "modern-core",
  },
};

const aiGovernanceFamilies = [
  "ai_inference_ops",
  "evaluation_and_guardrails",
  "knowledge_retrieval",
  "edge_client_runtime",
  "identity_and_trust",
  "aibom_provenance",
  "agent_boundary_security",
  "embedded_agentic_pipeline",
  "data_governance_compliance",
  "finops_capacity",
] as const satisfies readonly GeneratorFamily[];

const securityBlockchainFamilies = [
  "blockchain_protocol_ops",
  "cross_chain_interop",
  "proof_and_sequencer_ops",
] as const satisfies readonly GeneratorFamily[];

const healthProtocolFamilies = [
  "fhir_profile_generator",
  "smart_launch_oauth",
  "bulk_fhir_population_ops",
  "hl7v2_feed_ops",
  "clinical_workflow_events",
  "dicomweb_imaging_ops",
  "openehr_semantic_record_ops",
  "device_telemetry_clinical",
  "emr_vendor_adapter",
  "ocpp_chargepoint_ops",
  "ocpi_roaming_ops",
  "mcp_a2a_ops",
  "streaming_bus_ops",
  "service_mesh_rpc_ops",
] as const satisfies readonly GeneratorFamily[];

const overlayQuantumFamilies = [
  "hybrid_runtime_ops",
  "capacity_cost_controller",
  "batch_execution_tuner",
  "compiler_maintainer",
  "interop_adapter_engineer",
  "preflight_capacity_planner",
  "simulator_performance_engineer",
] as const satisfies readonly GeneratorFamily[];

const fallbackRendererKeys = new Map<GeneratorFamily, string>();
for (const family of aiGovernanceFamilies) {
  fallbackRendererKeys.set(family, "fallback.ai_governance");
}
for (const family of securityBlockchainFamilies) {
  fallbackRendererKeys.set(family, "fallback.security_blockchain");
}
for (const family of healthProtocolFamilies) {
  fallbackRendererKeys.set(family, "fallback.health_protocol");
}
for (const family of overlayQuantumFamilies) {
  fallbackRendererKeys.set(family, "fallback.overlay_quantum");
}

export function isKnownFamily(value: string): value is GeneratorFamily {
  return (generatorFamilies as readonly string[]).includes(value);
}

export function registryId(family: GeneratorFamily): string {
  return family.replaceAll("_", "-");
}

export function rendererKeyFor(family: GeneratorFamily): string {
  const dedicated = dedicatedFamilyMap[family];
  if (dedicated) {
    return dedicated.rendererKey;
  }
  return fallbackRendererKeys.get(family) ?? "fallback.unknown";
}

export function trancheFor(family: GeneratorFamily): string {
  const dedicated = dedicatedFamilyMap[family];
  if (dedicated) {
    return dedicated.tranche;
  }
  return rendererKeyFor(family).replace("fallback.", "fallback-");
}

export function contextFor(family: GeneratorFamily): {
  key: string;
  value: string;
} {
  const dedicated = dedicatedFamilyMap[family];
  if (dedicated) {
    return { key: dedicated.contextKey, value: dedicated.contextValue };
  }

  return {
    key: "fallbackFamily",
    value: rendererKeyFor(family).replace("fallback.", ""),
  };
}
