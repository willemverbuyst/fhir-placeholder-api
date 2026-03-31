import { PractitionerRole } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

function parsePractitionerRoleJson(json: string): PractitionerRole {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse PractitionerRole JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid PractitionerRole JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "PractitionerRole") {
    throw new Error(
      `Invalid PractitionerRole JSON: expected resourceType "PractitionerRole" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid PractitionerRole JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as PractitionerRole;
}

const practitionerRoleTable = (db: DB) =>
  createJsonResourceTable<PractitionerRole>({
    tableName: "PractitionerRole",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS PractitionerRole (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parsePractitionerRoleJson,
    getId: (practitionerRole) => practitionerRole.id,
  });

export function findPractitionerRole(
  db: DB,
  id: string,
): Promise<PractitionerRole | undefined> {
  return practitionerRoleTable(db).find(id);
}

export function getPractitionerRole(
  db: DB,
  id: string,
): Promise<PractitionerRole> {
  return practitionerRoleTable(db).get(id);
}

export function getAllPractitionerRoles(db: DB): Promise<PractitionerRole[]> {
  return practitionerRoleTable(db).getAll();
}

export function cleanupPractitionerRoles(db: DB): Promise<number> {
  return practitionerRoleTable(db).cleanup();
}

export function seedPractitionerRoles(
  db: DB,
  practitionerRoles: PractitionerRole[],
): Promise<number> {
  return practitionerRoleTable(db).seed(practitionerRoles);
}
