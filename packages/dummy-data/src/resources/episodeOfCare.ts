import { faker } from "@faker-js/faker";
import { EPISODE_OF_CARE_STATUS } from "@repo/fhir-terminology";
import type { EpisodeOfCare } from "fhir/r5";
import { IdGenerator } from "../idGenerator";
import { episodeOfCareTypes } from "../valueSets/episode-of-care-type-value-set";

export function createEpisode({
  patientId,
  conditionId,
  id,
}: {
  patientId: string | undefined;
  conditionId: string | undefined;
  id: string;
}): EpisodeOfCare {
  return {
    id,
    resourceType: "EpisodeOfCare",
    status: faker.helpers.arrayElement(EPISODE_OF_CARE_STATUS),
    patient: { reference: patientId ? `Patient/${patientId}` : undefined },
    diagnosis: [
      {
        condition: [
          {
            reference: {
              reference: conditionId ? `Condition/${conditionId}` : undefined,
            },
          },
        ],
      },
    ],
    type: [{ coding: [faker.helpers.arrayElement(episodeOfCareTypes)] }],
  };
}

export function createEpisodes({
  numberOfEpisodes,
  numberOfPatients,
  idGen,
}: {
  numberOfEpisodes: number;
  numberOfPatients: number;
  idGen: IdGenerator;
}): EpisodeOfCare[] {
  return Array.from({ length: numberOfEpisodes }, (_, i) => {
    const patientIndex = Math.floor(i / (numberOfEpisodes / numberOfPatients));
    const conditionIndex = i;
    return createEpisode({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      conditionId: idGen.refs.get("condition")?.[conditionIndex],
      id: idGen.generateId("episode-of-care"),
    });
  });
}
