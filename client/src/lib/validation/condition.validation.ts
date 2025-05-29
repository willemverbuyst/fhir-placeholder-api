import { z } from "zod";

const conditionResource = z.object({
  id: z.string(),
  resourceType: z.literal("Condition"),
  note: z.array(z.object({ text: z.string() })),
  subject: z.object({ reference: z.string() }),
  clinicalStatus: z.object({
    coding: z.array(
      z.object({
        code: z.enum([
          "active",
          "recurrence",
          "relapse",
          "inactive",
          "remission",
          "resolved",
          "unknown",
        ]),
        system: z.literal(
          "http://terminology.hl7.org/CodeSystem/condition-clinical",
        ),
      }),
    ),
  }),
});

const conditionBundleEntry = z.object({
  fullUrl: z.string(),
  resource: conditionResource,
});

const conditionBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(conditionBundleEntry),
});

export function validateConditionBundle(resources: unknown) {
  return conditionBundle.parse(resources);
}
