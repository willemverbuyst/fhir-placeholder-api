import type { Bundle, Resource } from "fhir/r5";

export function isBundle<T extends Resource>(
  data: T | Bundle<T> | undefined,
): data is Bundle<T> {
  return !!data && "entry" in data && !!data.entry;
}
