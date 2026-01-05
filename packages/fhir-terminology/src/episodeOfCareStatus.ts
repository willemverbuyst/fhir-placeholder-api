import { EpisodeOfCare } from "fhir/r5";

export const EPISODE_OF_CARE_STATUS = [
  "planned",
  "waitlist",
  "active",
  "onhold",
  "finished",
  "cancelled",
  "entered-in-error",
] as const satisfies EpisodeOfCare["status"][];
