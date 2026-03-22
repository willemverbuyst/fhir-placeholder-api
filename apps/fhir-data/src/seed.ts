import { DB, seedDatabase } from "@repo/database-helpers";

const db = new DB("./fhir.db");

seedDatabase(db);
