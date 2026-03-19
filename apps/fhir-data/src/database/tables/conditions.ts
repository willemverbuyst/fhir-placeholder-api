import { Condition } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseConditionJson(json: string): Condition {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Condition JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Condition JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Condition") {
    throw new Error(
      `Invalid Condition JSON: expected resourceType "Condition" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid Condition JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as Condition;
}

const conditionTable = createJsonResourceTable<Condition>({
  tableName: "Condition",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Condition (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseConditionJson,
  getId: (condition) => condition.id,
});

export function findCondition(id: string): Condition | undefined {
  return conditionTable.find(id);
}

export function getCondition(id: string): Condition {
  return conditionTable.get(id);
}

export function getAllConditions(): Condition[] {
  return conditionTable.getAll();
}

export function cleanupConditions(): number {
  return conditionTable.cleanup();
}

export function seedConditions(conditions: Condition[]): number {
  return conditionTable.seed(conditions);
}
