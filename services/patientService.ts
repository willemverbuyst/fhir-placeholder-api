import { db } from "../app.ts";

export function getPatientFromDB(id: string) {
  return db.data.patients.find((p) => p.id === id);
}

export function getPatientsFromDB() {
  return db.data.patients;
}

export function getEpisodesForPatientFromDB(id: string) {
  return db.data.episodes.filter(
    (e) => e.patient.reference?.split("/")[1] === id
  );
}
