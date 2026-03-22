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
} from "../tables";
import { DB } from "../utils";

export function cleanupDatabase(db: DB): void {
  cleanupAllergies(db);
  cleanupAppointments(db);
  cleanupCommunications(db);
  cleanupConditions(db);
  cleanupEncounters(db);
  cleanupEpisodes(db);
  cleanupFlags(db);
  cleanupObservations(db);
  cleanupPatients(db);
  cleanupPractitionerRoles(db);
  cleanupPractitioners(db);
  cleanupOrganizations(db);
}
