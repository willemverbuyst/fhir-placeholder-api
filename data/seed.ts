import {
  ConditionWithId,
  Data,
  EpisodeOfCareWithId,
  PatientWithId,
} from "../models/data.ts";
import {
  NUMBER_OF_EPISODES_PER_PATIENT,
  NUMBER_OF_PATIENTS,
} from "./config.ts";
import { createCondition } from "./resources/condition.ts";
import { createEpisode } from "./resources/episode-of-care.ts";
import { createOrganization } from "./resources/organization.ts";
import { createPatient } from "./resources/patient.ts";

function createPatients(numberOfPatients: number, organizationId: number) {
  const newPatients: PatientWithId[] = Array.from(
    { length: numberOfPatients },
    (_, i) => createPatient(i + 1, organizationId)
  );

  return newPatients;
}

function createEpisodesWithConditions(
  numberOfEpisodes: number,
  patientId: string
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

function createEpisodesForPatients(
  patients: PatientWithId[],
  numberOfEpisodes: number
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

export function seed(dataStore: Data) {
  const newOrganization = createOrganization(1);
  const newPatients = createPatients(NUMBER_OF_PATIENTS, 1);

  const { newConditions, newEpisodes } = createEpisodesForPatients(
    newPatients,
    NUMBER_OF_EPISODES_PER_PATIENT
  );

  dataStore.organizations = [newOrganization];
  dataStore.patients = newPatients;
  dataStore.conditions = newConditions;
  dataStore.episodes = newEpisodes;
}
