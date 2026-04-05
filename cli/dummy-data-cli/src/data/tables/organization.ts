import { Organization } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

function parseOrganizationJson(json: string): Organization {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse Organization JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid Organization JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "Organization") {
    throw new Error(
      `Invalid Organization JSON: expected resourceType "Organization" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid Organization JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as Organization;
}

const organizationTable = (db: DB) =>
  createJsonResourceTable<Organization>({
    tableName: "organization",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS organization (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parseOrganizationJson,
    getId: (organization) => organization.id,
  });

export function cleanupOrganizations(db: DB): Promise<number> {
  return organizationTable(db).cleanup();
}

export function seedOrganizations(
  db: DB,
  organizations: Organization[],
): Promise<number> {
  return organizationTable(db).seed(organizations);
}
