import type { EpisodeOfCare, Observation } from "fhir/r5";

export type TimelineEntry = {
  encounterId: string;
  date: string;
  status: string;
  episode?: EpisodeOfCare;
  observations: Observation[];
};

export type TimelineResponse = {
  timeline: TimelineEntry[];
  warnings: string[];
};
