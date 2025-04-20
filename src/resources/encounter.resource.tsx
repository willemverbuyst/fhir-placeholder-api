import { BundleEntry, Encounter } from "fhir/r5";
import { ListItem } from "../components/ListItem";
import { Observations } from "./observations.resource";

export function EncounterResource({
  entry,
}: {
  entry: BundleEntry<Encounter>;
}) {
  const id = entry.resource?.id;

  if (!id) return null;

  return (
    <ListItem
      id={id}
      className="bg-green-600"
      children={<Observations encounterId={id} />}
    />
  );
}
