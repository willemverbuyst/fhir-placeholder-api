import type { Practitioner } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Patients } from "./patient.resource";

export function PractitionerResource({
  practitionerId,
}: {
  practitionerId: string | undefined;
}) {
  console.log(practitionerId);
  if (!practitionerId) return null;

  return (
    <ResourcesRenderer<Practitioner>
      url={`Practitioner/${practitionerId}`}
      className="bg-amber-600"
      renderItem={(resource) => <Patients practitionerId={resource.id} />}
    />
  );
}
