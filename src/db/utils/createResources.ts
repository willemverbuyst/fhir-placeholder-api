import { NUMBER_OF_EPISODES_PER_PATIENT } from '../config';
import {
  ConditionWithId,
  EpisodeOfCareWithId,
  OrganizationWithId,
  PatientWithId,
} from '../models';
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
  const newPatients: PatientWithId[] = Array.from(
    { length: numberOfPatients },
    (_, i) => createPatient(i + 1, organizationId, practitionerIds),
  );

  return newPatients;
}

export function createOrganizations(numberOfOrganizations: number) {
  const newOrganizations: OrganizationWithId[] = Array.from(
    { length: numberOfOrganizations },
    (_, i) => createOrganization(i + 1),
  );

  return newOrganizations;
}

export function createEpisodesWithConditions(
  numberOfEpisodes: number,
  patientId: string,
) {
  const newConditions: ConditionWithId[] = [];
  const newEpisodes: EpisodeOfCareWithId[] = [];

  Array.from({ length: numberOfEpisodes }, (_, i) => {
    const newId =
      i + 1 + (Number(patientId) - 1) * NUMBER_OF_EPISODES_PER_PATIENT;
    const condition = createCondition(patientId, newId);
    const episode = createEpisode(patientId, newId, condition.id);

    newConditions.push(condition);
    newEpisodes.push(episode);
  });

  return { newConditions, newEpisodes };
}

export function createEpisodesForPatients(
  patients: PatientWithId[],
  numberOfEpisodes: number,
) {
  const newEpisodes: EpisodeOfCareWithId[] = [];
  const newConditions: ConditionWithId[] = [];

  patients.forEach((p) => {
    const { newConditions: conditions, newEpisodes: episodes } =
      createEpisodesWithConditions(numberOfEpisodes, p.id);
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
