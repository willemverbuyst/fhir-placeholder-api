import {
  appointmentResourceSchema,
  capabilityStatementResourceSchema,
  conditionResourceSchema,
  encounterResourceSchema,
  episodeOfCareResourceSchema,
  getBundleSchema,
  observationResourceSchema,
  organizationResourceSchema,
  patientResourceSchema,
  practitionerResourceSchema,
  practitionerRoleResourceSchema,
} from "@repo/utils";
import { ZodError, ZodSchema } from "zod";
import { AppResourceType } from "@/config/fhir-resources";

export function getSchemaForResourceType(
  resourceType: AppResourceType | "CapabilityStatement",
): ZodSchema {
  switch (resourceType) {
    case "Appointment":
      return appointmentResourceSchema;
    case "CapabilityStatement":
      return capabilityStatementResourceSchema;
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

export function isBundleWithValidation(
  data: unknown,
  schema: ZodSchema,
): { isBundle: boolean; error: string | null } {
  try {
    getBundleSchema(schema).parse(data);
    return { isBundle: true, error: null };
  } catch (error) {
    return {
      isBundle: false,
      error: error instanceof ZodError ? error.message : "Unknown error",
    };
  }
}

export function isResourceWithValidation(
  data: unknown,
  schema: ZodSchema,
): { isResource: boolean; error: string | null } {
  try {
    schema.parse(data);
    return { isResource: true, error: null };
  } catch (error) {
    return {
      isResource: false,
      error: error instanceof ZodError ? error.message : "Unknown error",
    };
  }
}
