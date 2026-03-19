import { Encounter } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

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

const encounterTable = createJsonResourceTable<Encounter>({
  tableName: "Encounter",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Encounter (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseEncounterJson,
  getId: (encounter) => encounter.id,
});

export function findEncounter(id: string): Encounter | undefined {
  return encounterTable.find(id);
}

export function getEncounter(id: string): Encounter {
  return encounterTable.get(id);
}

export function getAllEncounters(): Encounter[] {
  return encounterTable.getAll();
}

export function cleanupEncounters(): number {
  return encounterTable.cleanup();
}

export function seedEncounters(encounters: Encounter[]): number {
  return encounterTable.seed(encounters);
}
