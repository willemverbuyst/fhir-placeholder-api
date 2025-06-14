import type { Encounter } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";

export enum EncounterStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in-progress",
  ON_HOLD = "on-hold",
  DISCHARGED = "discharged",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  DISCONTINUED = "discontinued",
  ENTERED_IN_ERROR = "entered-in-error",
  UNKNOWN = "unknown",
}

export function createEncounter({
  patientId,
  episodeId,
  id,
}: {
  patientId: string;
  episodeId: string;
  id: string;
}): Encounter & Id {
  return {
    id,
    resourceType: "Encounter",
    status: getRandomElement(Object.values(EncounterStatus)),
    subject: { reference: `Patient/${patientId}` },
    episodeOfCare: [{ reference: `EpisodeOfCare/${episodeId}` }],
  };
}
