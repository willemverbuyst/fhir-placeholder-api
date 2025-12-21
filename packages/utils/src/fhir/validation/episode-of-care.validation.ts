import { EPISODE_OF_CARE_STATUS } from "@repo/fhir-codes";
import { z } from "zod";

export const episodeOfCareResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("EpisodeOfCare"),
  status: z.enum(EPISODE_OF_CARE_STATUS),
  patient: z.object({ reference: z.string() }),
  diagnosis: z.array(
    z.object({
      condition: z.array(
        z.object({ reference: z.object({ reference: z.string() }) }),
      ),
    }),
  ),
  type: z.array(
    z.object({
      coding: z.array(
        z.object({
          code: z.string(),
          system: z.literal(
            "http://terminology.hl7.org/CodeSystem/episodeofcare-type",
          ),
          display: z.string(),
        }),
      ),
    }),
  ),
});
