import { getResourcesWithIdFromBundle, isResourceWithId } from "@repo/utils";
import { queryOptions } from "@tanstack/react-query";
import type { Bundle, Resource } from "fhir/r5";
import type { ZodSchema } from "zod";
import { type AppResourceType, FHIR_RESOURCES } from "../config/fhirResources";
import { getMappedResource, getMappedResources } from "../lib/mappedResources";
import { appointmentResourceSchema } from "../lib/validation/appointment.validation";
import { getBundleSchema } from "../lib/validation/bundle.validation";
import { conditionResourceSchema } from "../lib/validation/condition.validation";
import { encounterResourceSchema } from "../lib/validation/encounter.validation";
import { episodeOfCareResourceSchema } from "../lib/validation/episode-of-care.validation";
import { observationResourceSchema } from "../lib/validation/observation.validation";
import { organizationResourceSchema } from "../lib/validation/organization.validation";
import { patientResourceSchema } from "../lib/validation/patient.validation";
import { practitionerRoleResourceSchema } from "../lib/validation/practitioner-role.validation";
import { practitionerResourceSchema } from "../lib/validation/practitioner.validation";
import { validateResource } from "../lib/validation/validateResource";

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

function getSchemaForResourceType(resourceType: AppResourceType): ZodSchema {
  switch (resourceType) {
    case "Appointment":
      return appointmentResourceSchema;
    case "Condition":
      return conditionResourceSchema;
    case "Encounter":
      return encounterResourceSchema;
    case "EpisodeOfCare":
      return episodeOfCareResourceSchema;
    case "Observation":
      return observationResourceSchema;
    case "Organization":
      return organizationResourceSchema;
    case "Patient":
      return patientResourceSchema;
    case "Practitioner":
      return practitionerResourceSchema;
    case "PractitionerRole":
      return practitionerRoleResourceSchema;
    default:
      throw new Error(`Schema missing for ${resourceType}`);
  }
}

function isBundleWithValidation<T extends Resource>(
  data: unknown,
  schema: ZodSchema,
): data is Bundle<T> {
  try {
    getBundleSchema(schema).parse(data);
    return true;
  } catch {
    return false;
  }
}

async function getResources<T extends Resource>(
  url: string,
  resourceType: AppResourceType,
) {
  const rawData = await fetchResources<T>(url);
  const schema = getSchemaForResourceType(resourceType);
  const cardRows = FHIR_RESOURCES[resourceType].cardRows;

  // Check if it's a valid bundle first
  if (isBundleWithValidation<T>(rawData, schema)) {
    const resources = getResourcesWithIdFromBundle(rawData);
    const mappedResources = getMappedResources<T>(resources, cardRows);
    return mappedResources;
  }

  // Otherwise, try single resource
  if (isResourceWithId(rawData)) {
    validateResource({
      schema: schema,
      resource: rawData,
      resourceType,
    });

    const mappedResource = getMappedResource<T>(rawData, cardRows);
    return [mappedResource];
  }

  throw new Error("Failed to process request");
}
