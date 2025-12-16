import { isTruthyString } from "@repo/utils";
import type { Patient } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Appointments } from "./appointment.resource";
import { Conditions } from "./condition.resource";

export function Patients({
  practitionerId,
}: {
  practitionerId: string;
}) {
  return (
    <ResourcesRenderer<Patient>
      resourceType="Patient"
      searchParams={`?general-practitioner=${practitionerId}`}
      renderItem={(resource) =>
        isTruthyString(resource.id) ? (
          <section className="flex flex-col gap-3">
            <Conditions patientId={resource.id} />
            <Appointments patientId={resource.id} />
          </section>
        ) : null
      }
    />
  );
}
