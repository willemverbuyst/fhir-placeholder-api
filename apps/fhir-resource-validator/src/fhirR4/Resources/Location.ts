import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Location = DomainResource.extend({
  resourceType: z.literal(Resources.Location),
  identifier: z.array(dataTypes.identifier).optional(),
  status: z.enum(["active", "suspended", "inactive"]).optional(),
  operationalStatus: dataTypes.Coding.optional(),
  name: z.string().optional(),
  alias: z.array(z.string()).optional(),
  description: z.string().optional(),
  mode: z.enum(["instance", "kind"]),
  type: z.array(dataTypes.CodeableConcept).optional(),
  telecom: z.array(dataTypes.ContactPoint).optional(),
  address: dataTypes.Address.optional(),
  physicalType: dataTypes.CodeableConcept.optional(),
  position: z
    .object({
      longitude: dataTypes.decimal.optional(),
      latitude: dataTypes.decimal.optional(),
      altitude: dataTypes.decimal.optional(),
    })
    .optional(),
  managingOrganization: dataTypes.Reference(Resources.Organization).optional(),
  partOf: dataTypes.Reference(Resources.Location).optional(),
  hoursOfOperation: z
    .array(
      z.object({
        daysOfWeek: z
          .array(z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]))
          .optional(),
        allDay: z.boolean().optional(),
        openingTime: dataTypes.time.optional(),
        closingTime: dataTypes.time.optional(),
      }),
    )
    .optional(),
  availabitityExceptions: z.string().optional(),
  endpoint: z.array(dataTypes.Reference(Resources.Endpoint)).optional(),
}).strict();

export type Location = z.infer<typeof Location>;
