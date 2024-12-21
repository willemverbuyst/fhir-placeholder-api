import {
  Condition,
  EpisodeOfCare,
  Organization,
  Patient,
  Practitioner,
} from "npm:@types/fhir/r5";

export type PatientWithId = Patient & Required<Pick<Patient, "id">>;
export type ConditionWithId = Condition & Required<Pick<Condition, "id">>;
export type EpisodeOfCareWithId = EpisodeOfCare &
  Required<Pick<EpisodeOfCare, "id">>;
export type OrganizationWithId = Organization &
  Required<Pick<Organization, "id">>;
export type PractitionerWithId = Practitioner &
  Required<Pick<Practitioner, "id">>;

export type Data = {
  patients: PatientWithId[];
  episodes: EpisodeOfCareWithId[];
  conditions: ConditionWithId[];
  organizations: OrganizationWithId[];
  practitioners: PractitionerWithId[];
};
