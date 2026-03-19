import { cleanupDatabase } from "./cleanup.database";
import { getAllOrganizations } from "./organization";
import { seedDatabase } from "./seed.database";

cleanupDatabase();
seedDatabase();

const organizations = getAllOrganizations();

console.log(organizations);
