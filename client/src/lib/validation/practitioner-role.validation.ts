import { z } from "zod";

export const practitionerRoleResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("PractitionerRole"),
  organization: z.object({ reference: z.string() }),
  practitioner: z.object({ reference: z.string() }),
  active: z.boolean(),
});
