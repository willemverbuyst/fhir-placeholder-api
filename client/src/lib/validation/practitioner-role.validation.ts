import { z } from "zod";

const practitionerRoleResource = z.object({
  id: z.string(),
  resourceType: z.literal("PractitionerRole"),
  organization: z.object({ reference: z.string() }),
  practitioner: z.object({ reference: z.string() }),
  active: z.boolean(),
});

const practitionerRoleBundleEntry = z.object({
  fullUrl: z.string(),
  resource: practitionerRoleResource,
});

const practitionerRoleBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(practitionerRoleBundleEntry),
});

export function validatePractitionerRoleBundle(resources: unknown) {
  return practitionerRoleBundle.parse(resources);
}
