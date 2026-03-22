import { Communication } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

function parseCommunicationJson(json: string): Communication {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Communication JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Communication JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Communication") {
    throw new Error(
      `Invalid Communication JSON: expected resourceType "Communication" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid Communication JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as Communication;
}

const communicationTable = (db: DB) =>
  createJsonResourceTable<Communication>({
    tableName: "Communication",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS Communication (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
    getDb: () => db.getDb(),
    parse: parseCommunicationJson,
    getId: (communication) => communication.id,
  });

export function findCommunication(
  db: DB,
  id: string,
): Communication | undefined {
  return communicationTable(db).find(id);
}

export function getCommunication(db: DB, id: string): Communication {
  return communicationTable(db).get(id);
}

export function getAllCommunications(db: DB): Communication[] {
  return communicationTable(db).getAll();
}

export function cleanupCommunications(db: DB): number {
  return communicationTable(db).cleanup();
}

export function seedCommunications(
  db: DB,
  communications: Communication[],
): number {
  return communicationTable(db).seed(communications);
}
