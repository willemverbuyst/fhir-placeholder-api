import { Communication } from "fhir/r5";
import { getDb } from "../db";
import { createJsonResourceTable } from "../jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

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

const communicationTable = createJsonResourceTable<Communication>({
  tableName: "Communication",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Communication (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseCommunicationJson,
  getId: (communication) => communication.id,
});

export function findCommunication(id: string): Communication | undefined {
  return communicationTable.find(id);
}

export function getCommunication(id: string): Communication {
  return communicationTable.get(id);
}

export function getAllCommunications(): Communication[] {
  return communicationTable.getAll();
}

export function cleanupCommunications(): number {
  return communicationTable.cleanup();
}

export function seedCommunications(communications: Communication[]): number {
  return communicationTable.seed(communications);
}
