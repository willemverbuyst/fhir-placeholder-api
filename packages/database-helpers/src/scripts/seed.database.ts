import { defaultConfig } from "@repo/config-scripts";
import { generateResources } from "@repo/dummy-data";
import {
  seedAllergies,
  seedAppointments,
  seedCommunications,
  seedConditions,
  seedEncounters,
  seedEpisodes,
  seedFlags,
  seedObservations,
  seedOrganizations,
  seedPatients,
  seedPractitionerRoles,
  seedPractitioners,
} from "../tables";
import { DB } from "../utils";

const {
  allergies,
  appointments,
  conditions,
  encounters,
  episodes,
  observations,
  flags,
  communications,
  patients,
  practitionerRoles,
  practitioners,
  organizations,
} = generateResources(defaultConfig);

export async function seedDatabase(db: DB): Promise<void> {
  await seedAllergies(db, allergies);
  await seedAppointments(db, appointments);
  await seedConditions(db, conditions);
  await seedEncounters(db, encounters);
  await seedEpisodes(db, episodes);
  await seedObservations(db, observations);
  await seedFlags(db, flags);
  await seedCommunications(db, communications);
  await seedPatients(db, patients);
  await seedPractitionerRoles(db, practitionerRoles);
  await seedPractitioners(db, practitioners);
  await seedOrganizations(db, organizations);
}
