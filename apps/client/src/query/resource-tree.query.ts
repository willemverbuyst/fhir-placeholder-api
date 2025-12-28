import { queryOptions } from "@tanstack/react-query";

export function createResourceTreeQueryOptions() {
  return queryOptions({
    queryKey: ["resource-tree"],
    queryFn: () => getResourceTree(),
    staleTime: 1000 * 60, // 1 minute
  });
}

async function fetchResourceTree(): Promise<Record<string, unknown>> {
  const response = await fetch(
    "http://localhost:8080/api/v2/r5/$resource-tree",
  );

  return await response.json();
}

async function getResourceTree(): Promise<Record<string, unknown>> {
  const rawData = await fetchResourceTree();

  return rawData;
}
