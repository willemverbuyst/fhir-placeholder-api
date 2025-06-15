import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Flag = DomainResource.extend({
  resourceType: z.literal(Resources.Flag),
  identifier: z.array(dataTypes.identifier).optional(),
  status: z.enum(["active", "inactive", "entered-in-error"]),
  category: z.array(dataTypes.CodeableConcept).optional(),
  code: dataTypes.CodeableConcept,
  period: dataTypes.Period.optional(),
  subject: dataTypes.Reference([
    Resources.Patient,
    Resources.Location,
    Resources.Group,
    Resources.Organization,
    Resources.Practitioner,
    Resources.PlanDefinition,
    Resources.Medication,
    Resources.Procedure,
  ]),
  encounter: dataTypes.Reference(Resources.Encounter).optional(),
  author: dataTypes
    .Reference([
      Resources.Device,
      Resources.Organization,
      Resources.Patient,
      Resources.Practitioner,
      Resources.PractitionerRole,
    ])
    .optional(),
}).strict();

export type Flag = z.infer<typeof Flag>;
