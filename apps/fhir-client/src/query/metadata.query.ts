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
  const response = await fetch("http://localhost:8080/api/v2/r5/metadata");

  return await response.json();
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
