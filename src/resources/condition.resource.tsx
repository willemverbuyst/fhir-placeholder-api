import { BundleEntry, Condition } from "fhir/r5";
import { ListItem } from "../components/ListItem";
import { Episodes } from "./episodes.resource";

export function ConditionResource({
  entry,
}: {
  entry: BundleEntry<Condition>;
}) {
  const id = entry.resource?.id;

  if (!id) return null;

  return (
    <ListItem
      id={id}
      className="bg-violet-500"
      children={<Episodes conditionId={id} />}
    />
  );
}
