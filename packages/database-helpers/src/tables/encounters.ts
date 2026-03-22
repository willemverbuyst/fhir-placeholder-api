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
    tableName: "Encounter",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS Encounter (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
    getDb: () => db.getDb(),
    parse: parseEncounterJson,
    getId: (encounter) => encounter.id,
  });

export function findEncounter(db: DB, id: string): Encounter | undefined {
  return encounterTable(db).find(id);
}

export function getEncounter(db: DB, id: string): Encounter {
  return encounterTable(db).get(id);
}

export function getAllEncounters(db: DB): Encounter[] {
  return encounterTable(db).getAll();
}

export function cleanupEncounters(db: DB): number {
  return encounterTable(db).cleanup();
}

export function seedEncounters(db: DB, encounters: Encounter[]): number {
  return encounterTable(db).seed(encounters);
}
