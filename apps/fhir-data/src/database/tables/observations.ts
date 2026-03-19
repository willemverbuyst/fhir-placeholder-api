import { Observation } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseObservationJson(json: string): Observation {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Observation JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Observation JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Observation") {
    throw new Error(
      `Invalid Observation JSON: expected resourceType "Observation" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid Observation JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as Observation;
}

const observationTable = createJsonResourceTable<Observation>({
  tableName: "Observation",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Observation (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseObservationJson,
  getId: (observation) => observation.id,
});

export function findObservation(id: string): Observation | undefined {
  return observationTable.find(id);
}

export function getObservation(id: string): Observation {
  return observationTable.get(id);
}

export function getAllObservations(): Observation[] {
  return observationTable.getAll();
}

export function cleanupObservations(): number {
  return observationTable.cleanup();
}

export function seedObservations(observations: Observation[]): number {
  return observationTable.seed(observations);
}
