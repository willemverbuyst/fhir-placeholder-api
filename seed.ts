import { faker } from "npm:@faker-js/faker";
import { EpisodeOfCare, Patient } from "npm:@types/fhir/r4";
import { Low } from "npm:lowdb";
import { Data } from "./types.ts";

const NUMBER_OF_PATIENTS = 10;
const NUMBER_OF_EPISODES = 5;

type PatientWithId = Patient & Required<Pick<Patient, "id">>;

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

function createEpisodes(numberOfEpisodes: number, patientId: string) {
  const newEpisodes: EpisodeOfCare[] = Array.from(
    { length: numberOfEpisodes },
    () => ({
      id: crypto.randomUUID(),
      resourceType: "EpisodeOfCare",
      status: "active",
      patient: { reference: `Patient/${patientId}` },
    })
  );

  return newEpisodes;
}

async function createEpisodesForPatients(
  db: Low<Data>,
  patients: PatientWithId[],
  numberOfEpisodes: number
) {
  const newEpisodesForPatients = patients.flatMap((p) =>
    createEpisodes(numberOfEpisodes, p.id)
  );

  db.data.episodes.push(...newEpisodesForPatients);

  await db.write();
}

export async function seedDB(db: Low<Data>) {
  db.data.patients = [];
  db.data.episodes = [];
  await db.write();

  const patients = await createPatients(db, NUMBER_OF_PATIENTS);
  await createEpisodesForPatients(db, patients, NUMBER_OF_EPISODES);
}
