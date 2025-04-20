import { BundleEntry, Observation } from "fhir/r5";
import { ListItem } from "../components/ListItem";

export function ObservationResource({
  entry,
}: {
  entry: BundleEntry<Observation>;
}) {
  const id = entry.resource?.id;

  if (!id) return null;

  return <ListItem id={id} className="bg-pink-600" />;
}
