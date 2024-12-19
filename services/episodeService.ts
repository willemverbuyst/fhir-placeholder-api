import { dataStore } from "../data/index.ts";

export function getEpisodeFromDB(id: string) {
  return dataStore.episodes.find((e) => e.id === id);
}

export function getEpisodesFromDB() {
  return dataStore.episodes;
}
