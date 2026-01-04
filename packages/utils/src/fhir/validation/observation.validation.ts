import { OBSERVATION_STATUS } from "@repo/fhir-terminology";
import { z } from "zod";

export const observationResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("Observation"),
  status: z.enum(OBSERVATION_STATUS),
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
