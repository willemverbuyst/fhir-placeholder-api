import { InfoMessage } from "@/components/message/InfoMessage";
import CreateAppointmentForm from "./CreateAppointmentForm";
import CreateOrganizationForm from "./CreateOrganizationForm";

export const FormMap = {
  Appointment: <CreateAppointmentForm />,
  Condition: <InfoMessage message="form not implemented yet" />,
  EpisodeOfCare: <InfoMessage message="form not implemented yet" />,
  Organization: <CreateOrganizationForm />,
  PractitionerRole: <InfoMessage message="form not implemented yet" />,
  Practitioner: <InfoMessage message="form not implemented yet" />,
  Patient: <InfoMessage message="form not implemented yet" />,
  Encounter: <InfoMessage message="form not implemented yet" />,
  Observation: <InfoMessage message="form not implemented yet" />,
};
