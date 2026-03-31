// import { DB, seedDatabase } from "@repo/database-helpers";

import { pool } from "./db";

// const db = new DB("./fhir.db");

// seedDatabase(db);

async function createTable() {
  console.log("Creating table...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      resource JSON
    )
  `);
}

async function cleanupTable() {
  console.log("Cleaning up table...");
  await pool.query(`
    DELETE FROM users
  `);
}

async function seedTable() {
  console.log("Seeding table...");
  const result = await pool.query(
    `
    INSERT INTO users (resource) VALUES ($1)
  `,
    [
      JSON.stringify({
        id: "1",
        name: "John Doe",
      }),
    ],
  );
  console.log(result.rows);
}

async function main() {
  await createTable();
  await cleanupTable();
  await seedTable();
}

main();
