import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Practitioner = DomainResource.extend({
  resourceType: z.literal(Resources.Practitioner),
  identifier: z.array(dataTypes.identifier).optional(),
  active: z.boolean().optional(),
  name: z.array(dataTypes.HumanName).optional(),
  telecom: z.array(dataTypes.ContactPoint).optional(),
  address: z.array(dataTypes.Address).optional(),
  gender: z.enum(["male", "female", "other", "unknown"]).optional(),
  birthDate: dataTypes.date.optional(),
  photo: z.array(dataTypes.Attachment).optional(),
  qualification: z
    .array(
      z.object({
        identifier: z.array(dataTypes.identifier).optional(),
        code: dataTypes.CodeableConcept,
        period: dataTypes.Period.optional(),
        issuer: dataTypes.Reference(Resources.Organization).optional(),
      }),
    )
    .optional(),
  communication: z.array(dataTypes.CodeableConcept).optional(),
}).strict();

export type Practitioner = z.infer<typeof Practitioner>;
