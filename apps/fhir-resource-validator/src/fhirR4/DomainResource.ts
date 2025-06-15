import { z } from "zod";
import { dataTypes } from "./dataTypes";

export const Resource = z
  .object({
    id: dataTypes.id.optional(),
    meta: dataTypes.Meta.optional(),
    implicitRules: z.string().optional(),
    language: z.string().optional(),
  })
  .strict();

export const DomainResource = Resource.extend({
  text: dataTypes.Narrative.optional(),
  contained: Resource.optional(),
  extension: z.array(dataTypes.extension).optional(),
  modifierExtension: z.array(dataTypes.extension).optional(),
}).strict();
