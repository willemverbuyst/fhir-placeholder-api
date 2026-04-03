import { cleanupDatabase, DB, seedDatabase } from "@repo/database-helpers";
import { pool } from "./db";

const db = new DB(pool);

async function addAdminUser(): Promise<void> {
  await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'guest', 'user')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`
    INSERT INTO users (username, password, role)
    VALUES (
      'jacksparrow',
      crypt('fooBar', gen_salt('bf', 10)),
      'admin'
    )
    ON CONFLICT (username) DO UPDATE
    SET
      password = EXCLUDED.password,
      role = EXCLUDED.role;
  `);
}

await cleanupDatabase(db);
await addAdminUser();
await seedDatabase(db);
