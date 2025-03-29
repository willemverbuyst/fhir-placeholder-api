import { DataStore } from "../models/data.ts";

export class PractitionerService {
  constructor(private dataStore: DataStore) {}

  getAll() {
    return this.dataStore.practitioners;
  }

  getById(id: string) {
    return this.dataStore.practitioners.find((c) => c.id === id);
  }
}
