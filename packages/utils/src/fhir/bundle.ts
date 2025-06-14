import { Bundle, Resource } from "fhir/r5";
import { hasId, hasResourceType } from "./resource";

export function isBundle<T extends Resource>(
  data: T | Bundle<T> | undefined,
): data is Bundle<T> {
  return !!data && "entry" in data && !!data.entry;
}

export function getResourcesWithIdFromBundle<T extends Resource>(
  data: Bundle<T> | undefined,
): (T & { id: string })[] {
  if (!isBundle(data) || !data.entry) return [];
  return data.entry.reduce(
    (acc, item) => {
      if (
        item.resource &&
        hasId(item.resource) &&
        hasResourceType(item.resource)
      ) {
        acc.push(item.resource);
      }
      return acc;
    },
    [] as (T & { id: string })[],
  );
}
