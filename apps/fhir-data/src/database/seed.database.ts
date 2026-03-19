import { generateResources } from "@repo/dummy-data";
import { defaultConfig } from "../scripts/defaultConfig";
import { seedAllergies } from "./allergies";
import { seedAppointments } from "./appointments";
import { seedCommunications } from "./communications";
import { seedConditions } from "./conditions";
import { seedEncounters } from "./encounters";
import { seedEpisodes } from "./episodes";
import { seedFlags } from "./flags";
import { seedObservations } from "./observations";
import { seedOrganizations } from "./organization";
import { seedPatients } from "./patients";
import { seedPractitionerRoles } from "./practitionerRoles";
import { seedPractitioners } from "./practitioners";

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
