import { Patient } from "fhir/r5";
import { ResourcesRenderer } from "../components/ResourcesRenderer";
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
      className="bg-teal-500"
      renderItem={(resource) => <Conditions patientId={resource.id} />}
    />
  );
}
