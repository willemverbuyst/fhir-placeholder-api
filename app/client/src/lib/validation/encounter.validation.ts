import { z } from "zod";

export const encounterResourceSchema = z.object({
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
