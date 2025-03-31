import { Condition, EpisodeOfCare, Patient } from 'fhir/r5';
import { NUMBER_OF_EPISODES_PER_PATIENT } from '../dataStore.config';
import { createCondition } from '../resources/condition';
import { createEpisode } from '../resources/episode-of-care';
import { createOrganization } from '../resources/organization';
import { createPatient } from '../resources/patient';
import { createPractitioner } from '../resources/practitioner';

export function createPatients(
  numberOfPatients: number,
  organizationId: number,
  practitionerIds: string[],
) {
  const newPatients = Array.from({ length: numberOfPatients }, (_, i) =>
    createPatient(i + 1, organizationId, practitionerIds),
  );

  return newPatients;
}

export function createOrganizations(numberOfOrganizations: number) {
  const newOrganizations = Array.from(
    { length: numberOfOrganizations },
    (_, i) => createOrganization(i + 1),
  );

  return newOrganizations;
}

export function createEpisodesWithConditions(
  numberOfEpisodes: number,
  patientId: string,
) {
  const newConditions: Condition[] = [];
  const newEpisodes: EpisodeOfCare[] = [];

  Array.from({ length: numberOfEpisodes }, (_, i) => {
    const newId =
      i + 1 + (Number(patientId) - 1) * NUMBER_OF_EPISODES_PER_PATIENT;
    const condition = createCondition(patientId, newId);
    const episode = createEpisode(patientId, newId, condition.id!);

    newConditions.push(condition);
    newEpisodes.push(episode);
  });

  return { newConditions, newEpisodes };
}

export function createEpisodesForPatients(
  patients: Patient[],
  numberOfEpisodes: number,
) {
  const newEpisodes: EpisodeOfCare[] = [];
  const newConditions: Condition[] = [];

  patients.forEach((p) => {
    const { newConditions: conditions, newEpisodes: episodes } =
      createEpisodesWithConditions(numberOfEpisodes, p.id!);
    newEpisodes.push(...episodes);
    newConditions.push(...conditions);
  });

  return { newConditions, newEpisodes };
}

export function createPractitioners(numberOfPractitioners: number) {
  return Array.from({ length: numberOfPractitioners }, (_, i) =>
    createPractitioner(i + 1),
  );
}
