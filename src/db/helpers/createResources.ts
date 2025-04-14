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
  return Array.from({ length: numberOfObservations }, (_, index) =>
    createObservation(patientId, encounterId, index),
  );
}

export function createEncounters(
  numberOfEncounters: number,
  patientId: string,
  episodes: (EpisodeOfCare & Id)[],
): (Encounter & Id)[] {
  const episodeIds = episodes.map((e) => e.id);

  return Array.from({ length: numberOfEncounters }, (_, index) =>
    createEncounter(patientId, episodeIds, index),
  );
}

export function createPatients(
  numberOfPatients: number,
  organizationId: string,
  practitioners: (Practitioner & Id)[],
): (Patient & Id)[] {
  const practitionerIds = practitioners.map((p) => p.id);

  return Array.from({ length: numberOfPatients }, (_, index) => {
    return createPatient(organizationId, practitionerIds, index);
  });
}

export function createOrganizations(
  numberOfOrganizations: number,
): (Organization & Id)[] {
  return Array.from({ length: numberOfOrganizations }, (_, index) =>
    createOrganization(index),
  );
}

export function createConditions(
  numberOfConditions: number,
  patientId: string,
): (Condition & Id)[] {
  return Array.from({ length: numberOfConditions }, (_, index) => {
    return createCondition(patientId, index);
  });
}

export function createEpisodes(
  patientId: string,
  conditions: (Condition & Id)[],
): (EpisodeOfCare & Id)[] {
  return conditions.map((c, index) => {
    return createEpisode(patientId, c.id, index);
  });
}

export function createPractitioners(
  numberOfPractitioners: number,
): (Practitioner & Id)[] {
  return Array.from({ length: numberOfPractitioners }, (_, index) =>
    createPractitioner(index),
  );
}
