import { Appointment } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

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

const appointmentTable = (db: DB) =>
  createJsonResourceTable<Appointment>({
    tableName: "Appointment",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS Appointment (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
    getDb: () => db.getDb(),
    parse: parseAppointmentJson,
    getId: (appointment) => appointment.id,
  });

export function findAppointment(db: DB, id: string): Appointment | undefined {
  return appointmentTable(db).find(id);
}

export function getAppointment(db: DB, id: string): Appointment {
  return appointmentTable(db).get(id);
}

export function getAllAppointments(db: DB): Appointment[] {
  return appointmentTable(db).getAll();
}

export function cleanupAppointments(db: DB): number {
  return appointmentTable(db).cleanup();
}

export function seedAppointments(db: DB, appointments: Appointment[]): number {
  return appointmentTable(db).seed(appointments);
}
