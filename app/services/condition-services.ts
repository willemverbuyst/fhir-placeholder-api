import { Data } from "../models/data.ts";

export class ConditionService {
  constructor(private dataStore: Data) {}

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
