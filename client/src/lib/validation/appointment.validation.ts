import { z } from "zod";

const appointmentResource = z.object({
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

const appointmentBundleEntry = z.object({
  fullUrl: z.string(),
  resource: appointmentResource,
});

export const appointmentBundle = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(appointmentBundleEntry),
});
