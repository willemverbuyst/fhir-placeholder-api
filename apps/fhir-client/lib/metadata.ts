import { capabilityStatementResourceSchema } from "@repo/utils";
import type { CapabilityStatement } from "fhir/r5";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

const DEFAULT_GATEWAY_BASE = "http://localhost:3000";
const METADATA_REVALIDATE_SECONDS = 60 * 60;

async function loadCapabilityStatement(
  metadataUrl: string,
  token: string,
): Promise<CapabilityStatement> {
  const response = await fetch(metadataUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: METADATA_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }

  const rawData: unknown = await response.json();
  capabilityStatementResourceSchema.parse(rawData);
  return rawData as CapabilityStatement;
}

const getCachedCapabilityStatement = unstable_cache(
  loadCapabilityStatement,
  ["fhir-capability-statement"],
  { revalidate: METADATA_REVALIDATE_SECONDS },
);

export async function fetchCapabilityStatement(): Promise<CapabilityStatement> {
  const base = process.env.GATEWAY_SERVICE_URL ?? DEFAULT_GATEWAY_BASE;
  const metadataUrl = `${base.replace(/\/$/, "")}/api/fhir/metadata`;
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  return getCachedCapabilityStatement(metadataUrl, token);
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
