import { generateResources } from "@repo/dummy-data";
import { defaultConfig } from "../scripts/defaultConfig";
import { seedOrganizations } from "./organization";
import { seedPatients } from "./patients";

const { organizations, patients } = generateResources(defaultConfig);

export function seedDatabase(): void {
  seedPatients(patients);
  seedOrganizations(organizations);
}
