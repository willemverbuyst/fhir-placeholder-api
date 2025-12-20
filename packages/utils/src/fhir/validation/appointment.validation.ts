import { z } from "zod";

export const appointmentResourceSchema = z.object({
  id: z.string(),
  resourceType: z.literal("Appointment"),
  status: z.enum([
    "proposed",
    "pending",
    "booked",
    "arrived",
    "fulfilled",
    "cancelled",
    "noshow",
    "entered-in-error",
    "checked-in",
    "waitlist",
  ]),
  subject: z.object({ reference: z.string() }),
  participant: z.array(
    z.object({
      actor: z.object({ reference: z.string() }),
      status: z.enum(["accepted", "declined", "tentative", "needs-action"]),
    }),
  ),
});
