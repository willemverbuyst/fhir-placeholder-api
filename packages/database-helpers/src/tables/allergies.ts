import { AllergyIntolerance } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

function parseAllergyIntoleranceJson(json: string): AllergyIntolerance {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse AllergyIntolerance JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid AllergyIntolerance JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "AllergyIntolerance") {
    throw new Error(
      `Invalid AllergyIntolerance JSON: expected resourceType "AllergyIntolerance" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid AllergyIntolerance JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as AllergyIntolerance;
}

const allergyIntoleranceTable = (db: DB) =>
  createJsonResourceTable<AllergyIntolerance>({
    tableName: "allergy_intolerance",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS allergy_intolerance (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parseAllergyIntoleranceJson,
    getId: (allergyIntolerance) => allergyIntolerance.id,
  });

export function findAllergy(
  db: DB,
  id: string,
): Promise<AllergyIntolerance | undefined> {
  return allergyIntoleranceTable(db).find(id);
}

export function getAllergy(db: DB, id: string): Promise<AllergyIntolerance> {
  return allergyIntoleranceTable(db).get(id);
}

export function getAllAllergies(db: DB): Promise<AllergyIntolerance[]> {
  return allergyIntoleranceTable(db).getAll();
}

export function cleanupAllergies(db: DB): Promise<number> {
  return allergyIntoleranceTable(db).cleanup();
}

export function seedAllergies(
  db: DB,
  allergies: AllergyIntolerance[],
): Promise<number> {
  return allergyIntoleranceTable(db).seed(allergies);
}
