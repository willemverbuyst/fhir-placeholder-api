import { z } from "zod";

const practitionerResource = z.object({
  id: z.string(),
  resourceType: z.literal("Practitioner"),
  name: z.array(z.object({ family: z.string(), given: z.array(z.string()) })),
  active: z.boolean(),
  birthDate: z.string(),
  gender: z.enum(["male", "female", "unknown", "other"]),
  telecom: z.array(
    z.object({ use: z.string(), system: z.string(), value: z.string() }),
  ),
  address: z.array(
    z.object({
      use: z.string(),
      type: z.string(),
      line: z.array(z.string()),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string(),
    }),
  ),
});

const practitionerBundleEntry = z.object({
  fullUrl: z.string(),
  resource: practitionerResource,
});

const practitionerBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(practitionerBundleEntry),
});

export function validatePractitionerBundle(resources: unknown) {
  return practitionerBundle.parse(resources);
}
