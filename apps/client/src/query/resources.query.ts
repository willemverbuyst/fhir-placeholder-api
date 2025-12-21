import { getResourcesFromBundle } from "@repo/utils";
import { queryOptions } from "@tanstack/react-query";
import type { Bundle, Resource } from "fhir/r5";
import { type AppResourceType, FHIR_RESOURCES } from "../config/fhirResources";
import { getMappedResource, getMappedResources } from "../lib/mappedResources";
import {
  getSchemaForResourceType,
  isBundleWithValidation,
  isResourceWithValidation,
} from "./validation";

export function createResourcesQueryOptions<T extends Resource>({
  resourceType,
  searchParams,
}: {
  resourceType: AppResourceType;
  searchParams?: string;
}) {
  const url = searchParams ? resourceType + searchParams : resourceType;
  return queryOptions({
    queryKey: [url],
    queryFn: () => getResources<T>(url, resourceType),
    staleTime: 1000 * 60, // 1 minute
  });
}

async function fetchResources<T extends Resource>(
  url: string,
): Promise<Bundle<T> | T> {
  const response = await fetch(`http://localhost:8080/api/v2/r5/${url}`);

  return await response.json();
}

async function getResources<T extends Resource>(
  url: string,
  resourceType: AppResourceType,
) {
  const rawData = await fetchResources<T>(url);
  const schema = getSchemaForResourceType(resourceType);
  const cardRows = FHIR_RESOURCES[resourceType].cardRows;

  const bundleValidation = isBundleWithValidation(rawData, schema);
  let error = bundleValidation.error;
  if (bundleValidation.isBundle) {
    const resources = getResourcesFromBundle(rawData as Bundle<T>);
    const mappedResources = getMappedResources<T>(resources, cardRows);
    return mappedResources;
  }

  const resourceValidation = isResourceWithValidation(rawData, schema);
  error = resourceValidation.error;
  if (resourceValidation.isResource) {
    const mappedResource = getMappedResource<T>(rawData as T, cardRows);
    return [mappedResource];
  }

  throw new Error(`Failed to process request: ${error}`);
}
