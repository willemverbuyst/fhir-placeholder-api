import { DataStore } from "../models/data.ts";

export class EpisodeService {
  constructor(private dataStore: DataStore) {}

  getAll() {
    return this.dataStore.episodes;
  }

  getById(id: string) {
    return this.dataStore.episodes.find((e) => e.id === id);
  }

  getByPatientId(id: string) {
    return this.dataStore.episodes.filter(
      (e) => e.patient.reference?.split("/")[1] === id
    );
  }
}
