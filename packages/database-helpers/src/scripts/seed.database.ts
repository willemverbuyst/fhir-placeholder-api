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

export function seedDatabase(db: DB): void {
  seedAllergies(db, allergies);
  seedAppointments(db, appointments);
  seedConditions(db, conditions);
  seedEncounters(db, encounters);
  seedEpisodes(db, episodes);
  seedObservations(db, observations);
  seedFlags(db, flags);
  seedCommunications(db, communications);
  seedPatients(db, patients);
  seedPractitionerRoles(db, practitionerRoles);
  seedPractitioners(db, practitioners);
  seedOrganizations(db, organizations);
}
