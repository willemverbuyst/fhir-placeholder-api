import { z } from "zod";

const organizationResource = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
  resourceType: z.literal("Organization"),
});

const organizationBundleEntry = z.object({
  fullUrl: z.string(),
  resource: organizationResource,
});

export const organizationBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(organizationBundleEntry),
});
