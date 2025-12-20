import { GENDER } from "@repo/fhir-codes";
import { z } from "zod";

export const practitionerResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("Practitioner"),
  name: z.array(z.object({ family: z.string(), given: z.array(z.string()) })),
  active: z.boolean(),
  birthDate: z.string(),
  gender: z.enum(GENDER),
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
