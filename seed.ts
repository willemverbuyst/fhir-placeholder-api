import { faker } from "npm:@faker-js/faker";
import { Condition, EpisodeOfCare, Patient } from "npm:@types/fhir/r4";
import { Low } from "npm:lowdb";
import { Data } from "./types.ts";

const NUMBER_OF_PATIENTS = 10;
const NUMBER_OF_EPISODES_PER_PATIENT = 5;

type PatientWithId = Patient & Required<Pick<Patient, "id">>;
type ConditionWithId = Condition & Required<Pick<Condition, "id">>;

async function createCondition(db: Low<Data>, patientId: string) {
  const condition: ConditionWithId = {
    id: crypto.randomUUID(),
    note: [{ text: faker.lorem.sentence({ min: 3, max: 5 }) }],
    resourceType: "Condition",
    subject: { reference: `Patient/${patientId}` },
  };

  db.data.conditions.push(condition);

  await db.write();

  return condition;
}

async function createPatients(db: Low<Data>, numberOfPatients: number) {
  const newPatients: PatientWithId[] = Array.from(
    { length: numberOfPatients },
    () => ({
      id: crypto.randomUUID(),
      name: [
        { family: faker.person.lastName(), given: [faker.person.firstName()] },
      ],
      resourceType: "Patient",
    })
  );

  db.data.patients.push(...newPatients);

  await db.write();

  return newPatients;
}

async function createEpisodes(
  db: Low<Data>,
  numberOfEpisodes: number,
  patientId: string
) {
  const condition = await createCondition(db, patientId);
  const newEpisodes: EpisodeOfCare[] = Array.from(
    { length: numberOfEpisodes },
    () => ({
      id: crypto.randomUUID(),
      resourceType: "EpisodeOfCare",
      status: "active",
      patient: { reference: `Patient/${patientId}` },
      diagnosis: [
        {
          condition: {
            reference: `Condition/${condition.id}`,
          },
        },
      ],
    })
  );

  return newEpisodes;
}

async function createEpisodesForPatients(
  db: Low<Data>,
  patients: PatientWithId[],
  numberOfEpisodes: number
) {
  const allEpisodes: EpisodeOfCare[] = [];

  await Promise.all(
    patients.map(async (p) => {
      const episodes = await createEpisodes(db, numberOfEpisodes, p.id);
      allEpisodes.push(...episodes);
    })
  );

  db.data.episodes.push(...allEpisodes);

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
