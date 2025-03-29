import { DataStore } from "../data/index.ts";

export class ConditionService {
  constructor(private dataStore: DataStore) {}

  getAll() {
    return this.dataStore.conditions;
  }

  getById(id: string) {
    return this.dataStore.conditions.find((c) => c.id === id);
  }

  getByPatientId(id: string) {
    return this.dataStore.conditions.filter(
      (c) => c.subject.reference?.split("/")[1] === id
    );
  }
}
