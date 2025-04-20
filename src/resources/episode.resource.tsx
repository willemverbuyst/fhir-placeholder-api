import { BundleEntry, EpisodeOfCare } from "fhir/r5";
import { ListItem } from "../components/ListItem";
import { Encounters } from "./encounters.resource";

export function EpisodeResource({
  entry,
}: {
  entry: BundleEntry<EpisodeOfCare>;
}) {
  const id = entry.resource?.id;

  if (!id) return null;

  return (
    <ListItem
      id={id}
      className="bg-blue-900"
      children={<Encounters episodeId={id} />}
    />
  );
}
