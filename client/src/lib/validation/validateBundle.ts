import { type ZodSchema, z } from "zod";

export function validateBundle({
  schema,
  resources,
  resourceType,
}: {
  schema: ZodSchema;
  resources: unknown;
  resourceType: string;
}) {
  try {
    return schema.parse(resources);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation details:", err.flatten());
      throw new Error(`Validation failed for ${resourceType}`);
    }
  }
}
