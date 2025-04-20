import { BundleEntry, PractitionerRole } from "fhir/r5";
import { ListItem } from "../components/ListItem";
import { PractitionerResource } from "./practitioner.resource";

export function PractitionerRoleResource({
  entry,
}: {
  entry: BundleEntry<PractitionerRole>;
}) {
  const id = entry.resource?.id;
  const practitionerId = entry.resource?.practitioner?.reference?.split("/")[1];

  if (!id || !practitionerId) return null;

  return (
    <ListItem
      id={id}
      className="bg-amber-600"
      children={<PractitionerResource practitionerId={practitionerId} />}
    />
  );
}
