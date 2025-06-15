import { EpisodeOfCareStatus } from "@repo/fhir-codes";
import type { EpisodeOfCare } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";
import { episodeOfCareTypes } from "../valueSets/episode-of-care-type-value-set";

export function createEpisode({
  patientId,
  conditionId,
  id,
}: {
  patientId: string;
  conditionId: string;
  id: string;
}): EpisodeOfCare & Id {
  return {
    id,
    resourceType: "EpisodeOfCare",
    status: getRandomElement(EpisodeOfCareStatus),
    patient: { reference: `Patient/${patientId}` },
    diagnosis: [
      {
        condition: [
          {
            reference: { reference: `Condition/${conditionId}` },
          },
        ],
      },
    ],
    type: [{ coding: [getRandomElement(episodeOfCareTypes)] }],
  };
}

export function createEpisodes({
  numberOfEpisodes,
  numberOfPatients,
}: {
  numberOfEpisodes: number;
  numberOfPatients: number;
}): (EpisodeOfCare & Id)[] {
  return Array.from({ length: numberOfEpisodes }, (_, i) => {
    return createEpisode({
      patientId: `patient-${Math.floor(i / (numberOfEpisodes / numberOfPatients)) + 1}`,
      conditionId: `condition-${i + 1}`,
      id: `episode-of-care-${i + 1}`,
    });
  });
}
