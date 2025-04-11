import {
  Condition,
  Encounter,
  EpisodeOfCare,
  Organization,
  Patient,
  Practitioner,
} from 'fhir/r5';
import { createCondition } from '../resources/condition';
import { createEncounter } from '../resources/encounter';
import { createEpisode } from '../resources/episode-of-care';
import { createOrganization } from '../resources/organization';
import { createPatient } from '../resources/patient';
import { createPractitioner } from '../resources/practitioner';

export function createEncounters(
  numberOfEncounters: number,
  patientId: string,
  episodes: EpisodeOfCare[],
): Encounter[] {
  const episodeIds = episodes.map((e) => e.id).filter((e): e is string => !!e);
  return Array.from({ length: numberOfEncounters }, () =>
    createEncounter(patientId, episodeIds),
  );
}

export function createPatients(
  numberOfPatients: number,
  organizations: Organization[],
  practitioners: Practitioner[],
): Patient[] {
  const practitionerIds = practitioners
    .map((p) => p.id)
    .filter((p): p is string => !!p);

  const organizationIds = organizations.map((o) => o.id);
  const firstNewOrganizationId = organizationIds[0];

  if (!firstNewOrganizationId) {
    throw new Error(
      'First organization ID is missing in DataStoreService constructor',
    );
  }

  return Array.from({ length: numberOfPatients }, () => {
    return createPatient(firstNewOrganizationId, practitionerIds);
  });
}

export function createOrganizations(
  numberOfOrganizations: number,
): Organization[] {
  return Array.from({ length: numberOfOrganizations }, () =>
    createOrganization(),
  );
}

export function createConditions(
  numberOfConditions: number,
  patientId: string,
): Condition[] {
  return Array.from({ length: numberOfConditions }, () => {
    return createCondition(patientId);
  });
}

export function createEpisodes(
  patientId: string,
  conditions: Condition[],
): EpisodeOfCare[] {
  return conditions.map((c) => {
    if (!c.id) {
      throw new Error(
        'Condition ID is missing in createEpisodesWithConditions',
      );
    }
    return createEpisode(patientId, c.id);
  });
}

export function createPractitioners(
  numberOfPractitioners: number,
): Practitioner[] {
  return Array.from({ length: numberOfPractitioners }, () =>
    createPractitioner(),
  );
}
