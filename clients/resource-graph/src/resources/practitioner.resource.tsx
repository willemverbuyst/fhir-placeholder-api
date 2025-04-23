import { Practitioner } from "fhir/r5";
import { ResourcesRenderer } from "../components/ResourcesRenderer";
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
      className="bg-amber-400"
      renderItem={(resource) => <Patients practitionerId={resource.id} />}
    />
  );
}
