import { EpisodeOfCare, Patient } from "npm:@types/fhir/r4";

export type Data = {
  patients: Patient[];
  episodes: EpisodeOfCare[];
};
