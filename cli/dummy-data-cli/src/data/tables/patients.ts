import { Patient } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

function parsePatientJson(json: string): Patient {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Patient JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Patient JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Patient") {
    throw new Error(
      `Invalid Patient JSON: expected resourceType "Patient" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error("Invalid Patient JSON: `id` must be a string when present");
  }

  return parsed as unknown as Patient;
}

const patientTable = (db: DB) =>
  createJsonResourceTable<Patient>({
    tableName: "patient",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS patient (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parsePatientJson,
    getId: (patient) => patient.id,
  });

export function cleanupPatients(db: DB): Promise<number> {
  return patientTable(db).cleanup();
}

export function seedPatients(db: DB, patients: Patient[]): Promise<number> {
  return patientTable(db).seed(patients);
}
