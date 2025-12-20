import {
  type ResourceCountsSchema,
  resourceCountsSchema,
} from "@/lib/validation/resource-counts.validation";
import { queryOptions } from "@tanstack/react-query";

export function createResourceCountQueryOptions() {
  return queryOptions({
    queryKey: ["resource-counts"],
    queryFn: () => getResourceCounts(),
    staleTime: 1000 * 60, // 1 minute
  });
}

async function fetchResourceCounts(): Promise<ResourceCountsSchema> {
  const response = await fetch(
    "http://localhost:8080/api/v2/r5/$resource-counts",
  );

  return await response.json();
}

async function getResourceCounts(): Promise<ResourceCountsSchema> {
  const rawData = await fetchResourceCounts();

  resourceCountsSchema.parse(rawData);

  return rawData;
}
