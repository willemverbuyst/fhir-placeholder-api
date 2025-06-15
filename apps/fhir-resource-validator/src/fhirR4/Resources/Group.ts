import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Group = DomainResource.extend({
  resourceType: z.literal(Resources.Group),
  identifier: z.array(dataTypes.identifier).optional(),
  active: z.boolean().optional(),
  type: z.enum([
    "person",
    "animal",
    "practitioner",
    "device",
    "medication",
    "substance",
  ]),
  actual: z.boolean(),
  code: dataTypes.CodeableConcept.optional(),
  name: z.string().optional(),
  quantity: z.number().int().optional(),
  managingEntity: dataTypes
    .Reference([
      Resources.Organization,
      Resources.RelatedPerson,
      Resources.Practitioner,
      Resources.PractitionerRole,
    ])
    .optional(),
  characteristic: z
    .array(
      z.object({
        code: dataTypes.CodeableConcept,
        valueCodeableConcept: dataTypes.CodeableConcept.optional(),
        valueBoolean: z.boolean().optional(),
        valueQuantity: dataTypes.Quantity.optional(),
        valueRange: dataTypes.Range.optional(),
        valueReference: dataTypes.Reference().optional(),
        exclude: z.boolean(),
        period: dataTypes.Period.optional(),
      }),
    )
    .optional(),
  member: z
    .array(
      z.object({
        entity: dataTypes.Reference([
          Resources.Patient,
          Resources.Practitioner,
          Resources.PractitionerRole,
          Resources.Device,
          Resources.Medication,
          Resources.Substance,
          Resources.Group,
        ]),
        period: dataTypes.Period.optional(),
        inactive: z.boolean().optional(),
      }),
    )
    .optional(),
})
  .strict()
  .superRefine((val, ctx) => {
    if (val.characteristic?.length) {
      val.characteristic.forEach((c) => {
        if (!c.code) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Property code is required",
          });
        }

        if (
          Object.keys(c).filter((i) =>
            ["code", "excludes", "period"].includes(i),
          ).length === 0
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "At least one of value options or extension is required",
          });
        }

        if (
          Object.keys(c).filter((i) =>
            ["code", "excludes", "period"].includes(i),
          ).length > 1
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Only one value option is allowed",
          });
        }
      });
    }
  });

export type Group = z.infer<typeof Group>;
