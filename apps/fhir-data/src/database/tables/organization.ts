import { Organization } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

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

const organizationTable = createJsonResourceTable<Organization>({
  tableName: "Organization",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS Organization (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseOrganizationJson,
  getId: (organization) => organization.id,
});

export function findOrganization(id: string): Organization | undefined {
  return organizationTable.find(id);
}

export function getOrganization(id: string): Organization {
  return organizationTable.get(id);
}

export function getAllOrganizations(): Organization[] {
  return organizationTable.getAll();
}

export function cleanupOrganizations(): number {
  return organizationTable.cleanup();
}

export function seedOrganizations(organizations: Organization[]): number {
  return organizationTable.seed(organizations);
}
