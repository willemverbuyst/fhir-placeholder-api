import { faker } from "@faker-js/faker";
import { ENCOUNTER_STATUS } from "@repo/fhir-terminology";
import type { Encounter, Patient } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createEncounter({
  patientId,
  episodeId,
  id,
  startDate,
}: {
  patientId: string | undefined;
  episodeId: string | undefined;
  id: string;
  startDate: Date | undefined;
}): Encounter {
  const encounter: Encounter = {
    id,
    resourceType: "Encounter",
    status: faker.helpers.arrayElement(ENCOUNTER_STATUS),
    subject: { reference: patientId ? `Patient/${patientId}` : undefined },
    episodeOfCare: [
      { reference: episodeId ? `EpisodeOfCare/${episodeId}` : undefined },
    ],
  };

  if (startDate) {
    encounter.actualPeriod = {
      start: faker.date
        .between({ from: startDate, to: Date.now() })
        .toISOString(),
    };
  }

  return encounter;
}

export function createEncounters({
  numberOfEncounters,
  numberOfPatients,
  numberOfEpisodes,
  idGen,
  patients,
}: {
  numberOfEncounters: number;
  numberOfPatients: number;
  numberOfEpisodes: number;
  idGen: IdGenerator;
  patients: Patient[];
}): Encounter[] {
  return Array.from({ length: numberOfEncounters }, (_, i) => {
    const patientIndex = Math.floor(
      i / (numberOfEncounters / numberOfPatients),
    );
    const episodeIndex = Math.floor(
      i / (numberOfEncounters / numberOfEpisodes),
    );
    const dob = patients[patientIndex].birthDate;
    return createEncounter({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      episodeId: idGen.refs.get("episode-of-care")?.[episodeIndex],
      id: idGen.generateId("encounter"),
      startDate: dob ? new Date(dob) : undefined,
    });
  });
}
