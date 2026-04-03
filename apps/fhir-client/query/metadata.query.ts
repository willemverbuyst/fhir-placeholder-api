import { capabilityStatementResourceSchema } from "@repo/utils";
import { queryOptions } from "@tanstack/react-query";
import type { CapabilityStatement } from "fhir/r5";
import { isResourceWithValidation } from "./validation";

export function createMetadataQueryOptions() {
  return queryOptions({
    queryKey: ["metadata"],
    queryFn: () => getMetadata(),
    staleTime: 1000 * 60, // 1 minute
  });
}

async function fetchMetadata(): Promise<CapabilityStatement> {
  const response = await fetch("/api/fhir/metadata");

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }

  return (await response.json()) as CapabilityStatement;
}

async function getMetadata() {
  const rawData = await fetchMetadata();

  const resourceValidation = isResourceWithValidation(
    rawData,
    capabilityStatementResourceSchema,
  );
  if (!resourceValidation.isResource) {
    throw new Error(`Failed to process request: ${resourceValidation.error}`);
  }

  return rawData;
}
