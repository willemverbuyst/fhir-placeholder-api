import { hasKey, isEmptyObject } from '@repo/utils';
import type { Resource } from 'fhir/r5';
import type {
  MappedResource,
  MappedResources,
} from '../../interfaces/MappedResource';
import type { CardRows } from './config';

export function getMappedResource<T extends Resource>(
  resource: T & { id: string },
  cardRows: CardRows<T>
): MappedResource<T> {
  const mappedResource: MappedResource<T> = {};

  for (const [k, v] of Object.entries(resource)) {
    const key = k as keyof T;
    if (!hasKey(cardRows, key)) continue;

    mappedResource[key] = cardRows[key]?.display?.(v);
  }
  mappedResource.id = resource.id;
  return mappedResource;
}

export function getMappedResources<T extends Resource>(
  resources: (T & { id: string })[],
  cardRows: CardRows<T>
): MappedResources<T> {
  return resources.reduce((acc: MappedResources<T>, it) => {
    const mappedResource = getMappedResource<T>(it, cardRows);

    if (!isEmptyObject(mappedResource)) {
      acc.push(mappedResource);
    }
    return acc;
  }, []);
}
