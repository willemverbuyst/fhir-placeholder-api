import Database from "better-sqlite3";

export class DB {
  private db: InstanceType<typeof Database> | null = null;
  private dbFilePath: string | null = null;

  constructor(dbFilePath: string) {
    this.dbFilePath = dbFilePath;
  }

  getDb(): InstanceType<typeof Database> {
    if (!this.dbFilePath) {
      throw new Error("DB file path is not set");
    }

    if (this.db) {
      return this.db;
    }

    this.db = new Database(this.dbFilePath);
    return this.db;
  }
}
