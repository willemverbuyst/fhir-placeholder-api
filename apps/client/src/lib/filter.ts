import type { Resource } from "fhir/r5";
import type { CardRows } from "../config/fhirResources";
import type { Filter } from "../interfaces/Filter";
import type { MappedResources } from "../interfaces/MappedResource";
import { hasKeyWithValue, typedEntries } from "./utils";

export function genericFilter<T>(
  resource: T,
  filterProperties: Array<Filter<T>>,
): boolean {
  return filterProperties.every((filter) => {
    const key = filter.property as keyof T;

    return resource[key] === filter.value;
  });
}

export function getFilterKeys<T extends Resource>(
  cardRows: CardRows<T>,
  mappedResources: MappedResources<T>,
) {
  return typedEntries(cardRows).reduce(
    (acc, it) => {
      const [k, v] = it;

      if (!v?.filter) return acc;

      const filterKeys = new Set<string>();
      for (const r of mappedResources) {
        if (hasKeyWithValue(r, k)) {
          filterKeys.add(String(r[k]));
        }
      }

      acc[k] = filterKeys;

      return acc;
    },
    {} as Record<keyof T, Set<string>>,
  );
}
