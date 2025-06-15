import { EpisodeOfCare } from "fhir/r5";

export const episodeOfCareStatus: Array<EpisodeOfCare["status"]> = [
  "planned",
  "waitlist",
  "active",
  "onhold",
  "finished",
  "cancelled",
  "entered-in-error",
] as const;
