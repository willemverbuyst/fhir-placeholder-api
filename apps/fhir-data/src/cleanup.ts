import { cleanupDatabase, DB } from "@repo/database-helpers";

const db = new DB("./fhir.db");

cleanupDatabase(db);
