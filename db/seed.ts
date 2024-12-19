import { faker } from "npm:@faker-js/faker";
import { Condition, EpisodeOfCare, Patient } from "npm:@types/fhir/r4";
import { Low } from "npm:lowdb";
import { Data } from "../models/data.ts";

const NUMBER_OF_PATIENTS = 10;
const NUMBER_OF_EPISODES_PER_PATIENT = 5;

type PatientWithId = Patient & Required<Pick<Patient, "id">>;
type ConditionWithId = Condition & Required<Pick<Condition, "id">>;
type EpisodeOfCareWithId = EpisodeOfCare & Required<Pick<EpisodeOfCare, "id">>;

async function createPatients(db: Low<Data>, numberOfPatients: number) {
  const patients: PatientWithId[] = Array.from(
    { length: numberOfPatients },
    (_, i) => ({
      id: `patient-${i + 1}`,
      name: [
        { family: faker.person.lastName(), given: [faker.person.firstName()] },
      ],
      resourceType: "Patient",
      birthDate: faker.date
        .between({ from: "1950-01-01", to: Date.now() })
        .toISOString()
        .split("T")[0],
    })
  );

  db.data.patients.push(...patients);

  await db.write();

  return patients;
}

function createCondition(patientId: string, episodeId: number) {
  const condition: ConditionWithId = {
    id: `condition-${episodeId}`,
    note: [{ text: faker.lorem.sentence({ min: 3, max: 5 }) }],
    resourceType: "Condition",
    subject: { reference: `Patient/${patientId}` },
  };

  return condition;
}

function createEpisode(
  patientId: string,
  episodeId: number,
  conditionId: string
) {
  const episode: EpisodeOfCareWithId = {
    id: `episode-of-care-${episodeId}`,
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

  return episode;
}
function createEpisodesWithConditions(
  numberOfEpisodes: number,
  patientId: string
) {
  const conditions: ConditionWithId[] = [];
  const episodes: EpisodeOfCareWithId[] = [];

  Array.from({ length: numberOfEpisodes }, (_, i) => {
    const condition = createCondition(patientId, i + 1);
    const episode = createEpisode(patientId, i + 1, condition.id);

    conditions.push(condition);
    episodes.push(episode);
  });

  return { conditions, episodes };
}

async function createEpisodesForPatients(
  db: Low<Data>,
  patients: PatientWithId[],
  numberOfEpisodes: number
) {
  const allEpisodes: EpisodeOfCare[] = [];
  const allConditions: Condition[] = [];

  Promise.all(
    patients.map((p) => {
      const { conditions, episodes } = createEpisodesWithConditions(
        numberOfEpisodes,
        p.id
      );
      allEpisodes.push(...episodes);
      allConditions.push(...conditions);
    })
  );

  db.data.episodes.push(...allEpisodes);
  db.data.conditions.push(...allConditions);

  await db.write();
}

export async function seedDB(db: Low<Data>) {
  db.data.patients = [];
  db.data.episodes = [];
  db.data.conditions = [];
  await db.write();

  const patients = await createPatients(db, NUMBER_OF_PATIENTS);
  await createEpisodesForPatients(db, patients, NUMBER_OF_EPISODES_PER_PATIENT);
}
