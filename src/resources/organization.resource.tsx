import { BundleEntry, Organization } from "fhir/r5";
import { ListItem } from "../components/ListItem";
import { PractitionerRoles } from "./practitioner-roles.resource";

export function OrganizationResource({
  entry,
}: {
  entry: BundleEntry<Organization>;
}) {
  const id = entry.resource?.id;

  if (!id) return null;

  return (
    <ListItem
      id={id}
      className="bg-amber-800"
      children={<PractitionerRoles organizationId={id} />}
    />
  );
}
