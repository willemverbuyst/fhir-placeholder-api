import { z } from "zod";

export const resourceCountsSchema = z.object({
  patients: z.number(),
  episodes: z.number(),
  conditions: z.number(),
  organizations: z.number(),
  practitioners: z.number(),
  practitionerRoles: z.number(),
  encounters: z.number(),
  observations: z.number(),
  appointments: z.number(),
});

export type ResourceCountsSchema = z.infer<typeof resourceCountsSchema>;
