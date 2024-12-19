import { dataStore } from "../data/index.ts";

export function getPatientFromDataStore(id: string) {
  return dataStore.patients.find((p) => p.id === id);
}

export function getPatientsFromDataStore() {
  return dataStore.patients;
}

export function getEpisodesForPatientFromDataStore(id: string) {
  return dataStore.episodes.filter(
    (e) => e.patient.reference?.split("/")[1] === id
  );
}
