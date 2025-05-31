import { type ZodSchema, z } from "zod";

export function validateResource({
  schema,
  resource,
  resourceType,
}: {
  schema: ZodSchema;
  resource: unknown;
  resourceType: string;
}) {
  try {
    return schema.parse(resource);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation details:", err.flatten());
      throw new Error(`Validation failed for ${resourceType}`);
    }
  }
}
