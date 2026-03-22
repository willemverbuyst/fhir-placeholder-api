import { Observation } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

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

const observationTable = (db: DB) =>
  createJsonResourceTable<Observation>({
    tableName: "Observation",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS Observation (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
    getDb: () => db.getDb(),
    parse: parseObservationJson,
    getId: (observation) => observation.id,
  });

export function findObservation(db: DB, id: string): Observation | undefined {
  return observationTable(db).find(id);
}

export function getObservation(db: DB, id: string): Observation {
  return observationTable(db).get(id);
}

export function getAllObservations(db: DB): Observation[] {
  return observationTable(db).getAll();
}

export function cleanupObservations(db: DB): number {
  return observationTable(db).cleanup();
}

export function seedObservations(db: DB, observations: Observation[]): number {
  return observationTable(db).seed(observations);
}
