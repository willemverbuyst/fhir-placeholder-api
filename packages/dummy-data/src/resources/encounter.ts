import { faker } from "@faker-js/faker";
import { ENCOUNTER_STATUS } from "@repo/fhir-codes";
import type { Encounter } from "fhir/r5";

export function createEncounter({
  patientId,
  episodeId,
  id,
}: {
  patientId: string;
  episodeId: string;
  id: string;
}): Encounter {
  return {
    id,
    resourceType: "Encounter",
    status: faker.helpers.arrayElement(ENCOUNTER_STATUS),
    subject: { reference: `Patient/${patientId}` },
    episodeOfCare: [{ reference: `EpisodeOfCare/${episodeId}` }],
  };
}

export function createEncounters({
  numberOfEncounters,
  numberOfPatients,
  numberOfEpisodes,
}: {
  numberOfEncounters: number;
  numberOfPatients: number;
  numberOfEpisodes: number;
}): Encounter[] {
  return Array.from({ length: numberOfEncounters }, (_, i) => {
    return createEncounter({
      patientId: `patient-${Math.floor(i / (numberOfEncounters / numberOfPatients)) + 1}`,
      episodeId: `episode-of-care-${
        Math.floor(i / (numberOfEncounters / numberOfEpisodes)) + 1
      }`,
      id: `encounter-${i + 1}`,
    });
  });
}
