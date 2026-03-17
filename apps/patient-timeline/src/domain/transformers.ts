import type { Encounter } from "fhir/r5";
import { type TimelineEntry } from "./models.js";

const encounterDateToTimestamp = (date: string): number => {
  if (date === "") {
    return Number.POSITIVE_INFINITY;
  }

  const timestamp = Date.parse(date);

  if (Number.isNaN(timestamp)) {
    return Number.POSITIVE_INFINITY;
  }

  return timestamp;
};

export const toTimelineEntryFromEncounter = (
  encounter: Encounter,
): TimelineEntry => {
  const encounterId = encounter.id ?? "unknown";
  const date = encounter.actualPeriod?.start ?? "";
  const status = encounter.status ?? "";

  return {
    encounterId,
    date,
    status,
    observations: [],
  };
};

export const sortTimelineEntries = (
  entries: TimelineEntry[],
): TimelineEntry[] =>
  [...entries].sort(
    (left, right) =>
      encounterDateToTimestamp(left.date) -
      encounterDateToTimestamp(right.date),
  );
