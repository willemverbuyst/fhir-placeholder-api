import { dataStore } from "../data/index.ts";

export function getPatientFromDB(id: string) {
  return dataStore.patients.find((p) => p.id === id);
}

export function getPatientsFromDB() {
  return dataStore.patients;
}

export function getEpisodesForPatientFromDB(id: string) {
  return dataStore.episodes.filter(
    (e) => e.patient.reference?.split("/")[1] === id
  );
}
