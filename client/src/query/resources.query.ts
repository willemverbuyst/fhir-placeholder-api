import { queryOptions } from "@tanstack/react-query";
import type { Bundle, Resource } from "fhir/r5";
import { getResourcesFromBundle, isBundle } from "../lib/fhir";
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

export function createResourcesQueryOptions<T extends Resource>({
  url,
}: {
  url: string;
}) {
  return queryOptions({
    queryKey: [url],
    queryFn: () => getResources<T>(url),
    staleTime: 1000 * 60, // 1 minute
  });
}

export async function fetchResources<T extends Resource>(
  url: string,
): Promise<Bundle<T> | T> {
  const response = await fetch(`http://localhost:8080/api/v2/r5/${url}`);

  return await response.json();
}

export async function getResources<T extends Resource>(url: string) {
  const rawData = await fetchResources<T>(url);

  if (isBundle(rawData)) {
    switch (url) {
      case "Appointment": {
        validateBundle({
          schema: getBundleSchema(appointmentResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Condition": {
        validateBundle({
          schema: getBundleSchema(conditionResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Encounter": {
        validateBundle({
          schema: getBundleSchema(encounterResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "EpisodeOfCare": {
        validateBundle({
          schema: getBundleSchema(episodeOfCareResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Observation": {
        validateBundle({
          schema: getBundleSchema(observationResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Organization": {
        validateBundle({
          schema: getBundleSchema(organizationResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Patient": {
        validateBundle({
          schema: getBundleSchema(patientResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Practitioner": {
        validateBundle({
          schema: getBundleSchema(practitionerResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "PractitionerRole": {
        validateBundle({
          schema: getBundleSchema(practitionerRoleResourceSchema),
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      default:
        throw new Error(`Validation missing for ${url}`);
    }
  }

  return [rawData];
}
