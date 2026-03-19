import { Organization } from "fhir/r5";
import { getDb } from "./db";

let isInitialized = false;

function initOrganizationTable(): void {
  if (isInitialized) return;

  getDb().exec(`
    CREATE TABLE IF NOT EXISTS Organization (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `);
  isInitialized = true;
}

export function getOrganization(id: string): Organization {
  initOrganizationTable();

  const row = getDb()
    .prepare("SELECT resource FROM Organization WHERE id = ?")
    .get(id) as { resource: string } | undefined;

  if (!row) {
    throw new Error(`Organization not found: ${id}`);
  }

  return JSON.parse(row.resource) as Organization;
}

export function getAllOrganizations(): Organization[] {
  initOrganizationTable();

  const rows = getDb()
    .prepare("SELECT resource FROM Organization")
    .all() as Array<{ resource: string }>;

  return rows.map((row) => JSON.parse(row.resource) as Organization);
}

export function cleanupOrganizations(): number {
  initOrganizationTable();
  const result = getDb().prepare("DELETE FROM Organization").run();
  return result.changes;
}

export function seedOrganizations(organizations: Organization[]): number {
  initOrganizationTable();

  const database = getDb();
  const insert = database.prepare(
    "INSERT OR REPLACE INTO Organization (id, resource) VALUES (?, ?)",
  );

  return database.transaction(() => {
    let inserted = 0;

    for (const organization of organizations) {
      if (!organization.id) {
        throw new Error("Seed organization is missing `id`");
      }

      const result = insert.run(organization.id, JSON.stringify(organization));
      inserted += result.changes;
    }

    return inserted;
  })();
}
