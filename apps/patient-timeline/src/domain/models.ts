export type ObservationSummary = {
  type: string;
  value: string | number;
};

export type TimelineEpisode = {
  id: string;
  title: string;
};

export type TimelineEntry = {
  encounterId: string;
  date: string;
  status: string;
  episode?: TimelineEpisode;
  observations: ObservationSummary[];
};

export type TimelineResponse = {
  timeline: TimelineEntry[];
  warnings: string[];
};
