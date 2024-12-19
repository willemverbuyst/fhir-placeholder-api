import { dataStore } from "../data/index.ts";

export function getEpisodeFromDataStore(id: string) {
  return dataStore.episodes.find((e) => e.id === id);
}

export function getEpisodesFromDataStore() {
  return dataStore.episodes;
}
