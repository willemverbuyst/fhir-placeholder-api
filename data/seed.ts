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
import { createPatient } from "./resources/patient.ts";

function createPatients(numberOfPatients: number) {
  const newPatients: PatientWithId[] = Array.from(
    { length: numberOfPatients },
    (_, i) => createPatient(i + 1)
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
  const newPatients = createPatients(NUMBER_OF_PATIENTS);

  dataStore.patients = newPatients;

  const { newConditions, newEpisodes } = createEpisodesForPatients(
    newPatients,
    NUMBER_OF_EPISODES_PER_PATIENT
  );

  dataStore.conditions = newConditions;
  dataStore.episodes = newEpisodes;
}
