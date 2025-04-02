import { Condition, EpisodeOfCare, Patient } from 'fhir/r5';
import { createCondition } from '../resources/condition';
import { createEpisode } from '../resources/episode-of-care';
import { createOrganization } from '../resources/organization';
import { createPatient } from '../resources/patient';
import { createPractitioner } from '../resources/practitioner';

export function createPatients(
  numberOfPatients: number,
  organizationId: string,
  practitionerIds: string[],
) {
  const newPatients = Array.from({ length: numberOfPatients }, () =>
    createPatient(organizationId, practitionerIds),
  );

  return newPatients;
}

export function createOrganizations(numberOfOrganizations: number) {
  const newOrganizations = Array.from({ length: numberOfOrganizations }, () =>
    createOrganization(),
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
    const condition = createCondition(patientId);
    const episode = createEpisode(patientId, condition.id!);

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
  return Array.from({ length: numberOfPractitioners }, () =>
    createPractitioner(),
  );
}
