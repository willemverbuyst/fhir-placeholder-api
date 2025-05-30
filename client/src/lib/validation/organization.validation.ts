import { z } from "zod";

export const organizationResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
  resourceType: z.literal("Organization"),
});
