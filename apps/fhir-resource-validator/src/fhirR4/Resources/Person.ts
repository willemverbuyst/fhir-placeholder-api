import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Person = DomainResource.extend({
  resourceType: z.literal(Resources.Person),
  identifier: z.array(dataTypes.identifier).optional(),
  name: z.array(dataTypes.HumanName).optional(),
  telecom: z.array(dataTypes.ContactPoint).optional(),
  gender: z.enum(["male", "female", "other", "unknown"]).optional(),
  birthDate: dataTypes.date.optional(),
  address: z.array(dataTypes.Address).optional(),
  photo: dataTypes.Attachment.optional(),
  managingOrganization: dataTypes.Reference(Resources.Organization).optional(),
  active: z.boolean().optional(),
  link: z
    .array(
      z.object({
        target: dataTypes.Reference([
          Resources.Patient,
          Resources.Practitioner,
          Resources.RelatedPerson,
          Resources.Person,
        ]),
        assurance: z.enum(["level1", "level2", "level3", "level4"]).optional(),
      }),
    )
    .optional(),
}).strict();

export type Person = z.infer<typeof Person>;
