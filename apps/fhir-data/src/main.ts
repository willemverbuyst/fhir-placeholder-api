import { DB, getAllOrganizations } from "@repo/database-helpers";

const db = new DB("./fhir.db");

const organizations = getAllOrganizations(db);

console.log(organizations);
