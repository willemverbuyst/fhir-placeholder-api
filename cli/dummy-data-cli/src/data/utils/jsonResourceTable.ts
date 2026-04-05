import { Pool } from "pg";

type JsonResourceTableInput<T> = {
  tableName: string;
  createTableSql: string;
  getDb: () => Pool;
  parse: (json: string) => T;
  serialize?: (resource: T) => string;
  getId: (resource: T) => string | undefined;
};

type JsonResourceTable<T> = {
  cleanup: () => Promise<number>;
  seed: (resources: T[]) => Promise<number>;
};

const initializedTables = new Set<string>();

async function ensureTableInitialized(input: {
  tableName: string;
  createTableSql: string;
  getDb: () => Pool;
}): Promise<void> {
  if (initializedTables.has(input.tableName)) return;
  await input.getDb().query(input.createTableSql);
  initializedTables.add(input.tableName);
}

export function createJsonResourceTable<T>(
  input: JsonResourceTableInput<T>,
): JsonResourceTable<T> {
  const serialize =
    input.serialize ?? ((resource: T) => JSON.stringify(resource));

  async function init(): Promise<void> {
    await ensureTableInitialized({
      tableName: input.tableName,
      createTableSql: input.createTableSql,
      getDb: input.getDb,
    });
  }

  async function cleanup(): Promise<number> {
    await init();
    const result = await input.getDb().query(`DELETE FROM ${input.tableName}`);
    return result.rowCount ?? 0;
  }

  async function seed(resources: T[]): Promise<number> {
    await init();
    const client = await input.getDb().connect();
    let inserted = 0;

    try {
      await client.query("BEGIN");

      for (const resource of resources) {
        const id = input.getId(resource);
        if (!id) {
          throw new Error(`Seed ${input.tableName} resource is missing \`id\``);
        }

        const result = await client.query(
          `INSERT INTO ${input.tableName} (id, resource)
           VALUES ($1, $2::jsonb)
           ON CONFLICT (id) DO UPDATE
           SET resource = EXCLUDED.resource`,
          [id, serialize(resource)],
        );
        inserted += result.rowCount ?? 0;
      }

      await client.query("COMMIT");
      return inserted;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  return { cleanup, seed };
}
