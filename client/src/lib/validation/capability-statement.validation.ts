import { z } from "zod";

export const capabilityStatementResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("CapabilityStatement"),
  status: z.literal("active"),
  date: z.string(),
  kind: z.literal("instance"),
  fhirVersion: z.string(),
  format: z.array(z.literal("json")),
  rest: z.array(
    z.object({
      mode: z.string(),
      resource: z.array(
        z.object({
          type: z.string(),
          interaction: z.array(z.object({ code: z.string() })),
          searchParam: z
            .array(
              z.object({
                name: z.string(),
                definition: z.string(),
                type: z.string(),
                documentation: z.string(),
              }),
            )
            .optional(),
        }),
      ),
    }),
  ),
});
