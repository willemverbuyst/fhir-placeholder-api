import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const PractitionerRole = DomainResource.extend({
  resourceType: z.literal(Resources.PractitionerRole),
  identifier: z.array(dataTypes.identifier).optional(),
  active: z.boolean().optional(),
  period: dataTypes.Period.optional(),
  practitioner: dataTypes.Reference(Resources.Practitioner).optional(),
  organization: dataTypes.Reference(Resources.Organization).optional(),
  code: z.array(dataTypes.CodeableConcept).optional(),
  specialty: z.array(dataTypes.CodeableConcept).optional(),
  location: z.array(dataTypes.Reference(Resources.Location)).optional(),
  healthcareService: z
    .array(dataTypes.Reference(Resources.HealthcareService))
    .optional(),
  telecom: z.array(dataTypes.ContactPoint).optional(),
  availableTime: z
    .array(
      z.object({
        daysOfWeek: z
          .array(z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]))
          .optional(),
        allDay: z.boolean().optional(),
        availableStartTime: dataTypes.time.optional(),
        availableEndTime: dataTypes.time.optional(),
      }),
    )
    .optional(),
  notAvailable: z
    .array(
      z.object({
        description: z.string(),
        during: dataTypes.Period.optional(),
      }),
    )
    .optional(),
  availabilityExceptions: z.string().optional(),
  endpoint: z.array(dataTypes.Reference(Resources.Endpoint)).optional(),
}).strict();

export type PractitionerRole = z.infer<typeof PractitionerRole>;
