import { Bundle, Resource } from 'fhir/r5';

export function wrapInBundle<T extends Resource>(resources: T[]): Bundle<T> {
  return {
    resourceType: 'Bundle',
    type: 'searchset',
    total: resources.length,
    entry: resources.map((resource) => ({
      fullUrl: `http://localhost:8080/api/v2/r5/${resource.resourceType}/${resource.id}`,
      resource,
    })),
  };
}
