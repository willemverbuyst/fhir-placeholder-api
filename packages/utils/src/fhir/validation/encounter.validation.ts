import { ENCOUNTER_STATUS } from "@repo/fhir-codes";
import { z } from "zod";

export const encounterResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("Encounter"),
  status: z.enum(ENCOUNTER_STATUS),
  subject: z.object({ reference: z.string() }),
  episodeOfCare: z.array(z.object({ reference: z.string() })),
});
