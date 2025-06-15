import { queryOptions } from "@tanstack/react-query";
import type { CapabilityStatement } from "fhir/r5";
import { capabilityStatementResourceSchema } from "../lib/validation/capability-statement.validation";
import { validateResource } from "../lib/validation/validateResource";

export function createMetadataQueryOptions() {
  return queryOptions({
    queryKey: ["metadata"],
    queryFn: () => getMetadata(),
    staleTime: 1000 * 60, // 1 minute
  });
}

export async function fetchMetadata(): Promise<CapabilityStatement> {
  const response = await fetch("http://localhost:8080/api/v2/r5/metadata");

  return await response.json();
}

export async function getMetadata() {
  const rawData = await fetchMetadata();

  validateResource({
    schema: capabilityStatementResourceSchema,
    resource: rawData,
    resourceType: "CapabilityStatement",
  });

  return rawData;
}
