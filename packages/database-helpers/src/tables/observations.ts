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
    tableName: "observation",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS observation (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parseObservationJson,
    getId: (observation) => observation.id,
  });

export function cleanupObservations(db: DB): Promise<number> {
  return observationTable(db).cleanup();
}

export function seedObservations(
  db: DB,
  observations: Observation[],
): Promise<number> {
  return observationTable(db).seed(observations);
}
