import { Practitioner } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parsePractitionerJson(json: string): Practitioner {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Practitioner JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Practitioner JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Practitioner") {
    throw new Error(
      `Invalid Practitioner JSON: expected resourceType "Practitioner" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid Practitioner JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as Practitioner;
}

const practitionerTable = createJsonResourceTable<Practitioner>({
  tableName: "Practitioner",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Practitioner (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parsePractitionerJson,
  getId: (practitioner) => practitioner.id,
});

export function findPractitioner(id: string): Practitioner | undefined {
  return practitionerTable.find(id);
}

export function getPractitioner(id: string): Practitioner {
  return practitionerTable.get(id);
}

export function getAllPractitioners(): Practitioner[] {
  return practitionerTable.getAll();
}

export function cleanupPractitioners(): number {
  return practitionerTable.cleanup();
}

export function seedPractitioners(practitioners: Practitioner[]): number {
  return practitionerTable.seed(practitioners);
}
