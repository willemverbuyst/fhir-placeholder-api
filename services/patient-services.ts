import { dataStore } from "../data/index.ts";

export function getPatientFromDataStore(id: string) {
  return dataStore.patients.find((p) => p.id === id);
}

export function getPatientsFromDataStore() {
  return dataStore.patients;
}
