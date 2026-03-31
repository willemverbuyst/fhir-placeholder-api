import { cleanupDatabase, DB, seedDatabase } from "@repo/database-helpers";
import { pool } from "./db";

const db = new DB(pool);

await cleanupDatabase(db);
await seedDatabase(db);
