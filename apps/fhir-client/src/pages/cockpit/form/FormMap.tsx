import { InfoAlert } from "@/components/alert/InfoAlert";
import { AppointmentForm } from "./AppointmentForm";
import { OrganizationForm } from "./OrganizationForm";

export const FormMap = {
  Appointment: <AppointmentForm />,
  Condition: <InfoAlert title="form not implemented yet" />,
  EpisodeOfCare: <InfoAlert title="form not implemented yet" />,
  Organization: <OrganizationForm />,
  PractitionerRole: <InfoAlert title="form not implemented yet" />,
  Practitioner: <InfoAlert title="form not implemented yet" />,
  Patient: <InfoAlert title="form not implemented yet" />,
  Encounter: <InfoAlert title="form not implemented yet" />,
  Observation: <InfoAlert title="form not implemented yet" />,
};
