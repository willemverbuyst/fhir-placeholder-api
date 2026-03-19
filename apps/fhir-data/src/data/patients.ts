import Database from "better-sqlite3";
import { Patient } from "fhir/r5";

const examplePatient = {
  resourceType: "Patient",
  id: "example-patient-1",
  identifier: [
    {
      use: "usual",
      type: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            code: "MR",
          },
        ],
      },
      system: "urn:oid:1.2.36.146.595.217.0.1",
      value: "12345",
      period: { start: "2001-05-06" },
      assigner: { display: "Acme Healthcare" },
    },
  ],
  active: true,
  name: [
    { use: "official", family: "Chalmers", given: ["Peter", "James"] },
    { use: "usual", given: ["Jim"] },
    {
      use: "maiden",
      family: "Windsor",
      given: ["Peter", "James"],
      period: { end: "2002" },
    },
  ],
  telecom: [
    { use: "home" },
    { system: "phone", value: "(03) 5555 6473", use: "work", rank: 1 },
    { system: "phone", value: "(03) 3410 5613", use: "mobile", rank: 2 },
    {
      system: "phone",
      value: "(03) 5555 8834",
      use: "old",
      period: { end: "2014" },
    },
  ],
  gender: "male",
  birthDate: "1974-12-25",
  _birthDate: {
    extension: [
      {
        url: "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
        valueDateTime: "1974-12-25T14:35:45-05:00",
      },
    ],
  },
  deceasedBoolean: false,
  address: [
    {
      use: "home",
      type: "both",
      text: "534 Erewhon St New York, Rainbow, Vic 3999",
      line: ["534 Erewhon St"],
      city: "New York",
      district: "Rainbow",
      state: "Vic",
      postalCode: "3999",
      period: { start: "1974-12-25" },
    },
  ],
};

const patients: Patient[] = [examplePatient as Patient];

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

export function seedPatients(): number {
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

seedPatients();
const patientsFromDb = getAllPatients();
console.log(patientsFromDb);
