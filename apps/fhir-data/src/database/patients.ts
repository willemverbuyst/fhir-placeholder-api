import { Patient } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

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

const patientTable = createJsonResourceTable<Patient>({
  tableName: "Patient",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Patient (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parsePatientJson,
  getId: (patient) => patient.id,
});

export function findPatient(id: string): Patient | undefined {
  return patientTable.find(id);
}

export function getPatient(id: string): Patient {
  return patientTable.get(id);
}

export function getAllPatients(): Patient[] {
  return patientTable.getAll();
}

export function cleanupPatients(): number {
  return patientTable.cleanup();
}

export function seedPatients(patients: Patient[]): number {
  return patientTable.seed(patients);
}
