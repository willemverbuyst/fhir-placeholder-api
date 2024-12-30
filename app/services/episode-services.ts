import { dataStore } from "../data/index.ts";

export function getEpisodeFromDataStore(id: string) {
  return dataStore.episodes.find((e) => e.id === id);
}

export function getEpisodesFromDataStore() {
  return dataStore.episodes;
}

export function getEpisodesForPatientFromDataStore(id: string) {
  return dataStore.episodes.filter(
    (e) => e.patient.reference?.split("/")[1] === id
  );
}
