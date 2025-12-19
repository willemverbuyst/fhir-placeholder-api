import { Bundle, Resource } from "fhir/r5";

export function hasId<T extends Resource>(data: T): data is T & { id: string } {
  return (
    Object.hasOwn(data, "id") &&
    typeof data.id === "string" &&
    data.id.length > 0
  );
}

export function hasResourceType<T extends Resource>(data: T): data is T {
  return "resourceType" in data && !!data.resourceType;
}

export function isResourceWithId<T extends Resource>(
  data: T | Bundle<T> | undefined
): data is T & { id: string } {
  return !!data && hasId(data) && hasResourceType(data);
}
