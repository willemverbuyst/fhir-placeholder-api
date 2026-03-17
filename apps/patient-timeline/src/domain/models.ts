import type { EpisodeOfCare } from "fhir/r5";

export type ObservationSummary = {
  id: string;
  status: string;
  note: string | null;
};

export type TimelineEntry = {
  encounterId: string;
  date: string;
  status: string;
  episode?: EpisodeOfCare;
  observations: ObservationSummary[];
};

export type TimelineResponse = {
  timeline: TimelineEntry[];
  warnings: string[];
};
