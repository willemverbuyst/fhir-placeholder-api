import { Appointment } from "fhir/r5";
import { getDb } from "../db";
import { createJsonResourceTable } from "../jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseAppointmentJson(json: string): Appointment {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Appointment JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Appointment JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Appointment") {
    throw new Error(
      `Invalid Appointment JSON: expected resourceType "Appointment" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid Appointment JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as Appointment;
}

const appointmentTable = createJsonResourceTable<Appointment>({
  tableName: "Appointment",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Appointment (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseAppointmentJson,
  getId: (appointment) => appointment.id,
});

export function findAppointment(id: string): Appointment | undefined {
  return appointmentTable.find(id);
}

export function getAppointment(id: string): Appointment {
  return appointmentTable.get(id);
}

export function getAllAppointments(): Appointment[] {
  return appointmentTable.getAll();
}

export function cleanupAppointments(): number {
  return appointmentTable.cleanup();
}

export function seedAppointments(appointments: Appointment[]): number {
  return appointmentTable.seed(appointments);
}
