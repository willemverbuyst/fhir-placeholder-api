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
} from "./tables";

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

export function seedDatabase(): void {
  seedAllergies(allergies);
  seedAppointments(appointments);
  seedConditions(conditions);
  seedEncounters(encounters);
  seedEpisodes(episodes);
  seedObservations(observations);
  seedFlags(flags);
  seedCommunications(communications);
  seedPatients(patients);
  seedPractitionerRoles(practitionerRoles);
  seedPractitioners(practitioners);
  seedOrganizations(organizations);
}
