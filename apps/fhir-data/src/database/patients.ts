import { Patient } from "fhir/r5";
import { getDb } from "./db";

let isInitialized = false;

function initPatientTable(): void {
  if (isInitialized) return;

  getDb().exec(`
    CREATE TABLE IF NOT EXISTS Patient (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `);
  isInitialized = true;
}

export function getPatient(id: string): Patient {
  initPatientTable();
  const row = getDb()
    .prepare("SELECT resource FROM Patient WHERE id = ?")
    .get(id) as { resource: string } | undefined;

  if (!row) {
    throw new Error(`Patient not found: ${id}`);
  }

  return JSON.parse(row.resource) as Patient;
}

export function getAllPatients(): Patient[] {
  initPatientTable();
  const rows = getDb().prepare("SELECT resource FROM Patient").all() as Array<{
    resource: string;
  }>;

  return rows.map((row) => JSON.parse(row.resource) as Patient);
}

export function cleanupPatients(): number {
  initPatientTable();
  const result = getDb().prepare("DELETE FROM Patient").run();
  return result.changes;
}

export function seedPatients(patients: Patient[]): number {
  initPatientTable();
  const database = getDb();
  const insert = database.prepare(
    "INSERT OR REPLACE INTO Patient (id, resource) VALUES (?, ?)",
  );

  // Transaction keeps the seed operation consistent and reasonably fast.
  return database.transaction(() => {
    let inserted = 0;

    for (const patient of patients) {
      if (!patient.id) {
        throw new Error("Seed patient is missing `id`");
      }

      const result = insert.run(patient.id, JSON.stringify(patient));
      inserted += result.changes;
    }

    return inserted;
  })();
}
