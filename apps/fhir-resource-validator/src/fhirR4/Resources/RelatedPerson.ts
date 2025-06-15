import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const RelatedPerson = DomainResource.extend({
  resourceType: z.literal(Resources.RelatedPerson),
  identifier: z.array(dataTypes.identifier).optional(),
  active: z.boolean().optional(),
  patient: dataTypes.Reference(Resources.Patient),
  relationship: z.array(dataTypes.CodeableConcept).optional(),
  name: z.array(dataTypes.HumanName).optional(),
  telecom: z.array(dataTypes.ContactPoint).optional(),
  gender: z.enum(["male", "female", "other", "unknown"]).optional(),
  birthDate: dataTypes.date.optional(),
  address: z.array(dataTypes.Address).optional(),
  photo: z.array(dataTypes.Attachment).optional(),
  period: dataTypes.Period.optional(),
  communication: z
    .array(
      z.object({
        language: dataTypes.CodeableConcept,
        preferred: z.boolean().optional(),
      }),
    )
    .optional(),
}).strict();

export type RelatedPerson = z.infer<typeof RelatedPerson>;
