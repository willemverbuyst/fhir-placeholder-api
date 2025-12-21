import { CONDITION_CLINICAL_STATUS } from "@repo/fhir-codes";
import { z } from "zod";

export const conditionResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("Condition"),
  note: z.array(z.object({ text: z.string() })),
  subject: z.object({ reference: z.string() }),
  clinicalStatus: z.object({
    coding: z.array(
      z.object({
        code: z.enum(CONDITION_CLINICAL_STATUS),
        system: z.literal(
          "http://terminology.hl7.org/CodeSystem/condition-clinical",
        ),
      }),
    ),
  }),
});
