import { cleanupAllergies } from "./allergies";
import { cleanupAppointments } from "./appointments";
import { cleanupCommunications } from "./communications";
import { cleanupConditions } from "./conditions";
import { cleanupEncounters } from "./encounters";
import { cleanupEpisodes } from "./episodes";
import { cleanupFlags } from "./flags";
import { cleanupObservations } from "./observations";
import { cleanupOrganizations } from "./organization";
import { cleanupPatients } from "./patients";
import { cleanupPractitionerRoles } from "./practitionerRoles";
import { cleanupPractitioners } from "./practitioners";

export function cleanupDatabase(): void {
  cleanupAllergies();
  cleanupAppointments();
  cleanupCommunications();
  cleanupConditions();
  cleanupEncounters();
  cleanupEpisodes();
  cleanupFlags();
  cleanupObservations();
  cleanupPatients();
  cleanupPractitionerRoles();
  cleanupPractitioners();
  cleanupOrganizations();
}
