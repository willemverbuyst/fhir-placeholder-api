import { z } from "zod";
import { DomainResource } from "../DomainResource";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";

export const DocumentReference = DomainResource.extend({
  resourceType: z.literal(Resources.DocumentReference),
  identifier: z.array(dataTypes.identifier).optional(),
}).strict();

export type DocumentReference = z.infer<typeof DocumentReference>;
