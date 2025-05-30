import { z } from "zod";

const episodeOfCareResource = z.object({
  id: z.string(),
  resourceType: z.literal("EpisodeOfCare"),
  status: z.enum([
    "planned",
    "waitlist",
    "active",
    "onhold",
    "finished",
    "cancelled",
    "entered-in-error",
  ]),
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

const episodeOfCareBundleEntry = z.object({
  fullUrl: z.string(),
  resource: episodeOfCareResource,
});

export const episodeOfCareBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(episodeOfCareBundleEntry),
});
