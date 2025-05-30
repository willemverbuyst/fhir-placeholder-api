import { queryOptions } from "@tanstack/react-query";
import type { Bundle, Resource } from "fhir/r5";
import { FHIR_RESOURCES } from "../config/fhirResources";
import { getResourcesFromBundle, isBundle, isResource } from "../lib/fhir";
import { getMappedResources } from "../lib/mappedResources";
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
  resourceType: string;
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
  resourceType: string,
) {
  const rawData = await fetchResources<T>(url);

  if (isBundle(rawData)) {
    switch (resourceType) {
      case "Appointment": {
        validateBundle({
          schema: getBundleSchema(appointmentResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.Appointment.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      case "Condition": {
        validateBundle({
          schema: getBundleSchema(conditionResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.Condition.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      case "Encounter": {
        validateBundle({
          schema: getBundleSchema(encounterResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.Encounter.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      case "EpisodeOfCare": {
        validateBundle({
          schema: getBundleSchema(episodeOfCareResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.EpisodeOfCare.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      case "Observation": {
        validateBundle({
          schema: getBundleSchema(observationResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.Observation.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      case "Organization": {
        validateBundle({
          schema: getBundleSchema(organizationResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.Organization.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      case "Patient": {
        validateBundle({
          schema: getBundleSchema(patientResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.Patient.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      case "Practitioner": {
        validateBundle({
          schema: getBundleSchema(practitionerResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.Practitioner.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      case "PractitionerRole": {
        validateBundle({
          schema: getBundleSchema(practitionerRoleResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        const resources = getResourcesFromBundle(rawData);
        const cardRows = FHIR_RESOURCES.PractitionerRole.cardRows;
        const mappedResources = getMappedResources<T>(resources, cardRows);

        return mappedResources;
      }

      default:
        throw new Error(`Validation missing for ${url}`);
    }
  }

  if (isResource(rawData)) {
    // handle CapabilityStatement
    validateResource({
      schema: practitionerResourceSchema,
      resource: rawData,
      resourceType: "Practitioner",
    });

    const cardRows = FHIR_RESOURCES.Practitioner.cardRows;
    const mappedResources = getMappedResources<T>([rawData], cardRows);
    return mappedResources;
  }

  throw new Error("Failed to process request");
}
