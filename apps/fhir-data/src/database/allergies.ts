import { AllergyIntolerance } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

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

const allergyIntoleranceTable = createJsonResourceTable<AllergyIntolerance>({
  tableName: "AllergyIntolerance",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS AllergyIntolerance (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseAllergyIntoleranceJson,
  getId: (allergyIntolerance) => allergyIntolerance.id,
});

export function findAllergyIntolerance(
  id: string,
): AllergyIntolerance | undefined {
  return allergyIntoleranceTable.find(id);
}

export function getAllergyIntolerance(id: string): AllergyIntolerance {
  return allergyIntoleranceTable.get(id);
}

export function getAllAllergyIntolerances(): AllergyIntolerance[] {
  return allergyIntoleranceTable.getAll();
}

export function cleanupAllergies(): number {
  return allergyIntoleranceTable.cleanup();
}

export function seedAllergies(allergies: AllergyIntolerance[]): number {
  return allergyIntoleranceTable.seed(allergies);
}
