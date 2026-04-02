import { Pool } from "pg";

const pgPort = Number(process.env.PGPORT ?? "5432");

export const pool = new Pool({
  user: process.env.PGUSER ?? "postgres",
  host: process.env.PGHOST ?? "fhir-data-db",
  database: process.env.PGDATABASE ?? "fhir_db",
  password: process.env.PGPASSWORD ?? "password",
  port: Number.isNaN(pgPort) ? 5432 : pgPort,
});
