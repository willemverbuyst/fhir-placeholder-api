import {
  APPOINTMENT_PARTICIPANT_STATUS,
  APPOINTMENT_STATUS,
} from "@repo/fhir-codes";
import { z } from "zod";

export const appointmentResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("Appointment"),
  status: z.enum(APPOINTMENT_STATUS),
  subject: z.object({ reference: z.string() }),
  participant: z.array(
    z.object({
      actor: z.object({ reference: z.string() }),
      status: z.enum(APPOINTMENT_PARTICIPANT_STATUS),
    }),
  ),
});
