import { faker } from "npm:@faker-js/faker";
import { Condition, EpisodeOfCare, Patient } from "npm:@types/fhir/r4";
import { Data } from "../models/data.ts";

const NUMBER_OF_PATIENTS = 10;
const NUMBER_OF_EPISODES_PER_PATIENT = 5;

type PatientWithId = Patient & Required<Pick<Patient, "id">>;
type ConditionWithId = Condition & Required<Pick<Condition, "id">>;
type EpisodeOfCareWithId = EpisodeOfCare & Required<Pick<EpisodeOfCare, "id">>;

function createPatient(patientId: number) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const newPatient: PatientWithId = {
    id: patientId.toString(),
    name: [{ family: lastName, given: [firstName] }],
    resourceType: "Patient",
    birthDate: faker.date
      .between({ from: "1950-01-01", to: Date.now() })
      .toISOString()
      .split("T")[0],
    gender: faker.helpers.arrayElement(["male", "female", "other", "unknown"]),
    telecom: [
      {
        use: "home",
        system: "phone",
        value: faker.phone.number({ style: "national" }),
      },
      {
        use: "home",
        system: "email",
        value: faker.internet.email({
          firstName,
          lastName,
          provider: "fhir-placeholder.api",
        }),
      },
    ],
    address: [
      {
        use: "home",
        type: faker.helpers.arrayElement(["both", "physical", "postal"]),
        line: [faker.location.streetAddress()],
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
    ],
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

export function seed(dataStore: Data) {
  const newPatients = createPatients(NUMBER_OF_PATIENTS);

  dataStore.patients.push(...newPatients);

  const { newConditions, newEpisodes } = createEpisodesForPatients(
    newPatients,
    NUMBER_OF_EPISODES_PER_PATIENT
  );

  dataStore.conditions.push(...newConditions);
  dataStore.episodes.push(...newEpisodes);
}
