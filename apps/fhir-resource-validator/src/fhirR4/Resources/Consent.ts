import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Consent = DomainResource.extend({
  resourceType: z.literal(Resources.Consent),
  identifier: z.array(dataTypes.identifier).optional(),
  status: z.enum([
    "draft",
    "proposed",
    "active",
    "rejected",
    "inactive",
    "entered-in-error",
  ]),
  scope: dataTypes.CodeableConcept,
  category: z.array(dataTypes.CodeableConcept).min(1),
  patient: dataTypes.Reference(Resources.Patient),
  dateTime: dataTypes.dateTime.optional(),
  performer: z
    .array(
      dataTypes.Reference([
        Resources.Organization,
        Resources.Patient,
        Resources.Practitioner,
        Resources.RelatedPerson,
        Resources.PractitionerRole,
      ]),
    )
    .optional(),
  organization: z.array(dataTypes.Reference(Resources.Organization)).optional(),
  sourceAttachment: dataTypes.Attachment.optional(),
  sourceReference: dataTypes
    .Reference([
      Resources.Consent,
      Resources.DocumentReference,
      Resources.Contract,
      Resources.QuestionnaireResponse,
    ])
    .optional(),
  policy: z
    .object({
      authority: z.string().optional(),
      uri: z.string().optional(),
    })
    .optional(),
  policyRule: dataTypes.CodeableConcept.optional(),
  verification: z
    .object({
      verified: z.boolean(),
      verifiedWith: dataTypes.Reference([
        Resources.Patient,
        Resources.RelatedPerson,
      ]),
      verificationDate: dataTypes.dateTime,
    })
    .optional(),
  provision: z.unknown().optional(),
})
  .strict()
  .and(
    z.union(
      [
        z.object({
          sourceAttachment: dataTypes.Attachment,
          sourceReference: z.undefined(),
        }),
        z.object({
          sourceAttachment: z.undefined(),
          sourceReference: dataTypes.Reference(Resources.Consent),
        }),
        z.object({
          sourceAttachment: z.undefined(),
          sourceReference: z.undefined(),
        }),
      ],
      {
        errorMap: () => ({
          message:
            "Can't have both sourceAttachment and sourceReference at the same time",
        }),
      },
    ),
  );

export type Consent = z.infer<typeof Consent>;
