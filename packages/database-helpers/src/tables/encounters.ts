import { Encounter } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

function parseEncounterJson(json: string): Encounter {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Encounter JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Encounter JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Encounter") {
    throw new Error(
      `Invalid Encounter JSON: expected resourceType "Encounter" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid Encounter JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as Encounter;
}

const encounterTable = (db: DB) =>
  createJsonResourceTable<Encounter>({
    tableName: "encounter",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS encounter (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parseEncounterJson,
    getId: (encounter) => encounter.id,
  });

export function cleanupEncounters(db: DB): Promise<number> {
  return encounterTable(db).cleanup();
}

export function seedEncounters(
  db: DB,
  encounters: Encounter[],
): Promise<number> {
  return encounterTable(db).seed(encounters);
}
