import { Bundle, Resource } from "fhir/r5";

export function isBundle<T extends Resource>(
  data: T | Bundle<T> | undefined,
): data is Bundle<T> {
  return !!data && "entry" in data && !!data.entry;
}

export function getResourcesFromBundle<T extends Resource>(
  data: Bundle<T> | undefined,
): T[] {
  if (!isBundle(data) || !data.entry) return [];
  return data.entry.reduce((acc, item) => {
    if (item.resource) {
      acc.push(item.resource);
    }
    return acc;
  }, [] as T[]);
}
