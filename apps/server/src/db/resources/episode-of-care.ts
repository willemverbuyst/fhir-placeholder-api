import type { EpisodeOfCare } from "fhir/r5";
import type { Id } from "../../types";
import { getRandomElement } from "../helpers/getRandomElement";
import { episodeOfCareTypes } from "../valueSets/episode-of-care-type-value-set";

export enum EpisodeOfCareStatus {
  PLANNED = "planned",
  WAITLIST = "waitlist",
  ACTIVE = "active",
  ONHOLD = "onhold",
  FINISHED = "finished",
  CANCELLED = "cancelled",
  ENTERED_IN_ERROR = "entered-in-error",
}

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
    status: getRandomElement(Object.values(EpisodeOfCareStatus)),
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
