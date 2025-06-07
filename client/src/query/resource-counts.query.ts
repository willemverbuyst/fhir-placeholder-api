import { queryOptions } from "@tanstack/react-query";

export function createMetadataQueryOptions() {
  return queryOptions({
    queryKey: ["resource-counts"],
    queryFn: () => getResourceCounts(),
    staleTime: 1000 * 60, // 1 minute
  });
}

export async function fetchResourceCounts(): Promise<Record<string, number>> {
  const response = await fetch(
    "http://localhost:8080/api/v2/r5/$resource-counts",
  );

  return await response.json();
}

export async function getResourceCounts() {
  const rawData = await fetchResourceCounts();

  return rawData;
}
