import type { Bundle, Reference, Resource } from "fhir/r5";

export function hasId<T extends Resource>(data: T): data is T & { id: string } {
  return "id" in data && !!data.id;
}

export function hasResourceType<T extends Resource>(data: T): data is T {
  return "resourceType" in data && !!data.resourceType;
}

export function isBundle<T extends Resource>(
  data: T | Bundle<T> | undefined,
): data is Bundle<T> {
  return !!data && "entry" in data && !!data.entry;
}

export function isResource<T extends Resource>(
  data: T | Bundle<T> | undefined,
): data is T & { id: string } {
  return !!data && hasId(data) && hasResourceType(data);
}

export function getIdFromReference(reference: Reference) {
  return reference.reference?.split("/")[1];
}

export function getResourcesFromBundle<T extends Resource>(
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
