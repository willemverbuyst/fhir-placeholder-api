import Database from "better-sqlite3";

const DB_FILE_PATH = "fhir.db";
let db: InstanceType<typeof Database> | null = null;

export function getDb(): InstanceType<typeof Database> {
  if (db) return db;
  db = new Database(DB_FILE_PATH);
  return db;
}
