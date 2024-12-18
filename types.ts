export type Patient = { id: string; name: string };
export type Episode = { id: string; title: string; patientId: string };

export type Data = {
  patients: Patient[];
  episodes: Episode[];
};
