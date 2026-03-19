import Database from "better-sqlite3";
import { Patient } from "fhir/r5";

const DB_FILE_PATH = "fhir.db";
let db: InstanceType<typeof Database> | null = null;

function getDb(): InstanceType<typeof Database> {
  if (db) return db;

  const connection = new Database(DB_FILE_PATH);
  connection.exec(`
    CREATE TABLE IF NOT EXISTS Patient (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `);

  db = connection;
  return db;
}

export function getPatient(id: string): Patient {
  const row = getDb()
    .prepare("SELECT resource FROM Patient WHERE id = ?")
    .get(id) as { resource: string } | undefined;

  if (!row) {
    throw new Error(`Patient not found: ${id}`);
  }

  return JSON.parse(row.resource) as Patient;
}

export function getAllPatients(): Patient[] {
  const rows = getDb().prepare("SELECT resource FROM Patient").all() as Array<{
    resource: string;
  }>;

  return rows.map((row) => JSON.parse(row.resource) as Patient);
}

export function cleanupPatients(): number {
  const result = getDb().prepare("DELETE FROM Patient").run();
  return result.changes;
}

export function seedPatients(patients: Patient[]): number {
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
