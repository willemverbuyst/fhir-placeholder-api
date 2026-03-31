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

export async function cleanupDatabase(db: DB): Promise<void> {
  await cleanupAllergies(db);
  await cleanupAppointments(db);
  await cleanupCommunications(db);
  await cleanupConditions(db);
  await cleanupEncounters(db);
  await cleanupEpisodes(db);
  await cleanupFlags(db);
  await cleanupObservations(db);
  await cleanupPatients(db);
  await cleanupPractitionerRoles(db);
  await cleanupPractitioners(db);
  await cleanupOrganizations(db);
}
