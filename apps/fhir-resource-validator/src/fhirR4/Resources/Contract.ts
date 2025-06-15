import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const Contract = DomainResource.extend({
  resourceType: z.literal(Resources.Contract),
  identifier: z.array(dataTypes.identifier).optional(),
}).strict();

export type Contract = z.infer<typeof Contract>;
