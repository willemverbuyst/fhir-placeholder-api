import { z } from "zod";

const encounterResource = z.object({
  id: z.string(),
  resourceType: z.literal("Encounter"),
  status: z.enum([
    "planned",
    "in-progress",
    "on-hold",
    "discharged",
    "completed",
    "cancelled",
    "discontinued",
    "entered-in-error",
    "unknown",
  ]),
  subject: z.object({ reference: z.string() }),
  episodeOfCare: z.array(z.object({ reference: z.string() })),
});

const encounterBundleEntry = z.object({
  fullUrl: z.string(),
  resource: encounterResource,
});

export const encounterBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(encounterBundleEntry),
});
