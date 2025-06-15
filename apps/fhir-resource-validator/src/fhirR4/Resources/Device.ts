import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Device = DomainResource.extend({
  resourceType: z.literal(Resources.Device),
  identifier: z.array(dataTypes.identifier).optional(),
}).strict();

export type Device = z.infer<typeof Device>;
