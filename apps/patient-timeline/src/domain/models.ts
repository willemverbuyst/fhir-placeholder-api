export type ObservationSummary = {
  id: string;
  status: string;
  note: string | null;
};

export type TimelineEntry = {
  encounterId: string;
  date: string;
  status: string;
  episodes: EpisodeSummary[];
  observations: ObservationSummary[];
};

export type TimelineResponse = {
  patient: string | null;
  timeline: TimelineEntry[];
  warnings: string[];
};

export type EpisodeSummary = {
  id: string;
  status: string;
};
