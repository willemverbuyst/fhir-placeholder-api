import { DataStore } from "../models/data.ts";

export class EpisodeService {
  constructor(private dataStore: DataStore) {}

  getById(id: string) {
    return this.dataStore.episodes.find((e) => e.id === id);
  }

  getAll() {
    return this.dataStore.episodes;
  }

  getByPatientId(id: string) {
    return this.dataStore.episodes.filter(
      (e) => e.patient.reference?.split("/")[1] === id
    );
  }
}
