import { Practitioner } from "fhir/r5";
import { ResourceRenderer } from "../components/ResourceRenderen";
import { Patients } from "./patient.resource";

export function PractitionerResource({
  practitionerId,
}: {
  practitionerId: string | undefined;
}) {
  if (!practitionerId) return null;

  return (
    <ResourceRenderer<Practitioner>
      url={`Practitioner/${practitionerId}`}
      className="bg-amber-400"
      renderItem={(resource) => <Patients practitionerId={resource.id} />}
    />
  );
}
