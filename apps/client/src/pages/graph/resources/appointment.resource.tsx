import type { Appointment } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";

export function Appointments({ patientId }: { patientId: string }) {
  return (
    <ResourcesRenderer<Appointment>
      resourceType="Appointment"
      searchParams={`?patient=${patientId}`}
    />
  );
}
