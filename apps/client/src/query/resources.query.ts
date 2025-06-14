import {
  getResourcesWithIdFromBundle,
  isBundle,
  isResourceWithId,
} from "@repo/utils/fhir";
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
import { validateBundle } from "../lib/validation/validateBundle";
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

export async function fetchResources<T extends Resource>(
  url: string,
): Promise<Bundle<T> | T> {
  const response = await fetch(`http://localhost:8080/api/v2/r5/${url}`);

  return await response.json();
}

export async function getResources<T extends Resource>(
  url: string,
  resourceType: AppResourceType,
) {
  const rawData = await fetchResources<T>(url);

  let schema: ZodSchema;
  if (isBundle(rawData)) {
    switch (resourceType) {
      case "Appointment":
        schema = appointmentResourceSchema;
        break;

      case "Condition":
        schema = conditionResourceSchema;
        break;

      case "Encounter":
        schema = encounterResourceSchema;
        break;

      case "EpisodeOfCare":
        schema = episodeOfCareResourceSchema;
        break;

      case "Observation":
        schema = observationResourceSchema;
        break;

      case "Organization":
        schema = organizationResourceSchema;
        break;

      case "Patient":
        schema = patientResourceSchema;
        break;

      case "Practitioner":
        schema = practitionerResourceSchema;
        break;

      case "PractitionerRole":
        schema = practitionerRoleResourceSchema;
        break;

      default:
        throw new Error(`Validation missing for ${url}`);
    }

    validateBundle({
      schema: getBundleSchema(schema),
      resources: rawData,
      resourceType,
    });
    const resources = getResourcesWithIdFromBundle(rawData);
    const cardRows = FHIR_RESOURCES[resourceType].cardRows;
    const mappedResources = getMappedResources<T>(resources, cardRows);

    return mappedResources;
  }

  if (isResourceWithId(rawData)) {
    let schema: ZodSchema;
    switch (resourceType) {
      case "Practitioner": {
        schema = practitionerResourceSchema;
        break;
      }

      default:
        throw new Error(`Validation missing for ${url}`);
    }

    validateResource({
      schema: schema,
      resource: rawData,
      resourceType,
    });
    const cardRows = FHIR_RESOURCES[resourceType].cardRows;
    const mappedResources = getMappedResource<T>(rawData, cardRows);

    return [mappedResources];
  }

  throw new Error("Failed to process request");
}
