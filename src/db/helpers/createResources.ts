import {
  Condition,
  Encounter,
  EpisodeOfCare,
  Observation,
  Organization,
  Patient,
  Practitioner,
} from 'fhir/r5';
import { Id } from 'src/types';
import { createCondition } from '../resources/condition';
import { createEncounter } from '../resources/encounter';
import { createEpisode } from '../resources/episode-of-care';
import { createObservation } from '../resources/observation';
import { createOrganization } from '../resources/organization';
import { createPatient } from '../resources/patient';
import { createPractitioner } from '../resources/practitioner';

export function createObservations(
  numberOfObservations: number,
  patientId: string,
  encounterId: string,
): (Observation & Id)[] {
  return Array.from({ length: numberOfObservations }, () =>
    createObservation(patientId, encounterId),
  );
}

export function createEncounters(
  numberOfEncounters: number,
  patientId: string,
  episodes: (EpisodeOfCare & Id)[],
): (Encounter & Id)[] {
  const episodeIds = episodes.map((e) => e.id);

  return Array.from({ length: numberOfEncounters }, () =>
    createEncounter(patientId, episodeIds),
  );
}

export function createPatients(
  numberOfPatients: number,
  organizations: (Organization & Id)[],
  practitioners: (Practitioner & Id)[],
): (Patient & Id)[] {
  const practitionerIds = practitioners.map((p) => p.id);
  const organizationIds = organizations.map((o) => o.id);
  const firstNewOrganizationId = organizationIds[0];

  return Array.from({ length: numberOfPatients }, () => {
    return createPatient(firstNewOrganizationId, practitionerIds);
  });
}

export function createOrganizations(
  numberOfOrganizations: number,
): (Organization & Id)[] {
  return Array.from({ length: numberOfOrganizations }, () =>
    createOrganization(),
  );
}

export function createConditions(
  numberOfConditions: number,
  patientId: string,
): (Condition & Id)[] {
  return Array.from({ length: numberOfConditions }, () => {
    return createCondition(patientId);
  });
}

export function createEpisodes(
  patientId: string,
  conditions: (Condition & Id)[],
): (EpisodeOfCare & Id)[] {
  return conditions.map((c) => {
    return createEpisode(patientId, c.id);
  });
}

export function createPractitioners(
  numberOfPractitioners: number,
): (Practitioner & Id)[] {
  return Array.from({ length: numberOfPractitioners }, () =>
    createPractitioner(),
  );
}
