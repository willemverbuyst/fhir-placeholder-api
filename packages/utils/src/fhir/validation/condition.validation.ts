import { CONDITION_CLINICAL_STATUS } from "@repo/fhir-terminology";
import { z } from "zod";

const clinicalStatusCodingSchema = z
  .object({
    code: z.string(),
    system: z.string(),
  })
  .refine(
    (value) =>
      CONDITION_CLINICAL_STATUS.some(
        (allowed) =>
          allowed.code === value.code && allowed.system === value.system,
      ),
    {
      message: "Invalid clinical status coding",
    },
  );

export const conditionResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("Condition"),
  note: z.array(z.object({ text: z.string() })),
  subject: z.object({ reference: z.string() }),
  clinicalStatus: z.object({
    coding: z.array(clinicalStatusCodingSchema),
  }),
});
