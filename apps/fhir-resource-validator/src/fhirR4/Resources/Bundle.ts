import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";
import { Consent } from "./Consent";
import { Encounter } from "./Encounter";
import { Flag } from "./Flag";
import { Group } from "./Group";
import { Location } from "./Location";
import { Organization } from "./Organization";
import { Patient } from "./Patient";
import { Person } from "./Person";
import { Practitioner } from "./Practitioner";
import { PractitionerRole } from "./PractitionerRole";
import { RelatedPerson } from "./RelatedPerson";

const fhirR4Resource = z.union([
  Consent,
  Encounter,
  Flag,
  Group,
  Location,
  Organization,
  Patient,
  Person,
  Practitioner,
  PractitionerRole,
  RelatedPerson,
]);

export const Bundle = DomainResource.extend({
  resourceType: z.literal(Resources.Bundle),
  identifier: dataTypes.identifier.optional(),
  type: z.enum([
    "document",
    "message",
    "transaction",
    "transaction-response",
    "batch",
    "batch-response",
    "history",
    "searchset",
    "collection",
  ]),
  timestamp: dataTypes.instant.optional(),
  total: z.number().nonnegative().max(2_147_483_647).optional(),
  link: z
    .object({
      relation: z.string(),
      url: z.string(),
    })
    .optional(),
  entry: z
    .array(
      z.object({
        fullUrl: z.string().optional(),
        resource: fhirR4Resource.optional(),
        search: z
          .object({
            mode: z.enum(["match", "include", "outcome"]).optional(),
            score: dataTypes.decimal.optional(),
          })
          .optional(),
        request: z
          .object({
            method: z.enum(["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH"]),
            uri: z.string(),
            ifNoneMatch: z.string().optional(),
            ifModifiedSince: z.string().optional(),
            ifMatch: z.string().optional(),
            ifNoneExist: z.string().optional(),
          })
          .optional(),
        response: z
          .object({
            status: z.string(),
            location: z.string().optional(),
            etag: z.string(),
            lastModified: dataTypes.instant.optional(),
            outcome: fhirR4Resource.optional(),
          })
          .optional(),
      }),
    )
    .optional(),
  signature: dataTypes.Signature.optional(),
}).strict();

export type Bundle = z.infer<typeof Bundle>;
