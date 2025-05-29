import { z } from "zod";

const patientResource = z.object({
  id: z.string(),
  resourceType: z.literal("Patient"),
  name: z.array(z.object({ family: z.string(), given: z.array(z.string()) })),
  birthDate: z.string(),
  gender: z.enum(["male", "female", "unknown", "other"]),
  active: z.boolean(),
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
  managingOrganization: z.object({ reference: z.string() }),
  generalPractitioner: z.array(z.object({ reference: z.string() })),
  communication: z.array(
    z.object({
      language: z.object({
        coding: z.array(
          z.object({
            code: z.string(),
            system: z.string(),
            display: z.string(),
          }),
        ),
      }),
      preferred: z.boolean(),
    }),
  ),
});

const patientBundleEntry = z.object({
  fullUrl: z.string(),
  resource: patientResource,
});

const patientBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(patientBundleEntry),
});

export function validatePatientBundle(resources: unknown) {
  return patientBundle.parse(resources);
}
