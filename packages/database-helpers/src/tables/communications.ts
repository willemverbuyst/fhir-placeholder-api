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
    tableName: "communication",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS communication (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parseCommunicationJson,
    getId: (communication) => communication.id,
  });

export function cleanupCommunications(db: DB): Promise<number> {
  return communicationTable(db).cleanup();
}

export function seedCommunications(
  db: DB,
  communications: Communication[],
): Promise<number> {
  return communicationTable(db).seed(communications);
}
