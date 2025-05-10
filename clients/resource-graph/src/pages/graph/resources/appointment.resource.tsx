import type { Appointment } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";

export function Appointments({ patientId }: { patientId: string | undefined }) {
  if (!patientId) return null;

  return (
    <ResourcesRenderer<Appointment>
      url={`Appointment?patient=${patientId}`}
      className="bg-gray-500"
    />
  );
}
