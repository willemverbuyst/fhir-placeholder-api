import { cleanupOrganizations } from "./organization";
import { cleanupPatients } from "./patients";

export function cleanupDatabase(): void {
  cleanupPatients();
  cleanupOrganizations();
}
