import { capabilityStatementResourceSchema } from "@repo/utils";
import type { CapabilityStatement } from "fhir/r5";
import { cookies } from "next/headers";

const DEFAULT_GATEWAY_BASE = "http://localhost:3000";

export async function fetchCapabilityStatement(): Promise<CapabilityStatement> {
  const base = process.env.GATEWAY_SERVICE_URL ?? DEFAULT_GATEWAY_BASE;
  const metadataUrl = `${base.replace(/\/$/, "")}/api/fhir/metadata`;
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(metadataUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }

  const rawData: unknown = await response.json();
  capabilityStatementResourceSchema.parse(rawData);
  return rawData as CapabilityStatement;
}

export async function fetchCapabilityStatementSafe(): Promise<CapabilityStatement | null> {
  try {
    return await fetchCapabilityStatement();
  } catch {
    return null;
  }
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
