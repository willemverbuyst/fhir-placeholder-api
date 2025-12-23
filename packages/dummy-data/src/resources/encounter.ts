import { faker } from "@faker-js/faker";
import { ENCOUNTER_STATUS } from "@repo/fhir-codes";
import type { Encounter } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createEncounter({
  patientId,
  episodeId,
  id,
}: {
  patientId: string | undefined;
  episodeId: string | undefined;
  id: string;
}): Encounter {
  return {
    id,
    resourceType: "Encounter",
    status: faker.helpers.arrayElement(ENCOUNTER_STATUS),
    subject: { reference: patientId ? `Patient/${patientId}` : undefined },
    episodeOfCare: [
      { reference: episodeId ? `EpisodeOfCare/${episodeId}` : undefined },
    ],
  };
}

export function createEncounters({
  numberOfEncounters,
  numberOfPatients,
  numberOfEpisodes,
  idGen,
}: {
  numberOfEncounters: number;
  numberOfPatients: number;
  numberOfEpisodes: number;
  idGen: IdGenerator;
}): Encounter[] {
  return Array.from({ length: numberOfEncounters }, (_, i) => {
    const patientIndex = Math.floor(
      i / (numberOfEncounters / numberOfPatients),
    );
    const episodeIndex = Math.floor(
      i / (numberOfEncounters / numberOfEpisodes),
    );
    return createEncounter({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      episodeId: idGen.refs.get("episode-of-care")?.[episodeIndex],
      id: idGen.generateId("encounter"),
    });
  });
}
