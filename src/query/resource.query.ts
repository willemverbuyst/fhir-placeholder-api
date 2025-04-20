import { queryOptions } from "@tanstack/react-query";
import { Resource } from "fhir/r5";

export function createResourceQueryOptions<T extends Resource>({
  url,
  queryKeys,
}: {
  url: string;
  queryKeys: string[];
}) {
  return queryOptions({
    queryKey: queryKeys,
    queryFn: () => fetchResource<T>(url),
  });
}

export async function fetchResource<T extends Resource>(
  url: string
): Promise<T> {
  const response = await fetch(`http://localhost:8080/api/v2/r5/${url}`);

  return await response.json();
}
