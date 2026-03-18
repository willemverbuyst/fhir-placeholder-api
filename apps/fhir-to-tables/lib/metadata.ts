import { capabilityStatementResourceSchema } from "@repo/utils";
import type { CapabilityStatement } from "fhir/r5";

const FHIR_BASE_URL = "http://localhost:8080";

export async function fetchCapabilityStatement(): Promise<CapabilityStatement> {
  const response = await fetch(`${FHIR_BASE_URL}/api/v2/r5/metadata`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }

  const rawData: unknown = await response.json();
  capabilityStatementResourceSchema.parse(rawData);
  return rawData as CapabilityStatement;
}

export function extractSupportedResourceTypes(
  capabilityStatement: CapabilityStatement,
): string[] {
  const resourceTypes = (capabilityStatement.rest ?? [])
    .flatMap((rest) => rest.resource ?? [])
    .map((resource) => resource.type)
    .filter(
      (type): type is string => typeof type === "string" && type.length > 0,
    );

  return Array.from(new Set(resourceTypes)).sort((a, b) => a.localeCompare(b));
}
