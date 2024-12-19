import { dataStore } from "../data/index.ts";

export function getConditionFromDB(id: string) {
  return dataStore.conditions.find((c) => c.id === id);
}

export function getConditionsFromDB() {
  return dataStore.conditions;
}
