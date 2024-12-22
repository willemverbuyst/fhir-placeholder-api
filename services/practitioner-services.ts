import { dataStore } from "../data/index.ts";

export function getPractitionerFromDataStore(id: string) {
  return dataStore.practitioners.find((c) => c.id === id);
}

export function getPractitionersFromDataStore() {
  return dataStore.practitioners;
}
