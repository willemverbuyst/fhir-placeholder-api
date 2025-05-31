import { type ZodSchema, z } from "zod";

export function getBundleSchema(resourceSchema: ZodSchema) {
  return z.object({
    resourceType: z.literal("Bundle"),
    type: z.literal("searchset"),
    total: z.number(),
    entry: z.array(
      z.object({
        fullUrl: z.string(),
        resource: resourceSchema,
      }),
    ),
  });
}
