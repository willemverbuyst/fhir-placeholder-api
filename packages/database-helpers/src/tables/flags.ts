import { Flag } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

function parseFlagJson(json: string): Flag {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Flag JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Flag JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Flag") {
    throw new Error(
      `Invalid Flag JSON: expected resourceType "Flag" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error("Invalid Flag JSON: `id` must be a string when present");
  }

  return parsed as unknown as Flag;
}

const flagTable = (db: DB) =>
  createJsonResourceTable<Flag>({
    tableName: "Flag",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS Flag (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
    getDb: () => db.getDb(),
    parse: parseFlagJson,
    getId: (flag) => flag.id,
  });

export function findFlag(db: DB, id: string): Flag | undefined {
  return flagTable(db).find(id);
}

export function getFlag(db: DB, id: string): Flag {
  return flagTable(db).get(id);
}

export function getAllFlags(db: DB): Flag[] {
  return flagTable(db).getAll();
}

export function cleanupFlags(db: DB): number {
  return flagTable(db).cleanup();
}

export function seedFlags(db: DB, flags: Flag[]): number {
  return flagTable(db).seed(flags);
}
