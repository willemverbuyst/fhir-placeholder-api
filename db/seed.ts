import { faker } from "npm:@faker-js/faker";
import { Condition, EpisodeOfCare, Patient } from "npm:@types/fhir/r4";
import { Low } from "npm:lowdb";
import { Data } from "../models/data.ts";

const NUMBER_OF_PATIENTS = 10;
const NUMBER_OF_EPISODES_PER_PATIENT = 5;

type PatientWithId = Patient & Required<Pick<Patient, "id">>;
type ConditionWithId = Condition & Required<Pick<Condition, "id">>;
type EpisodeOfCareWithId = EpisodeOfCare & Required<Pick<EpisodeOfCare, "id">>;

function createPatient(patientId: number) {
  const newPatient: PatientWithId = {
    id: patientId.toString(),
    name: [
      { family: faker.person.lastName(), given: [faker.person.firstName()] },
    ],
    resourceType: "Patient",
    birthDate: faker.date
      .between({ from: "1950-01-01", to: Date.now() })
      .toISOString()
      .split("T")[0],
  };

  return newPatient;
}

function createPatients(numberOfPatients: number) {
  const newPatients: PatientWithId[] = Array.from(
    { length: numberOfPatients },
    (_, i) => createPatient(i + 1)
  );

  return newPatients;
}

function createCondition(patientId: string, episodeId: number) {
  const newCondition: ConditionWithId = {
    id: episodeId.toString(),
    note: [{ text: faker.lorem.sentence({ min: 3, max: 5 }) }],
    resourceType: "Condition",
    subject: { reference: `Patient/${patientId}` },
  };

  return newCondition;
}

function createEpisode(
  patientId: string,
  episodeId: number,
  conditionId: string
) {
  const newEpisode: EpisodeOfCareWithId = {
    id: episodeId.toString(),
    resourceType: "EpisodeOfCare",
    status: "active",
    patient: { reference: `Patient/${patientId}` },
    diagnosis: [
      {
        condition: {
          reference: `Condition/${conditionId}`,
        },
      },
    ],
  };

  return newEpisode;
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
  const newEpisodes: EpisodeOfCare[] = [];
  const newConditions: Condition[] = [];

  patients.forEach((p) => {
    const { newConditions: conditions, newEpisodes: episodes } =
      createEpisodesWithConditions(numberOfEpisodes, p.id);
    newEpisodes.push(...episodes);
    newConditions.push(...conditions);
  });

  return { newConditions, newEpisodes };
}

export async function seedDB(db: Low<Data>) {
  db.data.patients = [];
  db.data.episodes = [];
  db.data.conditions = [];
  await db.write();

  const newPatients = createPatients(NUMBER_OF_PATIENTS);

  db.data.patients.push(...newPatients);

  const { newConditions, newEpisodes } = createEpisodesForPatients(
    newPatients,
    NUMBER_OF_EPISODES_PER_PATIENT
  );

  db.data.conditions.push(...newConditions);
  db.data.episodes.push(...newEpisodes);

  await db.write();
}
