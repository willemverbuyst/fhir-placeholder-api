import { Low } from "npm:lowdb";
import { Data, Episode, Patient } from "./types.ts";

const NUMBER_OF_PATIENTS = 10;
const NUMBER_OF_EPISODES = 5;

async function createPatients(db: Low<Data>, numberOfPatients: number) {
  const newPatients: Patient[] = Array.from(
    { length: numberOfPatients },
    () => ({
      id: crypto.randomUUID(),
      name: "foo",
    })
  );

  db.data.patients.push(...newPatients);

  await db.write();

  return newPatients;
}

function createEpisodes(numberOfEpisodes: number, patientId: string) {
  const newEpisodes: Episode[] = Array.from(
    { length: numberOfEpisodes },
    () => ({
      id: crypto.randomUUID(),
      title: "quux",
      patientId,
    })
  );

  return newEpisodes;
}

async function createEpisodesForPatients(
  db: Low<Data>,
  patients: Patient[],
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
