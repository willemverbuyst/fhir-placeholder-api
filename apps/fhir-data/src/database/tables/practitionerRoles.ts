import { PractitionerRole } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

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

const practitionerRoleTable = createJsonResourceTable<PractitionerRole>({
  tableName: "PractitionerRole",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS PractitionerRole (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parsePractitionerRoleJson,
  getId: (practitionerRole) => practitionerRole.id,
});

export function findPractitionerRole(id: string): PractitionerRole | undefined {
  return practitionerRoleTable.find(id);
}

export function getPractitionerRole(id: string): PractitionerRole {
  return practitionerRoleTable.get(id);
}

export function getAllPractitionerRoles(): PractitionerRole[] {
  return practitionerRoleTable.getAll();
}

export function cleanupPractitionerRoles(): number {
  return practitionerRoleTable.cleanup();
}

export function seedPractitionerRoles(
  practitionerRoles: PractitionerRole[],
): number {
  return practitionerRoleTable.seed(practitionerRoles);
}
