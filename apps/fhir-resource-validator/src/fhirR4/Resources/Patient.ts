import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Patient = DomainResource.extend({
  resourceType: z.literal(Resources.Patient),
  identifier: z.array(dataTypes.identifier).optional(),
  active: z.boolean().optional(),
  name: z.array(dataTypes.HumanName).optional(),
  telecom: z.array(dataTypes.ContactPoint).optional(),
  gender: z.enum(["male", "female", "other", "unknown"]).optional(),
  birthDate: dataTypes.date.optional(),
  deceasedBoolean: z.boolean().optional(),
  deceasedDateTime: dataTypes.dateTime.optional(),
  address: z.array(dataTypes.Address).optional(),
  maritalStatus: dataTypes.CodeableConcept.optional(),
  multipleBirthBoolean: z.boolean().optional(),
  multipleBirthInteger: z.number().int().optional(),
  photo: z.array(dataTypes.Attachment).optional(),
  contact: z
    .array(
      z.object({
        relationship: z.array(dataTypes.CodeableConcept).optional(),
        name: dataTypes.HumanName.optional(),
        telemcom: z.array(dataTypes.ContactPoint).optional(),
        address: dataTypes.Address.optional(),
        gender: z.enum(["male", "female", "other", "unknown"]).optional(),
        organization: dataTypes.Reference(Resources.Organization).optional(),
        period: dataTypes.Period.optional(),
      }),
    )
    .optional(),
  communication: z
    .array(
      z.object({
        language: dataTypes.CodeableConcept,
        preferred: z.boolean().optional(),
      }),
    )
    .optional(),
  generalPractitioner: z
    .array(
      dataTypes.Reference([
        Resources.Organization,
        Resources.Practitioner,
        Resources.PractitionerRole,
      ]),
    )
    .optional(),
  managingOrganization: dataTypes.Reference(Resources.Organization).optional(),
  link: z
    .array(
      z.object({
        other: dataTypes.Reference([
          Resources.Patient,
          Resources.RelatedPerson,
        ]),
        type: z.enum(["replaced-by", "replaces", "refer", "seealso"]),
      }),
    )
    .optional(),
})
  .strict()
  .and(
    z.union(
      [
        z.object({
          deceasedBoolean: z.boolean(),
          deceasedDateTime: z.undefined(),
        }),
        z.object({
          deceasedBoolean: z.undefined(),
          deceasedDateTime: dataTypes.dateTime,
        }),
        z.object({
          deceasedBoolean: z.undefined(),
          deceasedDateTime: z.undefined(),
        }),
      ],
      {
        errorMap: () => ({
          message:
            "Can't have both deceasedBoolean and deceasedDateTime at the same time",
        }),
      },
    ),
  )
  .and(
    z.union(
      [
        z.object({
          multipleBirthBoolean: z.boolean(),
          multipleBirthInteger: z.undefined(),
        }),
        z.object({
          multipleBirthBoolean: z.undefined(),
          multipleBirthInteger: z.number().int(),
        }),
        z.object({
          multipleBirthBoolean: z.undefined(),
          multipleBirthInteger: z.undefined(),
        }),
      ],
      {
        errorMap: () => ({
          message:
            "Can't have both multipleBirthBoolean and multipleBirthInteger at the same time",
        }),
      },
    ),
  );

export type Patient = z.infer<typeof Patient>;
