import type { Appointment } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
import { ResourcesRenderer } from "../ResourcesRenderer";

export function Appointments({ patientId }: { patientId: string | undefined }) {
  if (!patientId) return null;

  return (
    <ResourcesRenderer<Appointment>
      url={`Appointment?patient=${patientId}`}
      className={`${FHIR_RESOURCES.Appointment.bgColor}`}
    />
  );
}
