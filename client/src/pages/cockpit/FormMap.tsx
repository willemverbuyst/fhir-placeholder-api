import { InfoAlert } from "@/components/alert/InfoAlert";
import CreateAppointmentForm from "./CreateAppointmentForm";
import CreateOrganizationForm from "./CreateOrganizationForm";

export const FormMap = {
  Appointment: <CreateAppointmentForm />,
  Condition: <InfoAlert title="form not implemented yet" />,
  EpisodeOfCare: <InfoAlert title="form not implemented yet" />,
  Organization: <CreateOrganizationForm />,
  PractitionerRole: <InfoAlert title="form not implemented yet" />,
  Practitioner: <InfoAlert title="form not implemented yet" />,
  Patient: <InfoAlert title="form not implemented yet" />,
  Encounter: <InfoAlert title="form not implemented yet" />,
  Observation: <InfoAlert title="form not implemented yet" />,
};
