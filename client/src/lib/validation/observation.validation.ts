import { z } from "zod";

const observationResource = z.object({
  id: z.string(),
  resourceType: z.literal("Observation"),
  status: z.enum([
    "registered",
    "preliminary",
    "final",
    "amended",
    "corrected",
    "cancelled",
    "entered-in-error",
    "unknown",
  ]),
  code: z.object({
    coding: z.array(
      z.object({
        code: z.string(),
        system: z.string(),
        display: z.string(),
      }),
    ),
  }),
  encounter: z.object({ reference: z.string() }),
  subject: z.object({ reference: z.string() }),
  note: z.array(z.object({ text: z.string() })),
});

const observationBundleEntry = z.object({
  fullUrl: z.string(),
  resource: observationResource,
});

const observationBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(observationBundleEntry),
});

export function validateObservationBundle(resources: unknown) {
  return observationBundle.parse(resources);
}
