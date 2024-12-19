import { db } from "../db/index.ts";

export function getEpisodeFromDB(id: string) {
  return db.data.episodes.find((e) => e.id === id);
}

export function getEpisodesFromDB() {
  return db.data.episodes;
}
