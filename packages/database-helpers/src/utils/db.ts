import { Pool } from "pg";

export class DB {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  getDb(): Pool {
    return this.pool;
  }
}
