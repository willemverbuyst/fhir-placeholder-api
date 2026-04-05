import { Practitioner } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

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

const practitionerTable = (db: DB) =>
  createJsonResourceTable<Practitioner>({
    tableName: "practitioner",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS practitioner (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parsePractitionerJson,
    getId: (practitioner) => practitioner.id,
  });

export function cleanupPractitioners(db: DB): Promise<number> {
  return practitionerTable(db).cleanup();
}

export function seedPractitioners(
  db: DB,
  practitioners: Practitioner[],
): Promise<number> {
  return practitionerTable(db).seed(practitioners);
}
