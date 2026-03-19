import {
  cleanupAllergies,
  cleanupAppointments,
  cleanupCommunications,
  cleanupConditions,
  cleanupEncounters,
  cleanupEpisodes,
  cleanupFlags,
  cleanupObservations,
  cleanupOrganizations,
  cleanupPatients,
  cleanupPractitionerRoles,
  cleanupPractitioners,
} from "./tables";

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
