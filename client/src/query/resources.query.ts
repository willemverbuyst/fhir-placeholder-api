import { queryOptions } from "@tanstack/react-query";
import type { Bundle, Resource } from "fhir/r5";
import { getResourcesFromBundle, isBundle } from "../lib/fhir";

export function createResourcesQueryOptions<T extends Resource>({
  url,
}: {
  url: string;
}) {
  return queryOptions({
    queryKey: [url],
    queryFn: () => getResources<T>(url),
    staleTime: 1000 * 60, // 1 minute
  });
}

export async function fetchResources<T extends Resource>(
  url: string,
): Promise<Bundle<T> | T> {
  const response = await fetch(`http://localhost:8080/api/v2/r5/${url}`);

  await new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a delay for the loading spinner
      resolve(true);
    }, 1000);
  });

  return await response.json();
}

export async function getResources<T extends Resource>(
  url: string,
): Promise<T[]> {
  const rawData = await fetchResources<T>(url);

  if (isBundle(rawData)) {
    return getResourcesFromBundle<T>(rawData);
  }

  return [rawData];
}
