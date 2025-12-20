import { capabilityStatementResourceSchema } from "@repo/utils";
import { queryOptions } from "@tanstack/react-query";
import type { CapabilityStatement } from "fhir/r5";
import { validateResource } from "../lib/validation/validateResource";

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

  validateResource({
    schema: capabilityStatementResourceSchema,
    resource: rawData,
    resourceType: "CapabilityStatement",
  });

  return rawData;
}
