import type { Resource } from 'fhir/r5';

export type MappedResource<T extends Resource> = Partial<
  Record<keyof T, string | string[] | undefined>
>;
export type MappedResources<T extends Resource> = MappedResource<T>[];
