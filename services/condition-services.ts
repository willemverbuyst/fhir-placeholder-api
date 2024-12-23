import { dataStore } from "../data/index.ts";

export function getConditionFromDataStore(id: string) {
  return dataStore.conditions.find((c) => c.id === id);
}

export function getConditionsFromDataStore() {
  return dataStore.conditions;
}

export function getConditionsForPatientFromDataStore(id: string) {
  return dataStore.conditions.filter(
    (c) => c.subject.reference?.split("/")[1] === id
  );
}
