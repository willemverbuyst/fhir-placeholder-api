import Database from "better-sqlite3";

type SqliteDb = InstanceType<typeof Database>;

type JsonResourceTableInput<T> = {
  tableName: string;
  createTableSql: string;
  getDb: () => SqliteDb;
  parse: (json: string) => T;
  serialize?: (resource: T) => string;
  getId: (resource: T) => string | undefined;
};

type JsonResourceTable<T> = {
  get: (id: string) => T;
  find: (id: string) => T | undefined;
  getAll: () => T[];
  cleanup: () => number;
  seed: (resources: T[]) => number;
};

const initializedTables = new Set<string>();

function ensureTableInitialized(input: {
  tableName: string;
  createTableSql: string;
  getDb: () => SqliteDb;
}): void {
  if (initializedTables.has(input.tableName)) return;
  input.getDb().exec(input.createTableSql);
  initializedTables.add(input.tableName);
}

export function createJsonResourceTable<T>(
  input: JsonResourceTableInput<T>,
): JsonResourceTable<T> {
  const serialize =
    input.serialize ?? ((resource: T) => JSON.stringify(resource));

  function init(): void {
    ensureTableInitialized({
      tableName: input.tableName,
      createTableSql: input.createTableSql,
      getDb: input.getDb,
    });
  }

  function find(id: string): T | undefined {
    init();
    const row = input
      .getDb()
      .prepare(`SELECT resource FROM ${input.tableName} WHERE id = ?`)
      .get(id) as { resource: string } | undefined;

    if (!row) return undefined;
    return input.parse(row.resource);
  }

  function get(id: string): T {
    const resource = find(id);
    if (!resource) {
      throw new Error(`${input.tableName} not found: ${id}`);
    }
    return resource;
  }

  function getAll(): T[] {
    init();
    const rows = input
      .getDb()
      .prepare(`SELECT resource FROM ${input.tableName}`)
      .all() as Array<{ resource: string }>;

    return rows.map((row) => input.parse(row.resource));
  }

  function cleanup(): number {
    init();
    const result = input
      .getDb()
      .prepare(`DELETE FROM ${input.tableName}`)
      .run();
    return result.changes;
  }

  function seed(resources: T[]): number {
    init();
    const database = input.getDb();
    const insert = database.prepare(
      `INSERT OR REPLACE INTO ${input.tableName} (id, resource) VALUES (?, ?)`,
    );

    return database.transaction(() => {
      let inserted = 0;

      for (const resource of resources) {
        const id = input.getId(resource);
        if (!id) {
          throw new Error(`Seed ${input.tableName} resource is missing \`id\``);
        }

        const result = insert.run(id, serialize(resource));
        inserted += result.changes;
      }

      return inserted;
    })();
  }

  return { get, find, getAll, cleanup, seed };
}
