import { queryOptions } from "@tanstack/react-query";
import type { Bundle, Resource } from "fhir/r5";
import { getResourcesFromBundle, isBundle } from "../lib/fhir";
import { appointmentBundle } from "../lib/validation/appointment.validation";
import { conditionBundle } from "../lib/validation/condition.validation";
import { encounterBundle } from "../lib/validation/encounter.validation";
import { episodeOfCareBundle } from "../lib/validation/episode-of-care.validation";
import { observationBundle } from "../lib/validation/observation.validation";
import { organizationBundle } from "../lib/validation/organization.validation";
import { patientBundle } from "../lib/validation/patient.validation";
import { practitionerRoleBundle } from "../lib/validation/practitioner-role.validation";
import { practitionerBundle } from "../lib/validation/practitioner.validation";
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
          schema: appointmentBundle,
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Condition": {
        validateBundle({
          schema: conditionBundle,
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Encounter": {
        validateBundle({
          schema: encounterBundle,
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "EpisodeOfCare": {
        validateBundle({
          schema: episodeOfCareBundle,
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Observation": {
        validateBundle({
          schema: observationBundle,
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Organization": {
        validateBundle({
          schema: organizationBundle,
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Patient": {
        validateBundle({
          schema: patientBundle,
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "Practitioner": {
        validateBundle({
          schema: practitionerBundle,
          resources: rawData,
          resourceType: url,
        });
        return getResourcesFromBundle(rawData);
      }

      case "PractitionerRole": {
        validateBundle({
          schema: practitionerRoleBundle,
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
