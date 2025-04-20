import { queryOptions } from "@tanstack/react-query";
import { Bundle, Resource } from "fhir/r5";

export function createResourcesQueryOptions<T extends Resource>({
  url,
  queryKeys,
}: {
  url: string;
  queryKeys: string[];
}) {
  return queryOptions({
    queryKey: queryKeys,
    queryFn: () => fetchResources<T>(url),
  });
}

export async function fetchResources<T extends Resource>(
  url: string
): Promise<Bundle<T>> {
  const response = await fetch(`http://localhost:8080/api/v2/r5/${url}`);

  return await response.json();
}
