import { Flag } from "fhir/r5";
import { getDb } from "../db";
import { createJsonResourceTable } from "../jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

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

const flagTable = createJsonResourceTable<Flag>({
  tableName: "Flag",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Flag (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseFlagJson,
  getId: (flag) => flag.id,
});

export function findFlag(id: string): Flag | undefined {
  return flagTable.find(id);
}

export function getFlag(id: string): Flag {
  return flagTable.get(id);
}

export function getAllFlags(): Flag[] {
  return flagTable.getAll();
}

export function cleanupFlags(): number {
  return flagTable.cleanup();
}

export function seedFlags(flags: Flag[]): number {
  return flagTable.seed(flags);
}
