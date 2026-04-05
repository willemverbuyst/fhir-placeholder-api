import { Condition } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

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

const conditionTable = (db: DB) =>
  createJsonResourceTable<Condition>({
    tableName: "condition",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS condition (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parseConditionJson,
    getId: (condition) => condition.id,
  });

export function cleanupConditions(db: DB): Promise<number> {
  return conditionTable(db).cleanup();
}

export function seedConditions(
  db: DB,
  conditions: Condition[],
): Promise<number> {
  return conditionTable(db).seed(conditions);
}
