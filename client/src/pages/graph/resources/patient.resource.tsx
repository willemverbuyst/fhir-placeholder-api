import type { Patient } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Appointments } from "./appointment.resource";
import { Conditions } from "./condition.resource";

export function Patients({
  practitionerId,
}: {
  practitionerId: string | undefined;
}) {
  if (!practitionerId) return null;

  return (
    <ResourcesRenderer<Patient>
      url={`Patient?general-practitioner=${practitionerId}`}
      className={`${FHIR_RESOURCES.Patient.bgColor}`}
      renderItem={(resource) => (
        <section className="flex flex-col gap-3">
          <Conditions patientId={resource.id} />
          <Appointments patientId={resource.id} />
        </section>
      )}
    />
  );
}
