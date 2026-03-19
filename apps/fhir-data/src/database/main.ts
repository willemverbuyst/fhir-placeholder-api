import { cleanupDatabase } from "./cleanup.database";
import { seedDatabase } from "./seed.database";
import { getAllOrganizations } from "./tables/organization";

cleanupDatabase();
seedDatabase();

const organizations = getAllOrganizations();

console.log(organizations);
