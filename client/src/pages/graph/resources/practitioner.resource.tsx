import type { Practitioner } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Patients } from "./patient.resource";

export function PractitionerResource({
  practitionerId,
}: {
  practitionerId: string | undefined;
}) {
  if (!practitionerId) return null;

  return (
    <ResourcesRenderer<Practitioner>
      url={`Practitioner/${practitionerId}`}
      className={`${FHIR_RESOURCES.Practitioner.bgColor}`}
      renderItem={(resource) => <Patients practitionerId={resource.id} />}
    />
  );
}
