import { hasKey, isEmptyObject } from "@repo/utils";
import type { Resource } from "fhir/r5";
import type { CardRows } from "../config/fhirResources";
import type {
  MappedResource,
  MappedResources,
} from "../interfaces/MappedResource";

export function getMappedResource<T extends Resource>(
  resource: T,
  cardRows: CardRows<T>,
): MappedResource<T> {
  const mappedResource: MappedResource<T> = {};
  for (const [k, v] of Object.entries(resource)) {
    if (!hasKey(cardRows, k)) continue;

    mappedResource[k] = cardRows[k]?.display?.(v);
  }

  return mappedResource;
}

export function getMappedResources<T extends Resource>(
  resources: T[],
  cardRows: CardRows<T>,
): MappedResources<T> {
  return resources.reduce((acc: MappedResources<T>, it) => {
    const mappedResource = getMappedResource<T>(it, cardRows);

    if (!isEmptyObject(mappedResource)) {
      acc.push(mappedResource);
    }
    return acc;
  }, []);
}
